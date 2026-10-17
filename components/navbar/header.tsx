"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import NavbarContent from "./navbar-content";

const Header = () => {
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100;

      if (window.scrollY > scrollThreshold && !scrolledPast) {
        setScrolledPast(true);
      } else if (window.scrollY <= scrollThreshold && scrolledPast) {
        setScrolledPast(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolledPast]);

  return (
    <>
      <AnimatePresence>
        {/* When scrolledPast is true, show this sticky/fixed header */}
        {scrolledPast && (
          <motion.header
            className="top-0 inset-x-0 z-50 fixed bg-background/90 backdrop-blur-md border-b border-border h-20 shadow-xs"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <NavbarContent scrolled={true} />
          </motion.header>
        )}
      </AnimatePresence>
      {/* Initial absolute header over hero */}
      <header
        className={cn(
          "top-0 inset-x-0 z-40 absolute h-20 transition-opacity duration-300",
          scrolledPast ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <NavbarContent scrolled={false} />
      </header>
    </>
  );
};

export default Header;
