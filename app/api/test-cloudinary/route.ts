import { NextResponse } from "next/server";

// Test endpoint to verify Cloudinary environment variables
// DELETE THIS FILE after confirming everything works in production
export async function GET() {
  return NextResponse.json({
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "NOT SET",
    hasApiKey: !!process.env.CLOUDINARY_API_KEY,
    hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}
