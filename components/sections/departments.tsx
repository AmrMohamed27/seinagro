import { renderGreenHtml } from "@/lib/utils";
import { useTranslations } from "next-intl";
import AnimatedSection from "./animated-section";
import { DepartmentsList } from "./departments-list";

const DepartmentsSection = () => {
  const t = useTranslations("HomePage.Departments");
  return (
    <AnimatedSection
      id="departments"
      className="flex flex-col justify-center items-center gap-10 mx-auto px-2 container"
    >
      <h2
        className="font-bold text-xl md:text-3xl lg:text-5xl"
        dangerouslySetInnerHTML={{ __html: renderGreenHtml(t.raw("title")) }}
      />
      <DepartmentsList />
    </AnimatedSection>
  );
};

export default DepartmentsSection;
