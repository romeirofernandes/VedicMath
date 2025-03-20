import React from "react";
import { motion } from "framer-motion";

const StatsCard = ({ icon, title, value }) => {
  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-[#1e1e23]/40 backdrop-blur-sm border border-[#ffffff05] rounded-xl p-6 hover:border-[#ffffff10] transition-all duration-300"
      >
        <div className="flex items-center mb-3">
          <div className="p-2 bg-[#2a2a35] rounded-lg mr-3">{icon}</div>
          <h3 className="font-bricolage font-medium">{title}</h3>
        </div>
        <p className="text-2xl font-bricolage font-semibold text-[#e0c9b1]">
          {value}
        </p>
      </motion.div>
    </>
  );
};

export default StatsCard;
