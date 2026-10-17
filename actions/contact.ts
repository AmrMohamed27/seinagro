"use server";

import { env } from "@/lib/env";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendContactEmail(
  email: string,
  name: string,
  message: string
) {
  try {
    await resend.emails.send({
      from: "Website Contact <your@domain.com>",
      to: "you@yourdomain.com",
      subject: `New message from ${name}`,
      replyTo: email,
      text: message,
    });
    return { success: false };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
