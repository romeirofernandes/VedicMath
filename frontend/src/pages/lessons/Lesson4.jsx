import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { completeLesson } from "../../utils/ProgressUtils";
import { useProgress } from "../../context/ProgressContext";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { IconCheck, IconX, IconMenu2 } from "@tabler/icons-react";
import VedicDivisionAnimation from "../../components/VedicDivisionAnimation";
import SidePanel from "../../components/SidePanel";

const Lesson4 = () => {
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
    if (userProgress?.completed_lessons?.includes(4)) {
      setIsLessonCompleted(true);
    }
  }, [userProgress]);

  const toggleSidePanel = () => setIsSidePanelOpen(!isSidePanelOpen);

  // Handle navigation to next lesson
  const handleNextLesson = async () => {
    if (isLessonCompleted) {
      navigate("/lesson/5");
      return;
    }

    setIsSubmitting(true);
    try {
      const allAnswered = practiceProblems.every((p) => userAnswers[p.id]);
      const allCorrect = practiceProblems.every(
        (p) => userAnswers[p.id]?.isCorrect
      );

      if (allAnswered && allCorrect) {
        const updatedProgress = await completeLesson(4);

        if (updatedProgress) {
          setIsLessonCompleted(true);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
          await refreshProgress();
        }
        navigate("/lesson/5");
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
      question: "Using the flag division method, calculate: 4256 ÷ 8",
      options: ["532", "542", "552", "562"],
      answer: "532",
      explanation:
        "Using flag division: 4/8 = 0 remainder 4, 42/8 = 5 remainder 2, 25/8 = 3 remainder 1, 16/8 = 2 remainder 0. Result: 532",
    },
    {
      id: 2,
      question: "Apply the Nikhilam division technique to calculate: 8245 ÷ 5",
      options: ["1649", "1650", "1659", "1669"],
      answer: "1649",
      explanation:
        "Using the Nikhilam method: 8/5 = 1 remainder 3, 32/5 = 6 remainder 2, 24/5 = 4 remainder 4, 45/5 = 9 remainder 0. Result: 1649",
    },
    {
      id: 3,
      question: "Calculate using Vedic division: 3724 ÷ 4",
      options: ["921", "931", "941", "951"],
      answer: "931",
      explanation:
        "3/4 = 0 remainder 3, 37/4 = 9 remainder 1, 12/4 = 3 remainder 0, 4/4 = 1 remainder 0. Result: 931",
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
        Division Decoded: Vedic Techniques
      </h1>

      <p className="text-[#e0c9b1]/90 text-lg">
        Division is often considered the most challenging of the four basic
        operations. However, Vedic mathematics offers elegant approaches that
        transform long division into a series of simple steps that can be
        performed mentally.
      </p>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-3">
          Core Principle:
        </h3>
        <p>
          Vedic division techniques streamline the process by eliminating
          guesswork and unnecessary calculations. Just as with other Vedic
          methods, we'll work with patterns and relationships to make division
          intuitive and efficient.
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
        Efficient Division Methods
      </h2>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-3 text-[#d4b595]">
          1. Flag Division (Dhvajanka)
        </h3>
        <p className="mb-4">
          This method streamlines division by processing the dividend one digit
          at a time.
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Begin with the leftmost digit of the dividend</li>
          <li>Divide this digit by the divisor</li>
          <li>Write down the quotient and note the remainder</li>
          <li>Bring down the next digit, combine with the remainder</li>
          <li>Repeat until all digits are processed</li>
        </ol>
      </div>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-3 text-[#d4b595]">
          2. Nikhilam Division
        </h3>
        <p className="mb-4">
          This technique excels when dividing by numbers close to powers of 10.
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Express the divisor as a deviation from a convenient base</li>
          <li>Convert the division problem using this relationship</li>
          <li>Apply a recurrence formula to find each digit of the quotient</li>
          <li>This often eliminates complex mental calculations</li>
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
        Visual Examples: Vedic Division
      </h2>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <p className="mb-6 text-[#e0c9b1]/80">
          Watch how the Flag Division method simplifies calculations. This
          animation demonstrates how to divide 5824 by 8 using the Vedic
          approach.
        </p>

        <VedicDivisionAnimation dividend={5824} divisor={8} />
      </div>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-4">
          Example: Division by 9
        </h3>

        <p className="mb-4">Calculate: 7452 ÷ 9</p>

        <div className="flex flex-col items-center space-y-4 text-[#e0c9b1]/90">
          <div className="space-y-2">
            <p>Step 1: 7 ÷ 9 = 0 remainder 7</p>
            <p>Step 2: 74 ÷ 9 = 8 remainder 2</p>
            <p>Step 3: 25 ÷ 9 = 2 remainder 7</p>
            <p>Step 4: 72 ÷ 9 = 8 remainder 0</p>
            <p className="font-semibold mt-2">Result: 7452 ÷ 9 = 828</p>
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
              <strong>Flag Division</strong> works by processing one digit at a
              time with minimal mental load
            </span>
          </li>
          <li className="flex">
            <span className="text-[#d4b595] mr-2">•</span>
            <span>
              <strong>Nikhilam Division</strong> is powerful for divisors close
              to powers of 10
            </span>
          </li>
          <li className="flex">
            <span className="text-[#d4b595] mr-2">•</span>
            <span>
              By tracking remainders effectively, we avoid redoing work
            </span>
          </li>
          <li className="flex">
            <span className="text-[#d4b595] mr-2">•</span>
            <span>
              With practice, these techniques let you divide large numbers
              mentally
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
        Apply the Vedic division techniques to solve these problems:
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
              You've mastered the Vedic division techniques.
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

export default Lesson4;
