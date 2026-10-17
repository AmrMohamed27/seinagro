"use client";
import ProductFetcher from "@/components/products/product-fetcher";
import AnimatedSection from "@/components/sections/animated-section";
import HeroVideoTemplate from "@/components/sections/hero-video-template";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Product } from "@/types";
import { Bean, ChevronDown, Snowflake, Sun } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";

const ProductPage = () => {
  const t = useTranslations("HomePage.Products");
  type KeyType = Parameters<typeof t>[0];
  const messages = useMessages().HomePage.Products.list;
  const products = Object.keys(messages).map((key) => ({
    id: t(`list.${key}.id` as KeyType),
    title: t(`list.${key}.title` as KeyType),
  }));
  const productIcons = [
    {
      icon: (
        <Sun key={0} size={24} className="mt-1 text-growth shrink-0" />
      ),
    },
    {
      icon: (
        <Snowflake
          key={1}
          size={24}
          className="mt-1 text-growth shrink-0"
        />
      ),
    },
    {
      icon: (
        <Bean key={2} size={24} className="mt-1 text-growth shrink-0" />
      ),
    },
  ];
  return (
    <div className="flex flex-col gap-4 mx-auto container">
      <HeroVideoTemplate
        title={t.raw("title")}
        videoSrc="/assets/videos/winter.mp4"
        fallbackImage="/assets/videos/winter_fallback.png"
      />
      <AnimatedSection className="flex flex-col gap-2 mt-0 pt-0 border-0">
        {products.map(({ id, title }, index) => (
          <Collapsible key={id} className="group" defaultOpen id={id}>
            <CollapsibleTrigger className="cursor-pointer">
              {/* Title */}
              <div className="flex flex-row gap-2 mt-2">
                {productIcons[index].icon}
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
              <ProductFetcher id={id as Product} />
            </CollapsibleContent>
          </Collapsible>
        ))}
      </AnimatedSection>
    </div>
  );
};

export default ProductPage;
