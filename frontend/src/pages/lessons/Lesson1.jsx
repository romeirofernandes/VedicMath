import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { IconArrowLeft, IconCheck, IconX } from "@tabler/icons-react";
import VedicAdditionAnimation from "../../components/VedicAdditionAnimation";

const Lesson1 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);

  const practiceProblems = [
    {
      id: 1,
      question: "Using complementary numbers, calculate: 97 + 64",
      options: ["151", "161", "171", "181"],
      answer: "161",
      explanation:
        "97 is 3 away from 100, so: (100 - 3) + 64 = 100 + 64 - 3 = 164 - 3 = 161",
    },
    {
      id: 2,
      question: "Apply the Vedic addition technique: 78 + 83",
      options: ["161", "151", "171", "141"],
      answer: "161",
      explanation:
        "78 is 22 away from 100, so: (100 - 22) + 83 = 100 + 83 - 22 = 183 - 22 = 161",
    },
    {
      id: 3,
      question: "Calculate using Vedic method: 996 + 427",
      options: ["1423", "1413", "1433", "1443"],
      answer: "1423",
      explanation:
        "996 is 4 away from 1000, so: (1000 - 4) + 427 = 1000 + 427 - 4 = 1427 - 4 = 1423",
    },
  ];

  // Simplified fade variant - only one we'll use
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const checkAnswer = (problemId, selectedAnswer) => {
    const problem = practiceProblems.find((p) => p.id === problemId);
    const isCorrect = problem.answer === selectedAnswer;

    setUserAnswers({
      ...userAnswers,
      [problemId]: {
        selected: selectedAnswer,
        isCorrect,
      },
    });

    // Check if all answers are correct after this submission
    const updatedAnswers = {
      ...userAnswers,
      [problemId]: { selected: selectedAnswer, isCorrect },
    };

    const allAnswered = practiceProblems.every(
      (p) => updatedAnswers[p.id]?.selected
    );
    const allCorrect = practiceProblems.every(
      (p) => updatedAnswers[p.id]?.isCorrect
    );

    if (allAnswered && allCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  // Lesson content steps - removed most animations
  const lessonSteps = [
    // Introduction
    <div key="intro" className="space-y-6">
      <h1 className="font-bricolage font-bold text-3xl md:text-4xl bg-gradient-to-r from-[#e0c9b1] to-[#d4b595] bg-clip-text text-transparent">
        Vedic Addition: The Complementary Number Method
      </h1>

      <p className="text-[#e0c9b1]/90 text-lg">
        The ancient Vedic mathematicians developed powerful mental calculation
        techniques that work with the natural way our mind processes numbers. In
        this lesson, we'll learn the complementary number method for
        lightning-fast addition.
      </p>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-3">
          Core Principle:
        </h3>
        <p>
          When adding numbers, we find it easier to add to round numbers like
          10, 100, or 1000. The complementary number method uses this principle
          to simplify calculations.
        </p>
      </div>

      <button
        onClick={() => setCurrentStep(1)}
        className="px-6 py-2.5 bg-[#e0c9b1] text-[#0f0f12] rounded-md font-medium hover:bg-[#d4b595] transition-colors"
      >
        Continue to Method
      </button>
    </div>,

    // Method Explanation
    <div key="method" className="space-y-6">
      <h2 className="font-bricolage font-bold text-2xl md:text-3xl text-[#e0c9b1]">
        The Method
      </h2>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <ol className="list-decimal pl-5 space-y-4">
          <li>
            <span className="font-semibold">Identify the base number</span>:
            Choose a convenient round number (like 10, 100, or 1000) that is
            close to one of your numbers.
          </li>
          <li>
            <span className="font-semibold">Calculate the complement</span>:
            Find how far the first number is from your base.
          </li>
          <li>
            <span className="font-semibold">Perform the calculation</span>: Add
            the second number to the base, then subtract the complement.
          </li>
        </ol>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setCurrentStep(0)}
          className="px-6 py-2.5 border border-[#e0c9b1]/30 text-[#e0c9b1] rounded-md font-medium hover:border-[#e0c9b1] transition-all"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentStep(2)}
          className="px-6 py-2.5 bg-[#e0c9b1] text-[#0f0f12] rounded-md font-medium hover:bg-[#d4b595] transition-colors"
        >
          See Example
        </button>
      </div>
    </div>,

    <div key="example" className="space-y-8">
      <h2 className="font-bricolage font-bold text-2xl md:text-3xl text-[#e0c9b1]">
        Visual Example: Vedic Addition
      </h2>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <p className="mb-6 text-[#e0c9b1]/80">
          Watch how the Vedic complementary method simplifies addition through
          these animated steps. The animation loops automatically, showing each
          step of the process.
        </p>

        <VedicAdditionAnimation num1={86} num2={57} />
      </div>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-4">
          Key Takeaways
        </h3>

        <ul className="space-y-3 text-[#e0c9b1]/90">
          <li className="flex">
            <span className="text-[#d4b595] mr-2">•</span>
            <span>
              Choose a <strong>convenient base</strong> (usually a power of 10)
              close to one of your numbers.
            </span>
          </li>
          <li className="flex">
            <span className="text-[#d4b595] mr-2">•</span>
            <span>
              Find how far your first number is from this base (the{" "}
              <strong>complement</strong>).
            </span>
          </li>
          <li className="flex">
            <span className="text-[#d4b595] mr-2">•</span>
            <span>
              Add your second number to the base, then subtract the complement.
            </span>
          </li>
          <li className="flex">
            <span className="text-[#d4b595] mr-2">•</span>
            <span>
              With practice, you'll perform these calculations mentally with
              great speed.
            </span>
          </li>
        </ul>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setCurrentStep(1)}
          className="px-6 py-2.5 border border-[#e0c9b1]/30 text-[#e0c9b1] rounded-md font-medium hover:border-[#e0c9b1] transition-all"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          className="px-6 py-2.5 bg-[#e0c9b1] text-[#0f0f12] rounded-md font-medium hover:bg-[#d4b595] transition-colors"
        >
          Practice
        </button>
      </div>
    </div>,

    // Practice Problems - minimal animations
    <motion.div
      key="practice"
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h2 className="font-bricolage font-bold text-2xl md:text-3xl text-[#e0c9b1]">
        Practice Problems
      </h2>

      <p className="text-[#e0c9b1]/80">
        Try these problems using the Vedic complementary number method:
      </p>

      <div className="space-y-8">
        {practiceProblems.map((problem) => (
          <div
            key={problem.id}
            className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6"
          >
            <h3 className="font-bricolage font-semibold text-xl mb-3">
              Problem {problem.id}: {problem.question}
            </h3>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {problem.options.map((option) => (
                <button
                  key={option}
                  onClick={() => checkAnswer(problem.id, option)}
                  disabled={userAnswers[problem.id]}
                  className={`px-4 py-2.5 rounded-md font-medium transition-all ${
                    userAnswers[problem.id]?.selected === option
                      ? userAnswers[problem.id]?.isCorrect
                        ? "bg-green-500/20 border-green-500/40 border text-green-300"
                        : "bg-red-500/20 border-red-500/40 border text-red-300"
                      : "bg-[#1e1e23]/40 hover:bg-[#2a2a35] border border-[#ffffff10]"
                  }`}
                >
                  {option}
                  {userAnswers[problem.id]?.selected === option &&
                    (userAnswers[problem.id]?.isCorrect ? (
                      <IconCheck className="inline ml-2" size={18} />
                    ) : (
                      <IconX className="inline ml-2" size={18} />
                    ))}
                </button>
              ))}
            </div>

            {userAnswers[problem.id] && (
              <div className="mt-4 p-3 bg-[#1e1e23]/60 rounded-lg">
                <p>
                  <span
                    className={
                      userAnswers[problem.id].isCorrect
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {userAnswers[problem.id].isCorrect
                      ? "Correct! "
                      : "Not quite. "}
                  </span>
                  {problem.explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Check if all answers are correct */}
      {Object.keys(userAnswers).length === practiceProblems.length &&
        practiceProblems.every((p) => userAnswers[p.id]?.isCorrect) && (
          <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6 text-center">
            <h3 className="font-bricolage font-bold text-2xl text-green-400 mb-2">
              Excellent job!
            </h3>
            <p className="text-[#e0c9b1]/90">
              You've mastered the Vedic complementary number technique for
              addition.
            </p>
            <Link
              to="/dashboard"
              className="mt-4 inline-block px-6 py-2.5 bg-[#e0c9b1] text-[#0f0f12] rounded-md font-medium hover:bg-[#d4b595] transition-colors"
            >
              Return to Dashboard
            </Link>
          </div>
        )}

      <div className="flex space-x-4">
        <button
          onClick={() => setCurrentStep(2)}
          className="px-6 py-2.5 border border-[#e0c9b1]/30 text-[#e0c9b1] rounded-md font-medium hover:border-[#e0c9b1] transition-all"
        >
          Back to Example
        </button>
      </div>

      {showConfetti && <Confetti colors={["#e0c9b1", "#d4b595", "#ffffff"]} />}
    </motion.div>,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f12] to-[#1a1a21] text-[#e0c9b1] font-inter">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-[#e0c9b1]/80 hover:text-[#e0c9b1] mb-8"
        >
          <IconArrowLeft size={18} className="mr-1" />
          Back to Dashboard
        </Link>

        {lessonSteps[currentStep]}

        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            {lessonSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentStep === index ? "bg-[#e0c9b1]" : "bg-[#e0c9b1]/30"
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson1;
