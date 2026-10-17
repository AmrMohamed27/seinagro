"use client";
import { ProductObject } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  product: ProductObject;
};

const ProductPageTemplate = ({ product }: Props) => {
  // Destructure department object
  const { text } = product;
  const sentences = text
    .split(".")
    .map((s) => s.trim())
    .filter(Boolean);
  return (
    <div className="flex flex-col gap-8 py-2">
      {/* Text */}
      <motion.div
        className="mt-0 px-2 sm:px-4 md:px-8 pt-0 border-0"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <ul className="flex flex-col gap-2">
          {sentences.map((s, i) => (
            <li key={i} className="flex flex-row gap-0">
              <Image
                src={"/assets/images/leaves.png"}
                alt={"roots"}
                width={500}
                height={500}
                className="w-12 h-12 shrink-0"
              />
              <span
                dangerouslySetInnerHTML={{ __html: s + "." + "<br />" }}
              ></span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default ProductPageTemplate;
