"use server";

import { env } from "@/lib/env";
import { inquirySchema, type InquiryFormValues } from "@/lib/validations/inquiry";
import { Resend } from "resend";

export interface SendInquiryResult {
  success: boolean;
  error?: string;
}

export async function sendInquiry(
  values: InquiryFormValues
): Promise<SendInquiryResult> {
  // 1. Server-side validation
  const parsed = inquirySchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Validation failed" };
  }

  const { fullName, company, country, email, inquiryType, message, website } =
    parsed.data;

  // 2. Honeypot check
  if (website && website.length > 0) {
    // Silently succeed to trick bots
    return { success: true };
  }

  // 3. Deliver inquiry via Telegram Bot, Resend, or local fallback
  try {
    const formattedDate = new Date().toISOString();
    const plainTextContent = `
New Export Inquiry Received (${formattedDate}):
Name: ${fullName}
Company: ${company}
Country: ${country}
Business Email: ${email}
Inquiry Type: ${inquiryType}

Message:
${message}
    `.trim();

    // Strategy A: Send to Telegram Bot if configured
    if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
      const telegramMessage = `🌱 *New Seinagro Export Inquiry*\n\n` +
        `👤 *Name:* ${escapeTelegramMarkdown(fullName)}\n` +
        `🏢 *Company:* ${escapeTelegramMarkdown(company)}\n` +
        `🌍 *Country:* ${escapeTelegramMarkdown(country)}\n` +
        `📧 *Email:* \`${escapeTelegramMarkdown(email)}\`\n` +
        `📦 *Inquiry Type:* ${escapeTelegramMarkdown(inquiryType.toUpperCase())}\n\n` +
        `💬 *Message:*\n${escapeTelegramMarkdown(message)}`;

      const tgRes = await fetch(
        `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: "MarkdownV2",
          }),
        }
      );

      if (!tgRes.ok) {
        const errorText = await tgRes.text();
        console.error("Telegram API delivery failed:", errorText);
      }
    }

    // Strategy B: Send email via Resend if API key is provided
    if (env.RESEND_API_KEY) {
      const resend = new Resend(env.RESEND_API_KEY);
      const emailSubject = `[Seinagro Inquiry - ${inquiryType.toUpperCase()}] ${company} (${country})`;

      const result = await resend.emails.send({
        from: env.RESEND_FROM,
        to: env.CONTACT_TO,
        replyTo: email,
        subject: emailSubject,
        text: plainTextContent,
      });

      if (result.error) {
        console.error("Resend delivery error:", result.error);
      }
    }

    // Strategy C: Always log inquiry to console as safe audit trail
    console.log("=== [SEINAGRO INQUIRY RECEIVED] ===");
    console.log(plainTextContent);
    console.log("====================================");

    return { success: true };
  } catch (error) {
    console.error("sendInquiry exception:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Internal error",
    };
  }
}

function escapeTelegramMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
}
