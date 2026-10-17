import { renderGreenHtml } from "@/lib/utils";
import { useMessages, useTranslations } from "next-intl";
import { AceternityCarousel } from "../ui/aceternity-carousel";
import AnimatedSection from "./animated-section";
const ProductsSection = () => {
  const t = useTranslations("HomePage.Products");
  type KeyType = Parameters<typeof t>[0];
  const messages = useMessages();
  const products = Object.keys(messages.HomePage.Products.list).map((key) => {
    return {
      title: t(`list.${key}.title` as KeyType),
      href: t(`list.${key}.href` as KeyType),
      src: t(`list.${key}.image` as KeyType),
      button: t("button"),
    };
  });
  return (
    <AnimatedSection
      id="products"
      className="flex flex-col justify-center items-center gap-8 mx-auto mt-0 px-2 pt-4 border-0 container"
    >
      <h2
        className="font-bold text-xl md:text-3xl lg:text-5xl"
        dangerouslySetInnerHTML={{ __html: renderGreenHtml(t.raw("title")) }}
      />
      <div className="relative py-16 w-full h-full overflow-hidden">
        <AceternityCarousel slides={products} />
      </div>
    </AnimatedSection>
  );
};

export default ProductsSection;
