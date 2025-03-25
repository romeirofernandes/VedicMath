import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { completeLesson } from "../../utils/ProgressUtils";
import { useProgress } from "../../context/ProgressContext";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { IconCheck, IconX, IconMenu2 } from "@tabler/icons-react";
import VedicSubtractionAnimation from "../../components/VedicSubtractionAnimation";
import SidePanel from "../../components/SidePanel";

const Lesson2 = () => {
  const { userProgress, refreshProgress } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Check if lesson is already completed when component mounts
  useEffect(() => {
    if (userProgress?.completed_lessons?.includes(2)) {
      setIsLessonCompleted(true);
    }
  }, [userProgress]);

  const toggleSidePanel = () => setIsSidePanelOpen(!isSidePanelOpen);

  // Handle navigation to next lesson
  const handleNextLesson = async () => {
    if (isLessonCompleted) {
      navigate("/lesson/3");
      return;
    }

    setIsSubmitting(true);
    try {
      const allAnswered = practiceProblems.every((p) => userAnswers[p.id]);
      const allCorrect = practiceProblems.every(
        (p) => userAnswers[p.id]?.isCorrect
      );

      if (allAnswered && allCorrect) {
        const updatedProgress = await completeLesson(2);

        if (updatedProgress) {
          setIsLessonCompleted(true);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
          await refreshProgress();
        }
        navigate("/lesson/3");
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
      question: "Using the Vedic subtraction method, calculate: 1000 - 387",
      options: ["613", "603", "713", "723"],
      answer: "613",
      explanation:
        "Using the nikhilam method: 1000 - 387 = 999 - 387 + 1 = (999-387) + 1 = 612 + 1 = 613",
    },
    {
      id: 2,
      question: "Apply the vinculum method to calculate: 802 - 356",
      options: ["446", "456", "546", "556"],
      answer: "446",
      explanation: "802 - 356 = 800 - 356 + 2 = (800-356) + 2 = 444 + 2 = 446",
    },
    {
      id: 3,
      question: "Using Vedic subtraction, calculate: 2001 - 765",
      options: ["1236", "1246", "1336", "1346"],
      answer: "1236",
      explanation:
        "2001 - 765 = 2000 - 765 + 1 = (2000-765) + 1 = 1235 + 1 = 1236",
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

  // Lesson content steps
  const lessonSteps = [
    // Introduction
    <div key="intro" className="space-y-6">
      <h1 className="font-bricolage font-bold text-3xl md:text-4xl bg-gradient-to-r from-[#e0c9b1] to-[#d4b595] bg-clip-text text-transparent">
        Vedic Subtraction: Simple and Elegant
      </h1>

      <p className="text-[#e0c9b1]/90 text-lg">
        Vedic mathematics provides elegant methods for mental subtraction that
        can dramatically speed up your calculations. In this lesson, we'll
        explore techniques that convert complex subtractions into simple
        operations.
      </p>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-3">
          Core Principle:
        </h3>
        <p>
          Rather than working with arbitrary numbers, we'll transform the
          problem to work with convenient base numbers (like powers of 10). This
          makes mental calculation much faster and more intuitive.
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
        Two Powerful Methods
      </h2>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-3 text-[#d4b595]">
          1. The Nikhilam Method (All from 9, last from 10)
        </h3>
        <p className="mb-4">
          This method is excellent for subtracting from powers of 10 (like 100,
          1000, etc.)
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Start with a power of 10 (like 1000)</li>
          <li>Subtract 1 from it (giving 999)</li>
          <li>Subtract your number from this reduced base</li>
          <li>Add 1 to the result</li>
        </ol>
      </div>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-3 text-[#d4b595]">
          2. The Vinculum Method
        </h3>
        <p className="mb-4">
          This method works well for any subtraction problem by using a nearby
          convenient base.
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            Find a convenient base near your minuend (the number being
            subtracted from)
          </li>
          <li>Subtract from this base instead</li>
          <li>
            Adjust your answer by the difference between your original number
            and the base
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
          See Examples
        </button>
      </div>
    </div>,

    // Examples
    <div key="example" className="space-y-8">
      <h2 className="font-bricolage font-bold text-2xl md:text-3xl text-[#e0c9b1]">
        Visual Examples: Vedic Subtraction
      </h2>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <p className="mb-6 text-[#e0c9b1]/80">
          Watch how Vedic subtraction methods simplify calculations. The
          animation demonstrates how to subtract 568 from 1000 using the
          Nikhilam method.
        </p>

        <VedicSubtractionAnimation num1={1000} num2={568} />
      </div>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-4">
          Example: Vinculum Method
        </h3>

        <p className="mb-4">Let's calculate: 723 - 458</p>

        <ol className="list-decimal pl-5 space-y-2 text-[#e0c9b1]/90">
          <li>Identify a convenient base near 723. Let's use 700.</li>
          <li>Calculate the difference: 723 - 700 = 23</li>
          <li>Perform the subtraction with the base: 700 - 458 = 242</li>
          <li>Add back the difference: 242 + 23 = 265</li>
          <li>The answer is 265</li>
        </ol>
      </div>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-4">
          Key Takeaways
        </h3>

        <ul className="space-y-3 text-[#e0c9b1]/90">
          <li className="flex">
            <span className="text-[#d4b595] mr-2">•</span>
            <span>
              For powers of 10, the <strong>Nikhilam method</strong> is
              extremely efficient
            </span>
          </li>
          <li className="flex">
            <span className="text-[#d4b595] mr-2">•</span>
            <span>
              For other numbers, use the <strong>Vinculum method</strong> with a
              convenient base
            </span>
          </li>
          <li className="flex">
            <span className="text-[#d4b595] mr-2">•</span>
            <span>
              These methods reduce mental strain by working with easier numbers
            </span>
          </li>
          <li className="flex">
            <span className="text-[#d4b595] mr-2">•</span>
            <span>
              With practice, these calculations can be performed almost
              instantly
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
        Apply the Vedic subtraction techniques to solve these problems:
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
              You've mastered the Vedic subtraction techniques.
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

export default Lesson2;
