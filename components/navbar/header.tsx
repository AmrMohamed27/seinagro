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
        {/* When scrolledPast is true, show this fixed header */}
        {scrolledPast && (
          <motion.div
            className="top-0 right-0 left-0 z-50 fixed bg-background backdrop-blur-2xl border-b-2 h-24"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 0.9 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <NavbarContent />
          </motion.div>
        )}
      </AnimatePresence>
      {/* This is the initial absolute header that's always present when not scrolled */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className={cn(
          "absolute top-0 left-0 right-0 z-40 h-24 text-white  ",
          scrolledPast ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <NavbarContent />
      </motion.div>
    </>
  );
};

export default Header;
