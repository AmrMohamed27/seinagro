import { Link } from "@/i18n/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";
import Image from "next/image";
import {
  FaFacebook as FacebookIcon,
  FaYoutube as YoutubeIcon,
} from "react-icons/fa";

const Footer = () => {
  const t = useTranslations("Footer");
  const tSocial = useTranslations("HomePage.Contact.socialMedia");
  type KeyType = Parameters<typeof t>[0];
  const messages = useMessages();
  const links = messages.Footer.links.list;
  const contacts = messages.Footer.contact.list;
  const contactLogos = [
    <MapPin
      key={"Address"}
      size={16}
      className="mt-1 text-growth shrink-0"
    />,
    <Mail
      key={"Email"}
      size={24}
      className="mt-1 text-growth shrink-0"
    />,
    <Phone
      key={"Phone"}
      size={20}
      className="mt-1 text-growth shrink-0"
    />,
    <Phone
      key={"Phone2"}
      size={20}
      className="mt-1 text-growth shrink-0"
    />,
  ];

  return (
    <>
      <div className="flex xl:flex-row flex-col xl:justify-between gap-8 mt-8 p-4 lg:p-8 border-forest border-t-2 dark:border-border w-full">
        {/* Logo and Slogan */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-start gap-2">
            <Image
              src={"/assets/images/logo.png"}
              alt="logo"
              width={800}
              height={800}
              className="w-16 h-auto"
            />
            <div className="flex flex-col gap-3">
              <span className="font-semibold">{t("companyName")}</span>
              <p className="text-sm">{t("slogan")}</p>
            </div>
          </div>
          {/* Footer Text */}
          <div className="w-full text-muted-foreground text-sm">
            {t("footerText")}
          </div>
        </div>
        {/* Links */}
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold">{t("links.label")}</h2>
          <ul className="flex flex-col gap-2">
            {Object.keys(links).map((key) => (
              <li key={key}>
                <Link
                  href={t(`links.list.${key}.href` as KeyType)}
                  className="hover:underline"
                >
                  {t(`links.list.${key}.label` as KeyType)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold">{t("contact.label")}</h2>
          <ul className="flex flex-col gap-2">
            {Object.keys(contacts).map((key) => (
              <li key={key} className="flex flex-row gap-2">
                {contactLogos.find((logo) => logo.key === key)}
                <span>{t(`contact.list.${key}` as KeyType)}</span>
              </li>
            ))}
            <li className="flex flex-row gap-4">
              <Link
                href={tSocial("facebook.link")}
                className="flex flex-row gap-2 hover:underline"
              >
                <FacebookIcon
                  size={20}
                  className="mt-1 text-growth shrink-0"
                />
                <span>{tSocial("facebook.label")}</span>
              </Link>
            </li>
            <li>
              <Link
                href={tSocial("youtube.link")}
                className="flex flex-row gap-2 hover:underline"
              >
                <YoutubeIcon
                  size={20}
                  className="mt-1 text-growth shrink-0"
                />
                <span>{tSocial("youtube.label")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
