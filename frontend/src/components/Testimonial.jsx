import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const Testimonial = () => {
  const testimonials = [
    {
      quote:
        "I've always been fascinated by math, but VedicMath has taken my love for numbers to a whole new level.",
      author: "Romeiro Fernandes",
      role: "Engineering Student",
    },
    {
      quote:
        "VedicMath changed my perspective on mathematics completely. What used to take minutes now takes seconds!",
      author: "Mayank Mehta",
      role: "Engineering Student",
    },
    {
      quote:
        "The techniques I've learned are not just faster—they've given me a deeper understanding of numbers and their relationships.",
      author: "Reniyas Nadar",
      role: "Engineering Student",
    },
    {
      quote:
        "As someone who struggled with math anxiety, these methods have made calculations enjoyable rather than stressful.",
      author: "Russel Daniel Paul",
      role: "Engineering Student",
    },
  ];

  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <section className="py-20 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-bricolage font-bold text-3xl md:text-4xl bg-gradient-to-r from-[#e0c9b1] to-[#d4b595] bg-clip-text text-transparent">
            What Our Students Say
          </h2>
        </motion.div>

        <div className="relative h-[350px] md:h-[300px] mb-6">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index)
                    ? 40
                    : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -20, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className={`absolute inset-0 origin-bottom w-full max-w-xl mx-auto ${
                  isActive(index)
                    ? "pointer-events-auto"
                    : "pointer-events-none"
                }`}
              >
                <div className="bg-[#1e1e23]/40 backdrop-blur-3xl border border-[#ffffff15] rounded-xl p-8 flex flex-col h-full hover:border-[#ffffff30] transition-all duration-300">
                  <svg
                    className="h-6 w-6 text-[#e0c9b1]/40 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  <motion.div>
                    <motion.p
                      className="font-inter text-[#e0c9b1]/90 mb-6 flex-grow"
                      key={`quote-${index}-${active}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      "
                      {testimonial.quote.split(" ").map((word, wordIndex) => (
                        <motion.span
                          key={wordIndex}
                          initial={{
                            filter: "blur(4px)",
                            opacity: 0,
                            y: 5,
                          }}
                          animate={{
                            filter: "blur(0px)",
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                            delay: isActive(index) ? 0.02 * wordIndex : 0,
                          }}
                          className="inline-block"
                        >
                          {word}&nbsp;
                        </motion.span>
                      ))}
                      "
                    </motion.p>
                  </motion.div>

                  <div>
                    <p className="font-bricolage font-medium text-[#e0c9b1]">
                      {testimonial.author}
                    </p>
                    <p className="font-inter text-sm text-[#e0c9b1]/70">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2a35] hover:bg-[#3a3a45] transition-colors duration-300"
            aria-label="Previous testimonial"
          >
            <IconArrowLeft className="h-5 w-5 text-[#e0c9b1] transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={handleNext}
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2a35] hover:bg-[#3a3a45] transition-colors duration-300"
            aria-label="Next testimonial"
          >
            <IconArrowRight className="h-5 w-5 text-[#e0c9b1] transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="flex justify-center mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`mx-1 h-2 w-2 rounded-full transition-all duration-300 ${
                active === index ? "bg-[#e0c9b1] w-4" : "bg-[#e0c9b1]/30"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
