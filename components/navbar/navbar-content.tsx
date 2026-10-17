import { Link, usePathname } from "@/i18n/navigation";
import { useMessages, useTranslations } from "next-intl";
import Image from "next/image";
import ClientsHoverCard from "../clients/clients-hover-card";
import DepartmentsHoverCard from "../departments/departments-hover-card";
import ProductHoverCard from "../products/product-hover-card";
import ChangeLanguage from "./change-language";
import { DarkModeToggle } from "./dark-mode-toggle";
import MobileMenu from "./mobile-menu";
import { cn } from "@/lib/utils";

const NavbarContent = () => {
  const { NavLinks } = useMessages();
  const t = useTranslations("NavLinks");
  type KeyType = Parameters<typeof t>[0];
  const pathname = usePathname();

  return (
    <div
      className={`flex flex-row justify-between items-center mx-auto px-2 sm:px-4 md:px-8 lg:px-8 py-4 container font-bold  `}
    >
      {/* Logo */}
      <Link href="/">
        <Image
          src={"/assets/images/logo.png"}
          alt="logo"
          width={100}
          height={100}
          className="w-16 h-auto"
        />
      </Link>

      {/* Desktop Nav Links */}
      <ul className="hidden xl:flex flex-row items-center gap-8 text-xl">
        {Object.keys(NavLinks).map((key) => (
          <li
            key={key}
            className={cn(
              pathname.includes(key)
                ? "text-growth"
                : pathname === "/" && key === "home"
                  ? "text-growth"
                  : ""
            )}
          >
            {key === "departments" ? (
              <DepartmentsHoverCard label={t(key as KeyType)} id={`/${key}`} />
            ) : key === "clients" ? (
              <ClientsHoverCard label={t(key as KeyType)} link={`/${key}`} />
            ) : key === "products" ? (
              <ProductHoverCard label={t(key as KeyType)} id={`/${key}`} />
            ) : key === "about" ? (
              <Link href={`/${key}`}>{t(key as KeyType)}</Link>
            ) : (
              <Link href={`/#${key}`}>{t(key as KeyType)}</Link>
            )}
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="flex flex-row items-center gap-4">
        <DarkModeToggle />
        <ChangeLanguage />
        {/* Mobile Menu */}
        <div className="xl:hidden">
          <MobileMenu />
        </div>
      </div>
    </div>
  );
};

export default NavbarContent;
