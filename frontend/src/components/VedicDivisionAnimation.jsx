import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const VedicDivisionAnimation = ({ dividend = 5824, divisor = 8 }) => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Calculate values for the flag division animation
  const digits = dividend.toString().split("").map(Number);
  const steps = [];
  let remainder = 0;
  let quotient = "";

  // Pre-calculate all steps for the division
  for (let i = 0; i < digits.length; i++) {
    const current = remainder * 10 + digits[i];
    const q = Math.floor(current / divisor);
    remainder = current % divisor;
    quotient += q;

    steps.push({
      digitPosition: i,
      currentValue: current,
      quotientDigit: q,
      remainder: remainder,
      currentQuotient: quotient.slice(0, i + 1),
    });
  }

  // Animation timing control
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      setStep((prevStep) => {
        const nextStep = prevStep + 1;
        return nextStep >= steps.length + 1 ? 0 : nextStep;
      });
    }, 2000); // 2 seconds per step

    return () => clearTimeout(timer);
  }, [step, isPlaying, steps.length]);

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
    // Introduction step
    if (step === 0) {
      return (
        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h3 className="font-semibold text-lg text-[#d4b595]">
            The Flag Division Problem
          </h3>
          <div className="flex items-center justify-center space-x-8 text-2xl">
            <span>{dividend}</span>
            <span>÷</span>
            <span>{divisor}</span>
            <span>=</span>
            <span>?</span>
          </div>
          <p className="text-sm text-center text-[#e0c9b1]/70">
            We'll divide {dividend} by {divisor} using the flag division method
          </p>
        </motion.div>
      );
    }

    // Final step - show result
    if (step === steps.length + 1) {
      return (
        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h3 className="font-semibold text-lg text-[#d4b595]">Final Result</h3>
          <div className="flex items-center justify-center space-x-8 text-2xl">
            <span>{dividend}</span>
            <span>÷</span>
            <span>{divisor}</span>
            <span>=</span>
            <motion.span
              variants={highlight}
              animate="active"
              className="font-bold text-[#e0c9b1]"
            >
              {quotient}
            </motion.span>
          </div>
          <p className="text-sm text-center text-[#e0c9b1]/70">
            The final quotient is {quotient}
          </p>
        </motion.div>
      );
    }

    // Process steps
    const currentStep = steps[step - 1];
    const dividendStr = dividend.toString();

    return (
      <motion.div
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h3 className="font-semibold text-lg text-[#d4b595]">
          Step {step}: Processing digit {currentStep.digitPosition + 1}
        </h3>

        <div className="space-y-4">
          {/* Highlight current digit being processed */}
          <div className="flex items-center justify-center space-x-2 text-xl">
            <div className="flex">
              {dividendStr.split("").map((digit, idx) => (
                <motion.span
                  key={idx}
                  variants={highlight}
                  animate={
                    idx === currentStep.digitPosition ? "active" : "initial"
                  }
                  className="w-8 text-center"
                >
                  {digit}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Current calculation */}
          <div className="bg-[#1e1e23]/60 p-4 rounded">
            <p className="mb-2">
              {currentStep.digitPosition === 0 ? (
                <>
                  Take digit {dividendStr[0]} and divide by {divisor}
                </>
              ) : (
                <>
                  Remainder from previous step:{" "}
                  {steps[currentStep.digitPosition - 1].remainder}
                  <br />
                  Bring down digit {dividendStr[currentStep.digitPosition]}
                  <br />
                  New value to divide: {currentStep.currentValue}
                </>
              )}
            </p>

            <p className="text-lg">
              {currentStep.currentValue} ÷ {divisor} ={" "}
              {currentStep.quotientDigit}
              &nbsp;&nbsp;with remainder {currentStep.remainder}
            </p>
          </div>

          {/* Current quotient */}
          <div className="text-center">
            <p className="mb-1">Quotient so far:</p>
            <div className="flex justify-center">
              {currentStep.currentQuotient.split("").map((digit, idx) => (
                <motion.span
                  key={idx}
                  variants={highlight}
                  animate={
                    idx === currentStep.digitPosition ? "active" : "initial"
                  }
                  className="w-8 text-center text-xl"
                >
                  {digit}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-[#1e1e23]/80 rounded-xl p-6 relative">
      <div className="min-h-[240px] flex items-center justify-center">
        {renderStep()}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-2">
          {Array.from({ length: steps.length + 2 }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                setStep(i);
                setIsPlaying(false);
              }}
              className={`w-2 h-2 rounded-full ${
                step === i ? "bg-[#e0c9b1]" : "bg-[#e0c9b1]/30"
              }`}
              aria-label={`Step ${i}`}
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

export default VedicDivisionAnimation;
