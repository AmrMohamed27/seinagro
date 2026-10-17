import { useMessages, useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import DepartmentPage from "./department-page";
import { Department } from "@/types";

type Props = {
  id: Department;
};

const DepartmentFetcher = ({ id }: Props) => {
  const t = useTranslations("HomePage.Departments.list");
  type KeyType = Parameters<typeof t>[0];
  const messages = useMessages();
  const department = Object.keys(messages.HomePage.Departments.list)
    .map((key) => {
      return {
        text: t(`${key}.text` as KeyType),
        image: t(`${key}.image` as KeyType),
        title: t(`${key}.title` as KeyType),
        href: t(`${key}.href` as KeyType),
        id: t(`${key}.id` as KeyType),
      };
    })
    .find((dep) => dep.id === id);
  if (!department) {
    notFound();
  }
  return <DepartmentPage department={department} />;
};

export default DepartmentFetcher;
