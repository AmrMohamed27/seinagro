"use client";
import DepartmentFetcher from "@/components/departments/department-fetcher";
import HeroVideoTemplate from "@/components/sections/hero-video-template";
import { Department } from "@/types";
import {
  ChartNoAxesCombined,
  ChevronDown,
  SearchCheck,
  Snowflake,
  UserRoundPen,
  Warehouse,
  Wheat,
} from "lucide-react";
import { useMessages, useTranslations } from "next-intl";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import AnimatedSection from "@/components/sections/animated-section";

const DepartmentsPage = () => {
  const t = useTranslations("HomePage.Departments");
  type KeyType = Parameters<typeof t>[0];
  const messages = useMessages().HomePage.Departments.list;
  const departments = Object.keys(messages).map((key) => ({
    id: t(`list.${key}.id` as KeyType),
    title: t(`list.${key}.title` as KeyType),
    image: t(`list.${key}.image` as KeyType),
    href: t(`list.${key}.href` as KeyType),
    text: t(`list.${key}.text` as KeyType),
  }));
  const departmentIcons = [
    {
      icon: (
        <Wheat key={0} size={24} className="mt-1 text-growth shrink-0" />
      ),
    },
    {
      icon: (
        <SearchCheck
          key={1}
          size={24}
          className="mt-1 text-growth shrink-0"
        />
      ),
    },
    {
      icon: (
        <ChartNoAxesCombined
          key={2}
          size={24}
          className="mt-1 text-growth shrink-0"
        />
      ),
    },
    {
      icon: (
        <Warehouse
          key={3}
          size={24}
          className="mt-1 text-growth shrink-0"
        />
      ),
    },
    {
      icon: (
        <Snowflake
          key={4}
          size={24}
          className="mt-1 text-growth shrink-0"
        />
      ),
    },
    {
      icon: (
        <UserRoundPen
          key={5}
          size={24}
          className="mt-1 text-growth shrink-0"
        />
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-4 mx-auto container">
      <HeroVideoTemplate
        title={t.raw("title")}
        videoSrc="/assets/videos/hero.webm"
        fallbackImage="/assets/videos/hero_fallback.png"
      />
      <AnimatedSection className="flex flex-col gap-2 mt-0 pt-0 border-0">
        {departments.map(({ id, title }, index) => (
          <Collapsible key={id} className="group" defaultOpen id={id}>
            <CollapsibleTrigger className="cursor-pointer">
              {/* Title */}
              <div className="flex flex-row gap-2 mt-2">
                {departmentIcons[index].icon}
                <span className="font-semibold text-foreground text-lg md:text-xl lg:text-2xl">
                  {title}
                </span>
                <ChevronDown
                  size={24}
                  className="mt-2 text-foreground group-data-[state=open]:rotate-180 transition duration-200"
                />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <DepartmentFetcher id={id as Department} />
            </CollapsibleContent>
          </Collapsible>
        ))}
      </AnimatedSection>
    </div>
  );
};

export default DepartmentsPage;
