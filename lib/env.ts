import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    ORIGIN_URL: z.string().url().min(1),
    RESEND_API_KEY: z.string().min(1).optional(),
    RESEND_FROM: z.string().min(1).default("Seinagro <info@seinagro.com>"),
    CONTACT_TO: z.string().email().default("info@seinagro.com"),
    TELEGRAM_BOT_TOKEN: z.string().min(1).optional(),
    TELEGRAM_CHAT_ID: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_ORIGIN_URL: z.string().url(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    ORIGIN_URL: process.env.ORIGIN_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM: process.env.RESEND_FROM,
    CONTACT_TO: process.env.CONTACT_TO,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
    NEXT_PUBLIC_ORIGIN_URL: process.env.NEXT_PUBLIC_ORIGIN_URL,
  },
});
