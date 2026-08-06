import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,

    envCount: Object.keys(process.env).length,

    keys: Object.keys(process.env),

    googlePrivate: process.env.GOOGLE_PRIVATE_KEY,

    googleEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,

    googleSheet: process.env.GOOGLE_SHEET_ID,
  });
}