import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Link } from "@/i18n/navigation";
import { ChevronDown, Layers } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";

type Props = {
  label: string;
  link: string;
};

const ClientsCollapsible = ({ label, link }: Props) => {
  const t = useTranslations("HomePage.Clients");
  const messages = useMessages();
  type KeyType = Parameters<typeof t>[0];
  const clientsObject = messages.HomePage.Clients.list;
  const clients = Object.keys(clientsObject).map((key) => ({
    id: t(`list.${key}.id` as KeyType),
    title: t(`list.${key}.title` as KeyType),
  }));
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
          {clients.map(({ id, title }, index) => (
            <li key={index}>
              <Link
                href={`/${link}#${id}`}
                className="flex flex-row gap-2 hover:underline"
              >
                <Layers
                  className="mt-1 text-growth shrink-0"
                  size={16}
                />
                <span>{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ClientsCollapsible;
