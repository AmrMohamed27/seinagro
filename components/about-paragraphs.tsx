import { renderBoldHtml } from "@/lib/utils";
import { Check } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";
import { Fragment } from "react";

const AboutParagraphs = () => {
  const messages = useMessages();
  const paragraphsObject = messages.AboutPage.brief;
  const t = useTranslations("AboutPage.brief");
  type KeyType = Parameters<typeof t>[0];
  const paragraphs = Object.keys(paragraphsObject).map((key) =>
    t.raw(key as KeyType)
  );
  return (
    <div className="flex flex-col gap-2">
      {paragraphs.map((text, index) => (
        <Fragment key={index}>
          <div className="flex flex-row items-start gap-2">
            <Check className="mt-2 text-growth shrink-0" size={16} />
            <span
              dangerouslySetInnerHTML={{ __html: renderBoldHtml(text) }}
            ></span>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default AboutParagraphs;
