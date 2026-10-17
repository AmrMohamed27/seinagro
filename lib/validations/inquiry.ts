import { z } from "zod";

export const inquiryTypeEnum = z.enum(["seeds", "fertilizers", "partnership", "other"]);
export type InquiryType = z.infer<typeof inquiryTypeEnum>;

export const inquirySchema = z.object({
  fullName: z.string().trim().min(2, "nameRequired"),
  company: z.string().trim().min(2, "companyRequired"),
  country: z.string().trim().min(2, "countryRequired"),
  email: z.string().trim().email("emailInvalid"),
  inquiryType: inquiryTypeEnum,
  message: z.string().trim().min(10, "messageMin"),
  // Honeypot field - must remain empty
  website: z.string().max(0, "botDetected").optional().or(z.literal("")),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;
