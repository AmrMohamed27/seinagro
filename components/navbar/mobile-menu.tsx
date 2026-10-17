"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { MenuIcon } from "lucide-react";
import { useLocale, useMessages, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import ClientsCollapsible from "../clients/clients-collapsible";
import DepartmentsCollapsible from "../departments/departments-collapsible";
import { Button } from "../ui/button";
import ProductsCollapsible from "../products/product-collapsible";
import { getLangDir } from "rtl-detect";

const MobileMenu = () => {
  const { NavLinks } = useMessages();
  const t = useTranslations("NavLinks");
  type KeyType = Parameters<typeof t>[0];
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((open) => !open);
  };

  const locale = useLocale();
  const side = getLangDir(locale) === "ltr" ? "left" : "right";

  return (
    <Sheet open={open} onOpenChange={toggleOpen}>
      <SheetTrigger asChild>
        <Button variant={"primary"} size={"icon"}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll" side={side}>
        <SheetHeader>
          <SheetTitle>
            <div className="max-w-[80px]">
              <Link href="/" className="">
                <Image
                  src={"/assets/images/logo.png"}
                  alt="logo"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4 py-2">
          {/* Nav Links */}
          <ul className="flex flex-col gap-2 text-lg">
            {Object.keys(NavLinks).map((key) => (
              <li
                key={key}
                className="flex *:flex-1 hover:bg-muted px-4 py-2 rounded-md cursor-pointer"
                onClick={() => setOpen(false)}
              >
                {key === "departments" ? (
                  <DepartmentsCollapsible label={t(key as KeyType)} />
                ) : key === "clients" ? (
                  <ClientsCollapsible
                    label={t(key as KeyType)}
                    link={`${key}`}
                  />
                ) : key === "products" ? (
                  <ProductsCollapsible label={t(key as KeyType)} />
                ) : key === "about" ? (
                  <Link className="w-full" href={`/${key}`}>
                    {t(key as KeyType)}
                  </Link>
                ) : (
                  <Link className="w-full" href={`/#${key}`}>
                    {t(key as KeyType)}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
