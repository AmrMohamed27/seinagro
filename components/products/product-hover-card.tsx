import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "@/i18n/navigation";
import { ChevronDown, Snowflake, Sun, Wheat } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";

interface Props {
  label: string;
  id: string;
}

const ProductHoverCard = ({ label, id }: Props) => {
  const t = useTranslations("HomePage.Products.list");
  type KeyType = Parameters<typeof t>[0];
  const messages = useMessages().HomePage.Products.list;
  const products = Object.keys(messages).map((key) => ({
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
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer" asChild>
        <Link href={id} className="group flex flex-row items-center gap-2">
          <span>{label}</span>
          <ChevronDown
            size={24}
            className="group-data-[state=open]:rotate-180 transition duration-200 shrink-0"
          />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="bg-background">
        <ul className="flex flex-col gap-2">
          {products.map(({ title, href }, index) => (
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
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProductHoverCard;
