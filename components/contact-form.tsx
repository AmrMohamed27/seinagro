"use client";
import { sendContactEmail } from "@/actions/contact";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Ban, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import { z } from "zod";

const ContactForm = () => {
  const t = useTranslations("HomePage.Contact");
  const formSchema = z.object({
    fullName: z.string().min(2, t("FullName.message")),
    email: z.string().email(t("formEmail.message")),
    content: z.string().min(1, t("Content.message")),
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      content: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, fullName, content } = values;
    const { success } = await sendContactEmail(email, fullName, content);
    if (success) {
      toast(t("success"), {
        icon: <Mail size={16} />,
        closeButton: true,
        style: { backgroundColor: "#008000" },
      });
    } else {
      toast(t("fail"), {
        icon: <Ban size={16} />,
        closeButton: true,
        style: { backgroundColor: "#800000" },
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-8 min-w-[200px]"
      >
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("FullName.label")}</FormLabel>
              <FormControl>
                <Input placeholder="Amr Mohamed" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("formEmail.label")}</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("Content.label")}</FormLabel>
              <FormControl>
                <TextareaAutosize
                  className="flex bg-transparent dark:bg-input/30 disabled:opacity-50 shadow-xs px-3 py-2 border border-input aria-invalid:border-destructive focus-visible:border-ring rounded-md outline-none aria-invalid:ring-destructive/20 focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:aria-invalid:ring-destructive/40 w-full min-h-16 placeholder:text-muted-foreground md:text-sm text-base transition-[color,box-shadow] field-sizing-content resize-none disabled:cursor-not-allowed"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"primary"}>
          {t("Submit")}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
