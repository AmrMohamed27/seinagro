"use client";

import { sendInquiry } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  inquirySchema,
  type InquiryFormValues,
} from "@/lib/validations/inquiry";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const INQUIRY_TYPES = [
  "seeds",
  "fertilizers",
  "partnership",
  "other",
] as const;

const ContactForm = () => {
  const t = useTranslations("Contact");
  const [isPending, startTransition] = useTransition();

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: "",
      company: "",
      country: "",
      email: "",
      inquiryType: "seeds",
      message: "",
      website: "",
    },
  });

  const getLocalizedErrorMessage = (errorKey?: string) => {
    if (!errorKey) return undefined;
    switch (errorKey) {
      case "nameRequired":
        return t("validation.nameRequired");
      case "companyRequired":
        return t("validation.companyRequired");
      case "countryRequired":
        return t("validation.countryRequired");
      case "emailInvalid":
        return t("validation.emailInvalid");
      case "inquiryTypeRequired":
        return t("validation.inquiryTypeRequired");
      case "messageMin":
        return t("validation.messageMin");
      default:
        return errorKey;
    }
  };

  async function onSubmit(values: InquiryFormValues) {
    startTransition(async () => {
      try {
        const result = await sendInquiry(values);
        if (result.success) {
          toast(t("form.successTitle"), {
            description: t("form.successMessage"),
            icon: <CheckCircle2 className="size-5 text-growth" />,
            className: "bg-card border-growth/30 text-foreground",
          });
          form.reset();
        } else {
          toast(t("form.errorTitle"), {
            description: t("form.errorMessage"),
            icon: <XCircle className="size-5 text-destructive" />,
            className: "bg-card border-destructive/30 text-foreground",
          });
        }
      } catch {
        toast(t("form.errorTitle"), {
          description: t("form.errorMessage"),
          icon: <XCircle className="size-5 text-destructive" />,
          className: "bg-card border-destructive/30 text-foreground",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full"
        noValidate
      >
        {/* Honeypot field (hidden from real users, attractive to bots) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...form.register("website")}
          />
        </div>

        {/* Row 1: Full Name & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-foreground text-sm font-medium">
                  {t("form.nameLabel")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("form.namePlaceholder")}
                    autoComplete="name"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>
                    {getLocalizedErrorMessage(fieldState.error.message)}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-foreground text-sm font-medium">
                  {t("form.companyLabel")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("form.companyPlaceholder")}
                    autoComplete="organization"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>
                    {getLocalizedErrorMessage(fieldState.error.message)}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>

        {/* Row 2: Country & Business Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="country"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-foreground text-sm font-medium">
                  {t("form.countryLabel")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("form.countryPlaceholder")}
                    autoComplete="country-name"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>
                    {getLocalizedErrorMessage(fieldState.error.message)}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-foreground text-sm font-medium">
                  {t("form.emailLabel")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("form.emailPlaceholder")}
                    autoComplete="email"
                    dir="ltr"
                    className="text-start"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                {fieldState.error && (
                  <FormMessage>
                    {getLocalizedErrorMessage(fieldState.error.message)}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>

        {/* Row 3: Inquiry Type Selection */}
        <FormField
          control={form.control}
          name="inquiryType"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm font-medium">
                {t("form.inquiryTypeLabel")}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <select
                    {...field}
                    disabled={isPending}
                    className="w-full h-10 px-3 py-2 rounded-md border border-input bg-transparent dark:bg-input/30 text-foreground text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring transition-[color,box-shadow]"
                  >
                    {INQUIRY_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-popover text-popover-foreground">
                        {t(`form.types.${type}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </FormControl>
              {fieldState.error && (
                <FormMessage>
                  {getLocalizedErrorMessage(fieldState.error.message)}
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        {/* Row 4: Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-foreground text-sm font-medium">
                {t("form.messageLabel")}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("form.messagePlaceholder")}
                  rows={4}
                  disabled={isPending}
                  className="min-h-28 resize-y"
                  {...field}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage>
                  {getLocalizedErrorMessage(fieldState.error.message)}
                </FormMessage>
              )}
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          disabled={isPending}
          className="h-11 px-8 self-start gap-2 text-base font-semibold transition-transform active:scale-[0.98]"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              <span>{t("form.submitting")}</span>
            </>
          ) : (
            <>
              <span>{t("form.submit")}</span>
              <Send className="size-4 rtl:-scale-x-100" aria-hidden="true" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
