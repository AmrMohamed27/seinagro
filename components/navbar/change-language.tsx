"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages } from "@/constants";
import { Locale } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { Button } from "../ui/button";

const ChangeLanguage = () => {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleChangeLang = async (value: string) => {
    const locale = value as Locale;
    router.replace(pathname, { locale });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-2" variant={"primary"}>
          <span>
            {languages.find((lang) => lang.id === currentLocale)?.name}
          </span>
          <ChevronDown size={24} className="shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-forest dark:bg-forest text-white">
        <DropdownMenuRadioGroup
          value={currentLocale}
          onValueChange={handleChangeLang}
        >
          {languages.map(({ id, name }) => (
            <DropdownMenuRadioItem key={id} value={id}>
              {name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChangeLanguage;
