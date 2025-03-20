import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-1/2 -translate-x-1/2 w-[90%] max-w-4xl px-6 lg:px-6 py-4 z-10 transition-all duration-300 rounded-4xl mt-4 ${
          isScrolled
            ? "bg-[#0f0f12]/70 backdrop-blur-lg border border-[#2a2a35]/30"
            : "bg-[#0f0f12]/40 backdrop-blur-sm border border-white/10"
        }`}
      >
        <div className="mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="font-bricolage font-bold text-2xl bg-gradient-to-r from-[#e0c9b1] to-[#d4b595] bg-clip-text text-transparent"
            >
              VedicMath
            </motion.div>
          </div>

          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2 bg-[#e0c9b1] text-[#0f0f12] rounded-lg text-sm font-inter font-semibold hover:bg-[#d4b595] transition-colors duration-300"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
