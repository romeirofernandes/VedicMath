import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VedicAdditionAnimation = ({ num1 = 86, num2 = 57 }) => {
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Find the closest round number (base) and calculate complement
  const base = Math.ceil(num1 / 100) * 100;
  const complement = base - num1;
  const result = base + num2 - complement;

  // Pause and resume animation
  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  // Auto-advance through animation steps
  useEffect(() => {
    if (!isAnimating) return;

    const stepTimings = [3000, 3000, 3000, 3000, 3000];
    const timer = setTimeout(() => {
      setAnimationStep((prev) => (prev < 4 ? prev + 1 : 0));
    }, stepTimings[animationStep]);

    return () => clearTimeout(timer);
  }, [animationStep, isAnimating]);

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="font-bricolage font-semibold text-xl">
          Vedic Addition: {num1} + {num2}
        </h3>
        <button
          onClick={toggleAnimation}
          className="text-sm px-3 py-1 rounded bg-[#2a2a35] hover:bg-[#3a3a45] transition-colors"
        >
          {isAnimating ? "Pause" : "Resume"}
        </button>
      </div>

      <div className="bg-[#1e1e23]/40 border border-[#ffffff10] rounded-xl p-6 h-[280px] flex items-center justify-center relative">
        {/* Step indicators */}
        <div className="absolute top-4 left-0 right-0 flex justify-center space-x-2">
          {[0, 1, 2, 3, 4].map((step) => (
            <button
              key={step}
              onClick={() => setAnimationStep(step)}
              className={`w-2 h-2 rounded-full transition-all ${
                animationStep === step ? "bg-[#e0c9b1]" : "bg-[#e0c9b1]/30"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Show the starting numbers */}
          {animationStep === 0 && (
            <motion.div
              key="step1"
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-6 text-4xl font-bricolage font-bold">
                <motion.div
                  className="text-[#e0c9b1]"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: 1, repeatDelay: 0.3 }}
                >
                  {num1}
                </motion.div>
                <div className="text-[#e0c9b1]/70">+</div>
                <motion.div
                  className="text-[#e0c9b1]"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: 1,
                    repeatDelay: 0.3,
                    delay: 0.7,
                  }}
                >
                  {num2}
                </motion.div>
              </div>
              <p className="mt-6 text-[#e0c9b1]/80">
                We'll use the Vedic complementary method to calculate this
                quickly.
              </p>
            </motion.div>
          )}

          {/* Step 2: Identify the base */}
          {animationStep === 1 && (
            <motion.div
              key="step2"
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <motion.div
                  className="w-20 h-20 rounded-full bg-[#e0c9b1]/20 flex items-center justify-center text-2xl font-bold border-2 border-[#e0c9b1]/30"
                  animate={{ scale: [0.95, 1.05, 0.98, 1] }}
                  transition={{ duration: 2, repeat: 1, repeatDelay: 0.5 }}
                >
                  {num1}
                </motion.div>
                <motion.div
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#d4b595] flex items-center justify-center text-[#0f0f12] text-lg font-bold"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  +{complement}
                </motion.div>
                <motion.div
                  className="absolute -bottom-10 w-full text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  <span className="text-xl font-semibold">= {base}</span>
                </motion.div>
              </div>
              <motion.p
                className="mt-16 text-center max-w-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <span className="font-semibold text-[#d4b595]">Step 1:</span>{" "}
                Find a convenient base near {num1}.
                <br />
                {num1} + {complement} = {base}
              </motion.p>
            </motion.div>
          )}

          {/* Step 3: Add second number to base */}
          {animationStep === 2 && (
            <motion.div
              key="step3"
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full max-w-sm h-2 bg-[#e0c9b1]/30 rounded-full relative">
                <motion.div
                  className="absolute -top-10 text-center"
                  initial={{ left: "0%" }}
                  animate={{ left: `${base / 10}%` }}
                  transition={{ duration: 1.2 }}
                  style={{ transform: "translateX(-100%)" }}
                >
                  <span className="text-xl font-semibold">{base}</span>
                </motion.div>
                <motion.div
                  className="absolute -top-10 text-center text-[#e0c9b1]"
                  initial={{ left: `${base / 10}%`, opacity: 0 }}
                  animate={{ left: `${base / 10 + num2 / 6}%`, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                  style={{ transform: "translateX(-50%)" }}
                >
                  <span className="text-xl font-semibold">+ {num2}</span>
                </motion.div>
                <motion.div
                  className="absolute -top-10 text-center text-[#d4b595]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2.2 }}
                  style={{
                    left: `${base / 10 + num2 / 4}%`,
                    transform: "translateX(30%)",
                  }}
                >
                  <span className="text-xl font-semibold">= {base + num2}</span>
                </motion.div>
              </div>
              <motion.p
                className="mt-20 text-center max-w-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <span className="font-semibold text-[#d4b595]">Step 2:</span>{" "}
                Add the second number to the base.
                <br />
                {base} + {num2} = {base + num2}
              </motion.p>
            </motion.div>
          )}

          {/* Step 4: Subtract the complement */}
          {/* Step 4: Subtract the complement */}
          {animationStep === 3 && (
            <motion.div
              key="step4"
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full max-w-sm h-2 bg-[#e0c9b1]/30 rounded-full relative">
                <motion.div
                  className="absolute -top-10 text-center"
                  initial={{ left: "0%" }}
                  animate={{ left: `${base / 10}%` }}
                  transition={{ duration: 1.2 }}
                  style={{ transform: "translateX(-100%)" }}
                >
                  <span className="text-xl font-semibold text-[#e0c9b1]/60">
                    {base + num2}
                  </span>
                </motion.div>
                <motion.div
                  className="absolute -top-10 text-center text-red-400"
                  initial={{ left: `${base / 10}%`, opacity: 0 }}
                  animate={{ left: `${base / 10 + num2 / 6}%`, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                  style={{ transform: "translateX(-50%)" }}
                >
                  <span className="text-xl font-semibold">- {complement}</span>
                </motion.div>
                <motion.div
                  className="absolute -top-10 text-center text-[#d4b595]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2.2 }}
                  style={{
                    left: `${base / 10 + num2 / 4}%`,
                    transform: "translateX(30%)",
                  }}
                >
                  <span className="text-xl font-semibold">= {result}</span>
                </motion.div>
              </div>
              <motion.p
                className="mt-20 text-center max-w-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <span className="font-semibold text-[#d4b595]">Step 3:</span>{" "}
                Subtract the complement.
                <br />
                {base + num2} - {complement} = {result}
              </motion.p>
            </motion.div>
          )}

          {/* Step 5: Show the final result */}
          {animationStep === 4 && (
            <motion.div
              key="step5"
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="flex items-center space-x-4 text-3xl mb-3"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                <div className="text-[#e0c9b1] font-bricolage font-bold">
                  {num1}
                </div>
                <div className="text-[#e0c9b1]/70">+</div>
                <div className="text-[#e0c9b1] font-bricolage font-bold">
                  {num2}
                </div>
                <div className="text-[#e0c9b1]/70">=</div>
                <motion.div
                  className="text-[#d4b595] font-bricolage font-bold text-4xl"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, delay: 1 }}
                >
                  {result}
                </motion.div>
              </motion.div>

              <motion.div
                className="bg-[#2a2a35]/60 p-3 rounded-lg mt-6 max-w-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <p className="text-[#e0c9b1]/90 text-left">
                  <span className="font-semibold">Summary:</span>
                  <br />
                  1. {num1} is {complement} away from {base}
                  <br />
                  2. {base} + {num2} = {base + num2}
                  <br />
                  3. {base + num2} - {complement} = {result}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VedicAdditionAnimation;
