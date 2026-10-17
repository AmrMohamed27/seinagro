"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  duration?: number;
  opacity?: number;
  firstChild?: boolean;
};

const AnimatedSection = ({
  children,
  className,
  id,
  duration = 0.5,
  opacity = 1,
  firstChild = false,
}: Props) => {
  const shouldReduceMotion = useReducedMotion();

  const initialAnimation = shouldReduceMotion
    ? { opacity: 0 }
    : { y: 24, opacity: 0 };

  const targetAnimation = shouldReduceMotion
    ? { opacity }
    : { y: 0, opacity };

  if (firstChild) {
    return (
      <motion.div
        id={id}
        initial={initialAnimation}
        animate={targetAnimation}
        transition={{ duration, ease: "easeOut" }}
        className={cn("w-full", className)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      id={id}
      initial={initialAnimation}
      whileInView={targetAnimation}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, ease: "easeOut" }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
