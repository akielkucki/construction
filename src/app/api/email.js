import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = 'nodejs' // specify Node.js runtime

export async function POST(req) {
    try {
        const body = await req.json();
        const { to, subject, text, html } = body;

        // Create a transporter using SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.SMTP_FROM_EMAIL,
            to: to,
            subject: subject,
            text: text,
            html: html,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        return NextResponse.json(
            {
                success: true,
                messageId: info.messageId
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to send email"
            },
            { status: 500 }
        );
    }
}

// Environment variables needed in .env.local:
// SMTP_HOST=smtp.example.com
// SMTP_PORT=587
// SMTP_SECURE=false
// SMTP_USER=your_username
// SMTP_PASSWORD=your_password
// SMTP_FROM_EMAIL=sender@example.com