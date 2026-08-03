"use server";

import { google } from "googleapis";
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
      return { success: false, message: "Please specify your purpose / use case." };
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanOrg = organisation ? organisation.trim() : "";
    const cleanPurpose = purpose.trim();
    const cleanMessage = message ? message.trim() : "";

    const timestamp = new Date().toISOString();

    // 2. Google Sheets Integration
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
        message: "Google Sheets configuration error. Please ensure environment variables are configured.",
      };
    }

    try {
      // 1. Strip any wrapping quotes or carriage returns
      let privateKey = privateKeyRaw.trim();
      privateKey = privateKey.replace(/^["']+|["']+$|\r/g, "");
      // 2. Unescape \n literals into actual newlines
      privateKey = privateKey.replace(/\\n/g, "\n");

      // 3. Ensure header and footer are separated by newlines even if pasted as a single concatenated line
      if (privateKey.includes("-----BEGIN PRIVATE KEY-----") && !privateKey.startsWith("-----BEGIN PRIVATE KEY-----\n")) {
        privateKey = privateKey.replace("-----BEGIN PRIVATE KEY-----", "-----BEGIN PRIVATE KEY-----\n");
      }
      if (privateKey.includes("-----END PRIVATE KEY-----") && !privateKey.endsWith("\n-----END PRIVATE KEY-----")) {
        privateKey = privateKey.replace("-----END PRIVATE KEY-----", "\n-----END PRIVATE KEY-----");
      }

      const auth = new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({ version: "v4", auth });

      // 1. Get existing column A values to find the exact next available row
      const getRes = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "Sheet1!A:A",
      });

      const existingRowsCount = getRes.data.values ? getRes.data.values.length : 0;
      const nextRow = existingRowsCount + 1;

      // 2. Write the new submission into the next sequential row (e.g. Row 2, Row 3, Row 4...)
      try {
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `Sheet1!A${nextRow}:F${nextRow}`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
              [
                timestamp,
                cleanName,
                cleanEmail,
                cleanOrg,
                cleanPurpose,
                cleanMessage,
              ],
            ],
          },
        });
      } catch (updateErr: any) {
        // If grid limit is reached, expand sheet grid by 10 rows and retry
        if (updateErr?.message?.includes("exceeds grid limits") || updateErr?.status === 400) {
          await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
              requests: [
                {
                  appendDimension: {
                    sheetId: 0,
                    dimension: "ROWS",
                    length: 10,
                  },
                },
              ],
            },
          });

          await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `Sheet1!A${nextRow}:F${nextRow}`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
              values: [
                [
                  timestamp,
                  cleanName,
                  cleanEmail,
                  cleanOrg,
                  cleanPurpose,
                  cleanMessage,
                ],
              ],
            },
          });
        } else {
          throw updateErr;
        }
      }
    } catch (sheetsErr: any) {
      const errMsg = sheetsErr?.message || String(sheetsErr);
      console.error("❌ Failed to append entry to Google Sheet:", errMsg);
      if (sheetsErr?.response?.data) {
        console.error("Google API Response Error Data:", JSON.stringify(sheetsErr.response.data));
      }
      return {
        success: false,
        message: `Google Sheets update failed: ${errMsg}`,
      };
    }

    // 3. Resend Email Dispatch
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmailTo = process.env.NOTIFICATION_EMAIL_TO;
    const senderEmail =
      process.env.SENDER_EMAIL || "Glaor <no-reply@resend.dev>";

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        // A. Send Notification Email to Admin/Owner
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

        // B. Send Confirmation Email to Subscriber
        await resend.emails.send({
          from: senderEmail,
          to: cleanEmail,
          subject: `You're on the Glaor Early Access List! 🎉`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
              <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="color: #4f46e5; font-size: 24px; margin: 0;">Welcome to Glaor Early Access</h1>
              </div>
              <p style="font-size: 16px; color: #334155; line-height: 1.6;">Hi ${cleanName},</p>
              <p style="font-size: 16px; color: #334155; line-height: 1.6;">
                Thank you for applying for early access to <strong>Glaor</strong>! We've received your request and recorded your details.
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
                © ${new Date().getFullYear()} Glaor. All rights reserved.
              </p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Failed to send email via Resend:", emailErr);
      }
    } else {
      console.warn("RESEND_API_KEY environment variable missing, skipping email send.");
    }

    return {
      success: true,
      message: "Success! You've been added to the early access list.",
    };
  } catch (error: any) {
    console.error("Error in submitWaitlistAction:", error);
    return {
      success: false,
      message: error?.message || "An unexpected error occurred. Please try again.",
    };
  }
}
