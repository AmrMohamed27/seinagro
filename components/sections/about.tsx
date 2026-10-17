import { Link } from "@/i18n/navigation";
import { cn, renderBoldHtml, renderGreenHtml } from "@/lib/utils";
import {
  BadgeCheck,
  FlaskConical,
  Globe,
  Leaf,
  Plane,
  Sprout,
  Tractor,
  TrendingUp,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import { useLocale, useMessages, useTranslations } from "next-intl";
import Image from "next/image";
import { getLangDir } from "rtl-detect";
import { Button } from "../ui/button";
import AnimatedSection from "./animated-section";
import { Feature } from "../ui/feature";

const AboutSection = () => {
  const t = useTranslations("HomePage");
  type KeyType = Parameters<typeof t>[0];
  const messages = useMessages();
  const goalsObject = messages.HomePage.About.Goals.list;

  const goalsIcons = [
    { icon: <Sprout key={0} size={32} /> },
    { icon: <Globe key={1} size={32} /> },
    { icon: <Leaf key={2} size={32} /> },
    { icon: <TrendingUp key={3} size={32} /> },
    { icon: <Tractor key={4} size={32} /> },
  ];
  const goals = Object.keys(goalsObject).map((key) => ({
    text: t(`About.Goals.list.${key}.text` as KeyType),
    icon: goalsIcons[parseInt(key) - 1].icon,
  }));
  const values = messages.HomePage.About.Values.list;
  const valuesIcons = [
    {
      icon: <BadgeCheck key={0} size={24} className="text-growth" />,
    },
    { icon: <FlaskConical key={1} size={24} className="text-growth" /> },
    {
      icon: <UserRoundPlus key={2} size={24} className="text-growth" />,
    },
    { icon: <Plane key={3} size={24} className="text-growth" /> },
    { icon: <UsersRound key={4} size={24} className="text-growth" /> },
  ];
  const logoSublist = messages.HomePage.About.logo.sublist;
  const locale = useLocale();
  const dir = getLangDir(locale);
  return (
    <AnimatedSection
      id="about"
      className="flex flex-col justify-center items-center gap-8 mx-auto px-2 pt-0 border-0 container"
      duration={0.8}
    >
      {/* About us */}
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <div className="flex flex-col justify-center items-center gap-4 text-center">
          <h2
            className={cn(
              "font-bold text-xl md:text-3xl lg:text-5xl",
              locale === "ar" ? "" : ""
            )}
            dangerouslySetInnerHTML={{
              __html: renderGreenHtml(t.raw("About.title")),
            }}
          ></h2>
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={500}
            height={500}
            className={"h-auto  max-w-[150px]"}
          />
          <p
            className=""
            dangerouslySetInnerHTML={{
              __html: renderBoldHtml(t.raw("About.description")),
            }}
          ></p>
          <Link href={"/about"}>
            <Button variant={"primary"} size={"lg"}>
              {t("About.Button")}
            </Button>
          </Link>
        </div>
      </div>

      {/* Our Goals */}
      <div className="flex flex-col justify-center items-center gap-6">
        <h2
          className={cn(
            "font-bold text-xl md:text-2xl lg:text-3xl",
            locale === "ar" ? "" : ""
          )}
          dangerouslySetInnerHTML={{
            __html: renderGreenHtml(t.raw("About.Goals.title")),
          }}
        />
        <div className="z-10 relative max-md:gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mx-auto py-4 max-w-7xl">
          {goals.map((goal, index) => (
            <Feature key={index} {...goal} index={index} />
          ))}
        </div>
      </div>

      {/* Our Values */}
      <div className="flex flex-col justify-center items-center gap-6 mx-auto container">
        <h2
          className={cn(
            "font-bold text-xl md:text-2xl lg:text-3xl",
            locale === "ar" ? "" : ""
          )}
          dangerouslySetInnerHTML={{
            __html: renderGreenHtml(t.raw("About.Values.title")),
          }}
        />
        <ul className="flex flex-row flex-wrap justify-start items-start gap-y-2">
          {Object.keys(values).map((key) => (
            <li
              key={key}
              className="flex flex-row items-start gap-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              {/* Icon */}
              <div className="flex justify-center items-start p-2 border-2 border-forest rounded-full">
                {valuesIcons[parseInt(key) - 1].icon}
              </div>
              <div className="flex flex-col items-start text-start">
                <span className="font-semibold text-growth lg:text-lg">
                  {t(`About.Values.list.${key}.title` as KeyType)}
                </span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: renderBoldHtml(
                      t.raw(`About.Values.list.${key}.text` as KeyType)
                    ),
                  }}
                ></span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Our Logo */}
      <div className="flex flex-col justify-center items-center gap-4 text-center">
        <h2
          className={cn(
            "font-bold text-xl md:text-2xl lg:text-3xl",
            locale === "ar" ? "" : ""
          )}
          dangerouslySetInnerHTML={{
            __html: renderGreenHtml(t.raw("About.logo.title")),
          }}
        ></h2>
        <div className="flex xl:flex-row flex-col items-center gap-4" dir="ltr">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={500}
            height={500}
          />
          <div className="flex flex-col gap-2 text-start" dir={dir}>
            {Object.keys(logoSublist).map((key) => (
              <div key={key} className="flex flex-row gap-2">
                <Image
                  src="/assets/images/leaves.png"
                  alt={t.raw(`About.logo.title`)}
                  width={500}
                  height={500}
                  className="mt-1 w-12 h-12 shrink-0"
                />
                <span
                  dangerouslySetInnerHTML={{
                    __html: renderBoldHtml(
                      t.raw(`About.logo.sublist.${key}` as KeyType)
                    ),
                  }}
                ></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutSection;
