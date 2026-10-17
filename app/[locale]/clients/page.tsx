"use client";
import AnimatedSection from "@/components/sections/animated-section";
import HeroImageTemplate from "@/components/sections/hero-image-template";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { renderBoldHtml } from "@/lib/utils";
import { ChevronDown, Layers, MapPin } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";
import React from "react";

const ClientsPage = () => {
  const t = useTranslations("HomePage.Clients");
  const messages = useMessages();
  type KeyType = Parameters<typeof t>[0];
  const clients = messages.HomePage.Clients.list;
  const companiesSublist = messages.HomePage.Clients.sublist;

  return (
    <div className="flex flex-col gap-8">
      {/* Image */}
      <HeroImageTemplate
        title={t.raw("title")}
        imageSrc={"/assets/images/clients.jpeg"}
      />
      <AnimatedSection
        firstChild
        className="flex flex-col gap-4 mt-0 pt-0 border-0"
      >
        {Object.keys(clients).map((key, index) => (
          <div
            className="flex flex-col gap-4"
            id={t(`list.${key}.id` as KeyType)}
            key={index}
          >
            <Collapsible
              key={index}
              className="group"
              defaultOpen
              id={t(`list.${key}.id` as KeyType)}
            >
              <CollapsibleTrigger className="cursor-pointer">
                {/* Title */}
                <div className="flex flex-row gap-2 mt-2">
                  <Layers
                    className="mt-1 text-growth shrink-0"
                    size={24}
                  />
                  <span className="font-semibold text-foreground text-lg md:text-xl lg:text-2xl">
                    {t(`list.${key}.title` as KeyType)}
                  </span>
                  <ChevronDown
                    size={24}
                    className="mt-2 text-foreground group-data-[state=open]:rotate-180 transition duration-200"
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2 px-4 md:px-8 lg:px-12">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: renderBoldHtml(
                        t.raw(`list.${key}.text` as KeyType)
                      ),
                    }}
                  ></p>
                  {key === "2" && (
                    <div className="flex flex-col gap-2">
                      {Object.keys(companiesSublist).map((key, index) => {
                        const companies: string[] = [];
                        for (let i = 1; i <= 8; i++) {
                          if (!t.has(`sublist.${key}.c${i}` as KeyType)) {
                            break;
                          }
                          companies.push(t(`sublist.${key}.c${i}` as KeyType));
                        }
                        return (
                          <div
                            key={index}
                            className="flex flex-row flex-wrap gap-2 md:px-4"
                          >
                            <div className="flex flex-row items-center gap-2">
                              <MapPin
                                className="text-growth shrink-0"
                                size={16}
                              />
                              <h3 className={`font-semibold md:text-lg `}>
                                {t(`sublist.${key}.location` as KeyType)}:
                              </h3>
                            </div>
                            <div className="flex flex-row flex-wrap items-center gap-2">
                              {companies.map((company, index) => (
                                <React.Fragment key={index}>
                                  <span>{company}</span>
                                  {index < companies.length - 1 && (
                                    <Separator
                                      orientation="vertical"
                                      className="max-h-4"
                                    />
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </AnimatedSection>
    </div>
  );
};

export default ClientsPage;
