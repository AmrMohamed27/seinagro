import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Link } from "@/i18n/navigation";
import { ChevronDown, Snowflake, Sun, Wheat } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";

type Props = {
  label: string;
};

const ProductsCollapsible = ({ label }: Props) => {
  const t = useTranslations("HomePage.Products.list");
  const messages = useMessages();
  type KeyType = Parameters<typeof t>[0];
  const productsObject = messages.HomePage.Products.list;
  const products = Object.keys(productsObject).map((key) => ({
    title: t(`${key}.title` as KeyType),
    href: t(`${key}.href` as KeyType),
  }));
  const icons = [
    {
      icon: <Sun key={0} size={16} className="text-growth" />,
    },
    { icon: <Snowflake key={1} size={16} className="text-growth" /> },
    { icon: <Wheat key={2} size={16} className="text-growth" /> },
  ];
  return (
    <Collapsible>
      <CollapsibleTrigger className="cursor-pointer" asChild>
        <div
          className="group flex flex-row justify-between items-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span>{label}</span>
          <ChevronDown
            size={24}
            className="group-data-[state=open]:rotate-180 transition duration-200 shrink-0"
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="flex flex-col gap-2 p-4">
          {products.map(({ href, title }, index) => (
            <li key={index}>
              <Link
                href={href}
                className="flex flex-row items-center gap-2 hover:underline"
              >
                {icons[index].icon}
                <span>{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ProductsCollapsible;
