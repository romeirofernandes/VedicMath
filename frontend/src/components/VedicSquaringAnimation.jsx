import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const VedicSquaringAnimation = ({ num = 98 }) => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Calculate values used in the animation
  const getBase = (n) => {
    // Find the closest power of 10 base
    const digits = n.toString().length;
    return Math.pow(10, digits); // For 98, this would be 100
  };

  const base = getBase(num);
  const difference = num - base;
  const baseSquared = base * base;
  const twiceBaseTimesDiff = 2 * base * difference;
  const diffSquared = difference * difference;
  const result = baseSquared + twiceBaseTimesDiff + diffSquared;

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
            <div className="flex items-center justify-center space-x-4 text-2xl">
              <motion.span variants={highlight} animate="active">
                {num}
              </motion.span>
              <span>×</span>
              <motion.span variants={highlight} animate="active">
                {num}
              </motion.span>
              <span>=</span>
              <span>?</span>
            </div>
            <p className="text-sm text-center text-[#e0c9b1]/70">
              We want to calculate {num}² using Vedic techniques
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
              Step 2: Find Deviation from Base
            </h3>
            <div className="flex items-center justify-center space-x-4 text-xl">
              <span>{num}</span>
              <span>=</span>
              <motion.span variants={highlight} animate="active">
                {base}
              </motion.span>
              <motion.span variants={highlight} animate="active">
                {difference > 0 ? `+ ${difference}` : difference}
              </motion.span>
            </div>
            <p className="text-sm text-center text-[#e0c9b1]/70">
              Express {num} as {base} 
              {difference >= 0 ? " + " : " "}
              {difference}
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
              Step 3: Set Up the Formula
            </h3>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-xl">
                ({base}
                {difference >= 0 ? " + " : " "}
                {difference})²
              </div>
              <div className="text-lg text-[#e0c9b1]/80">=</div>
              <motion.div
                variants={highlight}
                animate="active"
                className="text-xl px-3 py-1 rounded"
              >
                {base}² + 2×{base}×({difference}) + ({difference})²
              </motion.div>
            </div>
            <p className="text-sm text-center text-[#e0c9b1]/70">
              Apply the algebraic formula (a + b)² = a² + 2ab + b²
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
              Step 4: Calculate Each Part
            </h3>
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center space-x-3">
                <motion.span
                  variants={highlight}
                  animate="active"
                  className="px-2 py-1 rounded"
                >
                  {base}²
                </motion.span>
                <span>=</span>
                <span>{baseSquared}</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <motion.span
                  variants={highlight}
                  animate="active"
                  className="px-2 py-1 rounded"
                >
                  2×{base}×({difference})
                </motion.span>
                <span>=</span>
                <span>{twiceBaseTimesDiff}</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <motion.span
                  variants={highlight}
                  animate="active"
                  className="px-2 py-1 rounded"
                >
                  ({difference})²
                </motion.span>
                <span>=</span>
                <span>{diffSquared}</span>
              </div>
            </div>
            <p className="text-sm text-center text-[#e0c9b1]/70">
              Calculate each term separately for easier mental calculation
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
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center justify-center space-x-3 text-lg">
                <span>{baseSquared}</span>
                <span>{twiceBaseTimesDiff >= 0 ? "+" : "-"}</span>
                <span>{Math.abs(twiceBaseTimesDiff)}</span>
                <span>{diffSquared >= 0 ? "+" : "-"}</span>
                <span>{Math.abs(diffSquared)}</span>
              </div>
              <div className="flex items-center justify-center space-x-4 text-xl">
                <span>{num}²</span>
                <span>=</span>
                <motion.span
                  variants={highlight}
                  animate="active"
                  className="font-bold text-[#e0c9b1] px-3 py-1 rounded"
                >
                  {result}
                </motion.span>
              </div>
            </div>
            <p className="text-sm text-center text-[#e0c9b1]/70">
              Therefore, {num}² = {result}
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

export default VedicSquaringAnimation;
