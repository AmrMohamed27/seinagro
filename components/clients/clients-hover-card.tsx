import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "@/i18n/navigation";
import { ChevronDown, Layers } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";

type Props = {
  label: string;
  link: string;
};

const ClientsHoverCard = ({ label, link }: Props) => {
  const t = useTranslations("HomePage.Clients");
  const messages = useMessages();
  type KeyType = Parameters<typeof t>[0];
  const clientsObject = messages.HomePage.Clients.list;
  const clients = Object.keys(clientsObject).map((key) => ({
    id: t(`list.${key}.id` as KeyType),
    title: t(`list.${key}.title` as KeyType),
  }));
  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer" asChild>
        <Link
          href={`${link}`}
          className="group flex flex-row items-center gap-2"
        >
          <span>{label}</span>
          <ChevronDown
            size={24}
            className="group-data-[state=open]:rotate-180 transition duration-200 shrink-0"
          />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="bg-background">
        <ul className="flex flex-col gap-2">
          {clients.map(({ id, title }, index) => (
            <li key={index}>
              <Link
                href={`/${link}#${id}`}
                className="flex flex-row gap-2 hover:underline"
              >
                <Layers className="mt-1 text-growth" size={16} />
                <span>{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ClientsHoverCard;
