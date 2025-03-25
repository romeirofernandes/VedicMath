import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { completeLesson } from "../../utils/ProgressUtils";
import { useProgress } from "../../context/ProgressContext";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { IconCheck, IconX, IconMenu2 } from "@tabler/icons-react";
import VedicMultiplicationAnimation from "../../components/VedicMultiplicationAnimation";
import SidePanel from "../../components/SidePanel";

const Lesson3 = () => {
  const { userProgress, refreshProgress } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Check if lesson is already completed
  useEffect(() => {
    if (userProgress?.completed_lessons?.includes(3)) {
      setIsLessonCompleted(true);
    }
  }, [userProgress]);

  const toggleSidePanel = () => setIsSidePanelOpen(!isSidePanelOpen);

  // Handle navigation to next lesson
  const handleNextLesson = async () => {
    if (isLessonCompleted) {
      navigate("/lesson/4");
      return;
    }

    setIsSubmitting(true);
    try {
      const allAnswered = practiceProblems.every((p) => userAnswers[p.id]);
      const allCorrect = practiceProblems.every(
        (p) => userAnswers[p.id]?.isCorrect
      );

      if (allAnswered && allCorrect) {
        const updatedProgress = await completeLesson(3);

        if (updatedProgress) {
          setIsLessonCompleted(true);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
          await refreshProgress();
        }
        navigate("/lesson/4");
      } else {
        alert(
          "Please answer all practice questions correctly before continuing."
        );
      }
    } catch (error) {
      console.error("Error completing lesson:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Practice problems data
  const practiceProblems = [
    {
      id: 1,
      question: "Using the Vertically and Crosswise method, calculate: 98 × 97",
      options: ["9506", "9466", "9526", "9406"],
      answer: "9506",
      explanation:
        "Using Vertically and Crosswise: (98 × 97) = (100 - 2)(100 - 3) = 100² - 3×100 - 2×100 + 2×3 = 10000 - 500 + 6 = 9506",
    },
    {
      id: 2,
      question: "Apply Vedic multiplication to calculate: 88 × 86",
      options: ["7568", "7658", "7468", "7558"],
      answer: "7568",
      explanation:
        "Using the base of 100: 88×86 = (100-12)(100-14) = 100² - 12×100 - 14×100 + 12×14 = 10000 - 2600 + 168 = 7568",
    },
    {
      id: 3,
      question: "Calculate using Nikhilam method: 104 × 98",
      options: ["10192", "10292", "10186", "10392"],
      answer: "10192",
      explanation:
        "Using Nikhilam: (100+4)(100-2) = 100² + 4×100 - 2×100 - 4×2 = 10000 + 200 - 8 = 10192",
    },
  ];

  // Animation variants for fading in content
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  // Handle answer checking
  const checkAnswer = (problemId, selectedAnswer) => {
    const problem = practiceProblems.find((p) => p.id === problemId);
    const isCorrect = problem.answer === selectedAnswer;

    const updatedAnswers = {
      ...userAnswers,
      [problemId]: { selected: selectedAnswer, isCorrect },
    };

    setUserAnswers(updatedAnswers);
  };

  // Lesson content steps
  const lessonSteps = [
    // Introduction
    <div key="intro" className="space-y-6">
      <h1 className="font-bricolage font-bold text-3xl md:text-4xl bg-gradient-to-r from-[#e0c9b1] to-[#d4b595] bg-clip-text text-transparent">
        Multiplication Magic: Vedic Techniques
      </h1>

      <p className="text-[#e0c9b1]/90 text-lg">
        Vedic mathematics offers extraordinary methods for multiplication that
        dramatically reduce calculation time. These ancient techniques transform
        complex multiplications into simple, elegant operations that can be
        performed mentally.
      </p>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-3">
          Core Principle:
        </h3>
        <p>
          The key insight of Vedic multiplication is working with bases and
          complements. Rather than directly multiplying arbitrary numbers, we
          transform the problem to leverage patterns and relationships between
          numbers.
        </p>
      </div>

      <button
        onClick={() => setCurrentStep(1)}
        className="px-6 py-2.5 bg-[#e0c9b1] text-[#0f0f12] rounded-md font-medium hover:bg-[#d4b595] transition-colors"
      >
        Continue to Methods
      </button>
    </div>,

    // Methods
    <div key="method" className="space-y-6">
      <h2 className="font-bricolage font-bold text-2xl md:text-3xl text-[#e0c9b1]">
        Powerful Multiplication Methods
      </h2>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-3 text-[#d4b595]">
          1. Nikhilam Method (Base Method)
        </h3>
        <p className="mb-4">
          This technique is particularly useful when multiplying numbers close
          to a base like 10, 100, 1000.
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Identify a convenient base near both numbers (example: 100)</li>
          <li>Find deviations of both numbers from this base</li>
          <li>
            Cross-multiply: (First number ± First deviation) × (Second number ±
            Second deviation)
          </li>
          <li>The result simplifies beautifully</li>
        </ol>
      </div>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-3 text-[#d4b595]">
          2. Vertically and Crosswise Method (Urdhva Tiryagbhyam)
        </h3>
        <p className="mb-4">
          This versatile method works for all multiplications and is
          particularly elegant.
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Break numbers into digits or groups of digits</li>
          <li>Multiply vertically (corresponding digits)</li>
          <li>Multiply crosswise and add these products</li>
          <li>Organize results by place value</li>
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
          See Examples
        </button>
      </div>
    </div>,

    // Examples
    <div key="example" className="space-y-8">
      <h2 className="font-bricolage font-bold text-2xl md:text-3xl text-[#e0c9b1]">
        Visual Examples: Vedic Multiplication
      </h2>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <p className="mb-6 text-[#e0c9b1]/80">
          Watch how the Nikhilam method simplifies multiplication. This
          animation demonstrates how to multiply 98 × 95 using the base method
          with 100 as the base.
        </p>

        <VedicMultiplicationAnimation num1={98} num2={95} />
      </div>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-4">
          Example: Vertically and Crosswise
        </h3>

        <p className="mb-4">Let's calculate: 12 × 34</p>

        <div className="flex flex-col items-center space-y-4 text-[#e0c9b1]/90">
          <div className="grid grid-cols-2 gap-8">
            <div className="text-right">
              <p>1</p>
              <p>2</p>
              <div className="border-t border-[#e0c9b1]/30 mt-1"></div>
            </div>
            <div>
              <p>3</p>
              <p>4</p>
              <div className="border-t border-[#e0c9b1]/30 mt-1"></div>
            </div>
          </div>

          <div className="space-y-2 text-left">
            <p>Step 1: &nbsp; &nbsp;2 × 4 = 8 (units place)</p>
            <p>
              Step 2: &nbsp; &nbsp;(1 × 4) + (2 × 3) = 4 + 6 = 10 (carry the 1)
            </p>
            <p>Step 3: &nbsp; &nbsp;1 × 3 + 1 (carried) = 4 (hundreds place)</p>
            <p className="font-semibold mt-2">Result: 408</p>
          </div>
        </div>
      </div>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-4">
          Key Takeaways
        </h3>

        <ul className="space-y-3 text-[#e0c9b1]/90">
          <li className="flex">
            <span className="text-[#d4b595] mr-2">•</span>
            <span>
              Use the <strong>Nikhilam method</strong> when numbers are close to
              a convenient base
            </span>
          </li>
          <li className="flex">
            <span className="text-[#d4b595] mr-2">•</span>
            <span>
              The <strong>Vertically and Crosswise</strong> method works for all
              multiplications
            </span>
          </li>
          <li className="flex">
            <span className="text-[#d4b595] mr-2">•</span>
            <span>
              These methods reduce complex calculations to simpler patterns
            </span>
          </li>
          <li className="flex">
            <span className="text-[#d4b595] mr-2">•</span>
            <span>
              With practice, mental multiplication becomes dramatically faster
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

    // Practice Problems
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
        Apply the Vedic multiplication techniques to solve these problems:
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

      {Object.keys(userAnswers).length === practiceProblems.length &&
        practiceProblems.every((p) => userAnswers[p.id]?.isCorrect) && (
          <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6 text-center">
            <h3 className="font-bricolage font-bold text-2xl text-green-400 mb-2">
              Excellent job!
            </h3>
            <p className="text-[#e0c9b1]/90">
              You've mastered the Vedic multiplication techniques.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              {isLessonCompleted ? (
                <div className="px-6 py-2.5 border border-green-500/30 text-green-400 rounded-md font-medium bg-green-500/10">
                  <IconCheck className="inline mr-1" size={18} /> Completed
                </div>
              ) : (
                <button
                  onClick={handleNextLesson}
                  className="px-6 py-2.5 bg-[#e0c9b1] text-[#0f0f12] rounded-md font-medium hover:bg-[#d4b595] transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Completing..." : "Continue to Next Lesson"}
                </button>
              )}
            </div>
          </div>
        )}
    </motion.div>,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f12] to-[#1a1a21] text-[#e0c9b1] font-inter">
      {showConfetti && <Confetti />}
      <SidePanel isOpen={isSidePanelOpen} togglePanel={toggleSidePanel} />

      <button
        onClick={toggleSidePanel}
        className="fixed top-6 left-6 z-20 p-2 rounded-md bg-[#2a2a35]/60 hover:bg-[#2a2a35] text-[#e0c9b1]"
        aria-label="Toggle navigation"
      >
        <IconMenu2 size={24} />
      </button>

      <div
        className={`transition-all duration-300 ${
          isSidePanelOpen ? "ml-64" : "ml-0"
        }`}
      >
        <div className="container mx-auto px-6 py-12 max-w-4xl">
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
    </div>
  );
};

export default Lesson3;
