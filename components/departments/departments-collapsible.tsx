import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Link } from "@/i18n/navigation";
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

interface Props {
  label: string;
}

const DepartmentsCollapsible = ({ label }: Props) => {
  const t = useTranslations("NavDepartments");
  type KeyType = Parameters<typeof t>[0];
  const messages = useMessages().NavDepartments;
  const departments = Object.keys(messages).map((key) => ({
    label: t(`${key}.label` as KeyType),
    href: t(`${key}.href` as KeyType),
  }));
  const departmentIcons = [
    {
      icon: (
        <Wheat key={0} size={16} className="mt-1 text-growth shrink-0" />
      ),
    },
    {
      icon: (
        <SearchCheck
          key={1}
          size={16}
          className="mt-1 text-growth shrink-0"
        />
      ),
    },
    {
      icon: (
        <ChartNoAxesCombined
          key={2}
          size={16}
          className="mt-1 text-growth shrink-0"
        />
      ),
    },
    {
      icon: (
        <Warehouse
          key={3}
          size={16}
          className="mt-1 text-growth shrink-0"
        />
      ),
    },
    {
      icon: (
        <Snowflake
          key={4}
          size={16}
          className="mt-1 text-growth shrink-0"
        />
      ),
    },
    {
      icon: (
        <UserRoundPen
          key={5}
          size={16}
          className="mt-1 text-growth shrink-0"
        />
      ),
    },
  ];

  return (
    <Collapsible>
      <CollapsibleTrigger
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
        }}
        asChild
      >
        <div className="group flex flex-row justify-between items-center gap-2">
          <span>{label}</span>
          <ChevronDown
            size={24}
            className="group-data-[state=open]:rotate-180 transition duration-200 shrink-0"
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 py-4">
        <ul className="flex flex-col gap-2">
          {departments.map(({ label, href }, index) => (
            <li key={index}>
              <Link href={href} className="flex flex-row gap-2 hover:underline">
                {departmentIcons[index].icon}
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DepartmentsCollapsible;
