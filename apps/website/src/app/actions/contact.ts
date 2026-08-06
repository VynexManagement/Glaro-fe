"use server";

import { Resend } from "resend";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormResult =
  | { success: true }
  | { success: false; error: string };

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contactFormAction = async (
  data: FormData
): Promise<ContactFormResult> => {
  const cleanName = data.name?.trim() ?? "";
  const cleanEmail = data.email?.trim().toLowerCase() ?? "";
  const cleanMessage = data.message?.trim() ?? "";

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return { success: false, error: "All fields are required." };
  }
  if (!EMAIL_RE.test(cleanEmail)) {
    return { success: false, error: "Please enter a valid email address." };
  }
  if (cleanMessage.length > 5000) {
    return { success: false, error: "Message is too long." };
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const notificationEmailTo = process.env.NOTIFICATION_EMAIL_TO;
  const senderEmail = process.env.SENDER_EMAIL || "Glaro <no-reply@resend.dev>";

  if (!resendApiKey || !notificationEmailTo) {
    console.error("Contact form: missing RESEND_API_KEY or NOTIFICATION_EMAIL_TO");
    return { success: false, error: "Something went wrong. Please try again later." };
  }

  const safeName = escapeHtml(cleanName);
  const safeEmail = escapeHtml(cleanEmail);
  const safeMessage = escapeHtml(cleanMessage).replace(/\n/g, "<br />");

  try {
    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
      from: senderEmail,
      to: notificationEmailTo,
      replyTo: cleanEmail,
      subject: `📬 New Contact Form Message from ${cleanName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
          <h2 style="color: #4f46e5; margin-bottom: 16px;">New Contact Form Submission</h2>
          <table style="width: 100%; max-width: 600px; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: bold; width: 140px; vertical-align: top;">Name:</td>
              <td style="padding: 10px 0;">${safeName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 10px 0; white-space: pre-wrap;">${safeMessage}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #64748b;">
            Submitted at ${new Date().toISOString()}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: "Could not send your message. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Could not send your message. Please try again." };
  }
};
