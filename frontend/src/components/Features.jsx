import React from "react";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <>
      <section className="py-16 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="font-bricolage font-bold text-3xl md:text-4xl bg-gradient-to-r from-[#e0c9b1] to-[#d4b595] bg-clip-text text-transparent mb-4">
              Why Learn Vedic Mathematics?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Speed Calculation",
                description:
                  "Perform complex calculations mentally at remarkable speed, faster than conventional methods.",
              },
              {
                icon: "🧠",
                title: "Mental Agility",
                description:
                  "Develop exceptional concentration, memory, and cognitive flexibility through regular practice.",
              },
              {
                icon: "🔄",
                title: "Versatile Techniques",
                description:
                  "Learn flexible methods that can be applied to various mathematical operations and problems.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-[#1e1e23]/40 backdrop-blur-sm border border-[#ffffff05] rounded-xl p-8 flex flex-col items-start hover:border-[#ffffff20] transition-all duration-100"
              >
                <div className="bg-gradient-to-br from-[#e0c9b1]/20 to-[#e0c9b1]/10 p-4 rounded-lg mb-4 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="font-bricolage font-semibold text-xl mb-2 text-[#e0c9b1]">
                  {feature.title}
                </h3>
                <p className="font-inter text-[#e0c9b1]/80">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
