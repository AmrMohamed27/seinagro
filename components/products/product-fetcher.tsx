import { useMessages, useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import ProductPageTemplate from "./product-page";
import { renderBoldHtml } from "@/lib/utils";

type Props = {
  id: "summer" | "winter" | "seeds";
};

const ProductFetcher = ({ id }: Props) => {
  const t = useTranslations("HomePage.Products.list");
  type KeyType = Parameters<typeof t>[0];
  const messages = useMessages();
  const product = Object.keys(messages.HomePage.Products.list)
    .map((key) => {
      return {
        text: renderBoldHtml(t.raw(`${key}.text` as KeyType)),
        video: t(`${key}.video` as KeyType),
        title: t(`${key}.title` as KeyType),
        href: t(`${key}.href` as KeyType),
        id: t(`${key}.id` as KeyType),
      };
    })
    .find((dep) => dep.id === id);
  if (!product) {
    notFound();
  }
  return <ProductPageTemplate product={product} />;
};

export default ProductFetcher;
