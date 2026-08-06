"use server";

import { Resend } from "resend";

export interface SubscribeInput {
  name: string;
  email: string;
  organisation?: string;
  purpose: string;
  message?: string;
}

export interface SubscribeResponse {
  success: boolean;
  message: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Google Sheets via Web Crypto + fetch
// Uses ONLY Web Crypto API (crypto.subtle) — fully compatible with:
// Cloudflare Workers, Netlify Edge, Vercel Edge, and standard Node.js.
// Zero googleapis dependency needed.
// ─────────────────────────────────────────────────────────────────────────────

function b64url(input: string | ArrayBuffer): string {
  const str =
    typeof input === "string"
      ? input
      : String.fromCharCode(...new Uint8Array(input));
  return btoa(str).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function getGoogleAccessToken(
  clientEmail: string,
  privateKeyPem: string
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = b64url(
    JSON.stringify({
      iss: clientEmail,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    })
  );

  const signingInput = `${header}.${payload}`;

  // Strip PEM headers/footers and whitespace to get the raw base64 DER key
  const pemBody = privateKeyPem
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s+/g, "");

  const keyBytes = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    keyBytes,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(signingInput)
  );

  const jwt = `${signingInput}.${b64url(signatureBuffer)}`;

  // Exchange the signed JWT for an OAuth2 access token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const tokenData = (await tokenRes.json()) as Record<string, string>;

  if (!tokenData.access_token) {
    throw new Error(
      `Google OAuth token exchange failed: ${JSON.stringify(tokenData)}`
    );
  }

  return tokenData.access_token;
}

function parsePrivateKey(raw: string): string {
  // 1. Strip wrapping quotes/carriage returns
  let key = raw.trim().replace(/^["']+|["']+$|\r/g, "");
  // 2. Unescape \n literals
  key = key.replace(/\\n/g, "\n");
  // 3. Ensure header/footer have surrounding newlines even if concatenated
  key = key
    .replace(/-----BEGIN PRIVATE KEY-----\s*/g, "-----BEGIN PRIVATE KEY-----\n")
    .replace(/\s*-----END PRIVATE KEY-----/g, "\n-----END PRIVATE KEY-----");
  return key;
}

async function appendToGoogleSheet(
  spreadsheetId: string,
  accessToken: string,
  row: string[]
): Promise<void> {
  const base = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  // 1. Count existing rows in column A to find the next available row
  const getRes = await fetch(`${base}/values/Sheet1!A:A`, { headers });
  if (!getRes.ok) {
    const errText = await getRes.text();
    throw new Error(`Sheets GET failed (${getRes.status}): ${errText}`);
  }
  const getData = (await getRes.json()) as { values?: string[][] };
  const nextRow = (getData.values?.length ?? 0) + 1;

  // 2. Attempt to write to the next row
  const writeRange = `Sheet1!A${nextRow}:F${nextRow}`;
  const putRes = await fetch(
    `${base}/values/${encodeURIComponent(writeRange)}?valueInputOption=USER_ENTERED`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify({ values: [row] }),
    }
  );

  if (!putRes.ok) {
    const errData = (await putRes.json()) as { error?: { message?: string; status?: string } };
    const errMsg = errData?.error?.message ?? `HTTP ${putRes.status}`;

    // Grid limit hit — expand by 10 rows and retry once
    if (putRes.status === 400 && errMsg.includes("exceeds grid limits")) {
      const expandRes = await fetch(`${base}:batchUpdate`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          requests: [
            {
              appendDimension: {
                sheetId: 0,
                dimension: "ROWS",
                length: 10,
              },
            },
          ],
        }),
      });

      if (!expandRes.ok) {
        const expandErr = await expandRes.text();
        throw new Error(`Grid expansion failed: ${expandErr}`);
      }

      // Retry the write
      const retryRes = await fetch(
        `${base}/values/${encodeURIComponent(writeRange)}?valueInputOption=USER_ENTERED`,
        {
          method: "PUT",
          headers,
          body: JSON.stringify({ values: [row] }),
        }
      );

      if (!retryRes.ok) {
        const retryErr = await retryRes.text();
        throw new Error(`Sheets write failed after grid expansion: ${retryErr}`);
      }
    } else {
      throw new Error(`Sheets write failed: ${errMsg}`);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Server Action
// ─────────────────────────────────────────────────────────────────────────────

export async function submitWaitlistAction(
  data: SubscribeInput
): Promise<SubscribeResponse> {
  try {
    const { name, email, organisation, purpose, message } = data;

    // 1. Basic Server-side Validation
    if (!name || !name.trim()) {
      return { success: false, message: "Name is required." };
    }
    if (!email || !email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      return { success: false, message: "Valid email is required." };
    }
    if (!purpose || !purpose.trim()) {
      return {
        success: false,
        message: "Please specify your purpose / use case.",
      };
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanOrg = organisation ? organisation.trim() : "";
    const cleanPurpose = purpose.trim();
    const cleanMessage = message ? message.trim() : "";
    const timestamp = new Date().toISOString();
   
    // 2. Google Sheets Integration (Web Crypto + fetch — edge runtime compatible)
    const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!privateKeyRaw || !clientEmail || !spreadsheetId) {
      console.error("❌ Google Sheets environment variables missing:", {
        hasPrivateKey: !!privateKeyRaw,
        hasClientEmail: !!clientEmail,
        hasSpreadsheetId: !!spreadsheetId,
      });
      return {
        success: false,
        message:
          "Google Sheets configuration error. Please ensure environment variables are configured.",
      };
    }

    try {
      const privateKey = parsePrivateKey(privateKeyRaw);
      const accessToken = await getGoogleAccessToken(clientEmail, privateKey);
      await appendToGoogleSheet(spreadsheetId, accessToken, [
        timestamp,
        cleanName,
        cleanEmail,
        cleanOrg,
        cleanPurpose,
        cleanMessage,
      ]);
    } catch (sheetsErr: any) {
      const errMsg = sheetsErr?.message || String(sheetsErr);
      console.error("❌ Failed to write to Google Sheet:", errMsg);
      return {
        success: false,
        message: `Google Sheets update failed: ${errMsg}`,
      };
    }

    // 3. Resend Email Dispatch
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmailTo = process.env.NOTIFICATION_EMAIL_TO;
    const senderEmail =
      process.env.SENDER_EMAIL || "Glaro <no-reply@resend.dev>";

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        // A. Admin Notification Email
        if (notificationEmailTo) {
          await resend.emails.send({
            from: senderEmail,
            to: notificationEmailTo,
            subject: `🚀 New Early Access Waitlist Signup: ${cleanName}`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
                <h2 style="color: #4f46e5; margin-bottom: 16px;">New Early Access Submission</h2>
                <table style="width: 100%; max-width: 600px; border-collapse: collapse;">
                  <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 10px 0; font-weight: bold; width: 140px;">Name:</td>
                    <td style="padding: 10px 0;">${cleanName}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 10px 0; font-weight: bold;">Email:</td>
                    <td style="padding: 10px 0;"><a href="mailto:${cleanEmail}">${cleanEmail}</a></td>
                  </tr>
                  <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 10px 0; font-weight: bold;">Organisation:</td>
                    <td style="padding: 10px 0;">${cleanOrg || "N/A"}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 10px 0; font-weight: bold;">Purpose:</td>
                    <td style="padding: 10px 0;">${cleanPurpose}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 10px 0; font-weight: bold;">Message:</td>
                    <td style="padding: 10px 0;">${cleanMessage || "N/A"}</td>
                  </tr>
                </table>
                <p style="margin-top: 20px; font-size: 12px; color: #64748b;">
                  Submitted at ${new Date().toLocaleString()}
                </p>
              </div>
            `,
          });
        }

        // B. Subscriber Confirmation Email
        await resend.emails.send({
          from: senderEmail,
          to: cleanEmail,
          subject: `You're on the Glaro Early Access List! 🎉`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
              <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="color: #4f46e5; font-size: 24px; margin: 0;">Welcome to Glaro Early Access</h1>
              </div>
              <p style="font-size: 16px; color: #334155; line-height: 1.6;">Hi ${cleanName},</p>
              <p style="font-size: 16px; color: #334155; line-height: 1.6;">
                Thank you for applying for early access to <strong>Glaro</strong>! We've received your request and recorded your details.
              </p>
              <p style="font-size: 16px; color: #334155; line-height: 1.6;">
                We are actively onboarding early users in batches to give everyone the best possible experience. We'll send you an invitation email as soon as your account is ready.
              </p>
              <div style="background-color: #f8fafc; padding: 16px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #6366f1;">
                <p style="margin: 0; font-size: 14px; color: #475569;">
                  <strong>Registered Email:</strong> ${cleanEmail}<br/>
                  <strong>Intended Use:</strong> ${cleanPurpose}
                </p>
              </div>
              <p style="font-size: 16px; color: #334155; line-height: 1.6;">
                If you have any questions or extra feature suggestions in the meantime, simply reply to this email.
              </p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">
                © ${new Date().getFullYear()} Glaro. All rights reserved.
              </p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Failed to send email via Resend:", emailErr);
      }
    } else {
      console.warn(
        "RESEND_API_KEY environment variable missing, skipping email send."
      );
    }

    return {
      success: true,
      message: "Success! You've been added to the early access list.",
    };
  } catch (error: any) {
    console.error("Error in submitWaitlistAction:", error);
    return {
      success: false,
      message:
        error?.message || "An unexpected error occurred. Please try again.",
    };
  }
}
