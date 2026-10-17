import { cn } from "@/lib/utils";
import AnimatedSection from "./animated-section";
import Image from "next/image";

interface Props {
  title: string;
  description?: string;
  imageSrc: string;
}

const HeroImageTemplate = ({ title, description, imageSrc }: Props) => {
  return (
    <div className="relative flex justify-center items-center h-[60vh] overflow-hidden">
      {/* Title and subtitle */}
      <AnimatedSection
        className="z-20 flex flex-col justify-center items-center gap-8 mt-0 pt-0 border-0 text-white text-center"
        firstChild
      >
        <h1
          className={cn(
            "text-center font-bold  text-2xl md:text-3xl lg:text-7xl text-white"
          )}
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        ></h1>
        {description && <p>{description}</p>}
      </AnimatedSection>
      <Image
        className="top-0 left-0 absolute opacity-90 dark:opacity-60 w-full h-full object-cover"
        src={imageSrc}
        alt={title}
        width={2160}
        height={1214}
      />
    </div>
  );
};

export default HeroImageTemplate;
