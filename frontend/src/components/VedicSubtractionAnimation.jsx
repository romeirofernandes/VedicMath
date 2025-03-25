import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const VedicSubtractionAnimation = ({ num1 = 1000, num2 = 568 }) => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Calculate values used in the animation
  const base = num1;
  const subtractor = num2;
  const reducedBase = base - 1;
  const complement = reducedBase - subtractor;
  const result = complement + 1;

  // Animation timing control
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      setStep((prevStep) => (prevStep + 1) % 5); // Cycle through 5 steps
    }, 2000); // 2 seconds per step

    return () => clearTimeout(timer);
  }, [step, isPlaying]);

  // Animation variants for elements
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const highlight = {
    initial: { backgroundColor: "rgba(42, 42, 53, 0.4)" },
    active: {
      backgroundColor: "rgba(228, 202, 177, 0.15)",
      transition: { duration: 0.3 },
    },
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h3 className="font-semibold text-lg text-[#d4b595]">
              Step 1: Identify the Problem
            </h3>
            <div className="flex items-center justify-center space-x-8 text-2xl">
              <span>{num1}</span>
              <span>−</span>
              <span>{num2}</span>
              <span>=</span>
              <span>?</span>
            </div>
            <p className="text-sm text-center text-[#e0c9b1]/70">
              We want to calculate {num1} − {num2}
            </p>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h3 className="font-semibold text-lg text-[#d4b595]">
              Step 2: Subtract 1 from Base
            </h3>
            <div className="flex items-center justify-center space-x-8 text-2xl">
              <motion.span variants={highlight} animate="active">
                {num1}
              </motion.span>
              <span>−</span>
              <span>1</span>
              <span>=</span>
              <motion.span variants={highlight} animate="active">
                {reducedBase}
              </motion.span>
            </div>
            <p className="text-sm text-center text-[#e0c9b1]/70">
              Subtracting 1 from {num1} gives us {reducedBase}, which consists
              of all 9s
            </p>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h3 className="font-semibold text-lg text-[#d4b595]">
              Step 3: Subtract from Reduced Base
            </h3>
            <div className="flex items-center justify-center space-x-8 text-2xl">
              <motion.span variants={highlight} animate="active">
                {reducedBase}
              </motion.span>
              <span>−</span>
              <motion.span variants={highlight} animate="active">
                {subtractor}
              </motion.span>
              <span>=</span>
              <motion.span variants={highlight} animate="active">
                {complement}
              </motion.span>
            </div>
            <p className="text-sm text-center text-[#e0c9b1]/70">
              {reducedBase} − {subtractor} = {complement}
            </p>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h3 className="font-semibold text-lg text-[#d4b595]">
              Step 4: Add 1 to Result
            </h3>
            <div className="flex items-center justify-center space-x-8 text-2xl">
              <motion.span variants={highlight} animate="active">
                {complement}
              </motion.span>
              <span>+</span>
              <span>1</span>
              <span>=</span>
              <motion.span variants={highlight} animate="active">
                {result}
              </motion.span>
            </div>
            <p className="text-sm text-center text-[#e0c9b1]/70">
              Adding 1 to our intermediate result: {complement} + 1 = {result}
            </p>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h3 className="font-semibold text-lg text-[#d4b595]">
              Final Result
            </h3>
            <div className="flex items-center justify-center space-x-8 text-2xl">
              <span>{num1}</span>
              <span>−</span>
              <span>{num2}</span>
              <span>=</span>
              <motion.span
                variants={highlight}
                animate="active"
                className="font-bold text-[#e0c9b1]"
              >
                {result}
              </motion.span>
            </div>
            <p className="text-sm text-center text-[#e0c9b1]/70">
              Therefore, {num1} − {num2} = {result}
            </p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-[#1e1e23]/80 rounded-xl p-6 relative">
      <div className="min-h-[200px] flex items-center justify-center">
        {renderStep()}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <button
              key={i}
              onClick={() => {
                setStep(i);
                setIsPlaying(false);
              }}
              className={`w-2 h-2 rounded-full ${
                step === i ? "bg-[#e0c9b1]" : "bg-[#e0c9b1]/30"
              }`}
              aria-label={`Step ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-xs px-3 py-1 rounded border border-[#e0c9b1]/30 hover:border-[#e0c9b1]/60 transition-colors"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default VedicSubtractionAnimation;
