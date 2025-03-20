import { motion } from "framer-motion";
import Features from "../components/Features";
import Header from "../components/Header";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";

export default function Landing() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f12] to-[#1a1a21] text-[#e0c9b1] font-inter">
      <Header />

      <section className="pt-32 pb-20 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center space-y-6"
          >
            <motion.span
              variants={item}
              className="px-4 py-1.5 bg-[#2a2a35] rounded-full text-sm font-medium"
            >
              Ancient Wisdom, Modern Approach
            </motion.span>

            <motion.h1
              variants={item}
              className="font-bricolage font-bold text-4xl md:text-5xl lg:text-6xl max-w-5xl bg-gradient-to-r from-[#e0c9b1] to-[#d4b595] bg-clip-text text-transparent"
            >
              Math with Vedic Techniques
            </motion.h1>

            <motion.p
              variants={item}
              className="font-inter text-lg md:text-xl max-w-2xl text-[#e0c9b1]/80"
            >
              Learn the ancient mathematical system that enables lightning-fast
              calculations, enhances mental agility, and provides a deeper
              understanding of numbers.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col md:flex-row gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-[#e0c9b1] text-[#0f0f12] rounded-md font-inter font-bold hover:bg-[#d4b595] transition-colors duration-300"
              >
                Start Learning
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 border border-[#e0c9b1]/30 text-[#e0c9b1] rounded-md font-inter font-medium hover:border-[#e0c9b1] transition-all duration-300"
                onClick={() => {
                  document
                    .getElementById("testimonials-section")
                    .scrollIntoView({
                      behavior: "smooth",
                    });
                }}
              >
                View Testimonials
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Features />

      <section id="testimonials-section" className="scroll-mt-13">
        <Testimonial autoplay={true}/>
      </section>

      <Footer />
    </div>
  );
}
