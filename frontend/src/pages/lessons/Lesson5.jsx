import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { completeLesson } from "../../utils/ProgressUtils";
import { useProgress } from "../../context/ProgressContext";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { IconCheck, IconX, IconMenu2 } from "@tabler/icons-react";
import VedicSquaringAnimation from "../../components/VedicSquaringAnimation";
import SidePanel from "../../components/SidePanel";

const Lesson5 = () => {
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
    if (userProgress?.completed_lessons?.includes(5)) {
      setIsLessonCompleted(true);
    }
  }, [userProgress]);

  const toggleSidePanel = () => setIsSidePanelOpen(!isSidePanelOpen);

  // Handle navigation to next lesson (or completion)
  const handleNextLesson = async () => {
    if (isLessonCompleted) {
      navigate("/dashboard");
      return;
    }

    setIsSubmitting(true);
    try {
      const allAnswered = practiceProblems.every((p) => userAnswers[p.id]);
      const allCorrect = practiceProblems.every(
        (p) => userAnswers[p.id]?.isCorrect
      );

      if (allAnswered && allCorrect) {
        const updatedProgress = await completeLesson(5);

        if (updatedProgress) {
          setIsLessonCompleted(true);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
          await refreshProgress();
        }
        // Navigate to dashboard as this is the final lesson
        navigate("/dashboard");
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
      question: "Using the base method, calculate the square of 95",
      options: ["9025", "9075", "8925", "9125"],
      answer: "9025",
      explanation:
        "Using base 100: 95² = (100-5)² = 100² - 2×100×5 + 5² = 10000 - 1000 + 25 = 9025",
    },
    {
      id: 2,
      question: "Apply the Vedic squaring method to calculate: 105²",
      options: ["10925", "11025", "11125", "11225"],
      answer: "11025",
      explanation:
        "Using base 100: 105² = (100+5)² = 100² + 2×100×5 + 5² = 10000 + 1000 + 25 = 11025",
    },
    {
      id: 3,
      question: "Calculate the square of 996 using Vedic mathematics",
      options: ["992016", "991216", "992036", "992000"],
      answer: "992016",
      explanation:
        "Using base 1000: 996² = (1000-4)² = 1000² - 2×1000×4 + 4² = 1000000 - 8000 + 16 = 992016",
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
        Squaring Numbers: Vedic Shortcuts
      </h1>

      <p className="text-[#e0c9b1]/90 text-lg">
        Squaring numbers is a calculation that frequently appears in mathematics
        and science. Vedic mathematics offers remarkable shortcuts for squaring
        that can be performed mentally with astonishing speed, even for large
        numbers.
      </p>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-3">
          Core Principle:
        </h3>
        <p>
          The key to Vedic squaring is to work with reference to bases like 10,
          100, or 1000. By exploiting algebraic patterns, we can transform
          squaring into simpler operations that are much easier to perform
          mentally.
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
        Powerful Squaring Methods
      </h2>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-3 text-[#d4b595]">
          1. Base Method for Squaring
        </h3>
        <p className="mb-4">
          This technique is particularly effective for numbers close to powers
          of 10.
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Identify a convenient base near your number (like 100)</li>
          <li>Find the difference between your number and the base</li>
          <li>
            Apply the formula: (base ± difference)² = base² ± 2×base×difference
            + difference²
          </li>
          <li>This simplifies the calculation dramatically</li>
        </ol>
      </div>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-3 text-[#d4b595]">
          2. Squaring Numbers Ending in 5
        </h3>
        <p className="mb-4">
          For any number ending in 5, there's a remarkably simple pattern.
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Take the number without the final 5</li>
          <li>Multiply this number by the next higher number</li>
          <li>Append "25" to the result</li>
          <li>Example: 85² = 8 × 9 = 72, then append 25 = 7225</li>
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
        Visual Examples: Vedic Squaring
      </h2>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <p className="mb-6 text-[#e0c9b1]/80">
          Watch how the Base Method simplifies squaring large numbers. This
          animation demonstrates how to square 98 using the base method with 100
          as the reference.
        </p>

        <VedicSquaringAnimation num={98} />
      </div>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-4">
          Example: Squaring Numbers Ending in 5
        </h3>

        <p className="mb-4">Let's calculate: 75²</p>

        <div className="flex flex-col items-center space-y-4 text-[#e0c9b1]/90">
          <div className="space-y-3 text-left">
            <p>Step 1:&nbsp; Take the number without the final 5 → 7</p>
            <p>Step 2:&nbsp; Multiply by the next higher number → 7 × 8 = 56</p>
            <p>Step 3:&nbsp; Append "25" to the result → 5625</p>
            <p className="font-semibold mt-2">Therefore, 75² = 5625</p>
          </div>
        </div>
      </div>

      <div className="bg-[#2a2a35]/60 border border-[#ffffff10] rounded-xl p-6">
        <h3 className="font-bricolage font-semibold text-xl mb-4">
          Example: Using Base Method for 104²
        </h3>

        <div className="space-y-3">
          <p>Step 1:&nbsp; Identify base = 100, and difference = 4</p>
          <p>
            Step 2:&nbsp; Apply the formula (100 + 4)² = 100² + 2×100×4 + 4²
          </p>
          <p>Step 3:&nbsp; Calculate 10000 + 800 + 16 = 10816</p>
          <p className="font-semibold">Therefore, 104² = 10816</p>
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
              Use the <strong>Base Method</strong> for numbers close to powers
              of 10
            </span>
          </li>
          <li className="flex">
            <span className="text-[#d4b595] mr-2">•</span>
            <span>
              For numbers ending in 5, use the <strong>special pattern</strong>{" "}
              described above
            </span>
          </li>
          <li className="flex">
            <span className="text-[#d4b595] mr-2">•</span>
            <span>
              These methods transform complex calculations into simple mental
              operations
            </span>
          </li>
          <li className="flex">
            <span className="text-[#d4b595] mr-2">•</span>
            <span>
              With practice, you can square two and three-digit numbers in your
              head
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
        Apply the Vedic squaring techniques to solve these problems:
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
              Congratulations!
            </h3>
            <p className="text-[#e0c9b1]/90">
              You've completed all the Vedic mathematics lessons. You now
              possess powerful mental calculation techniques!
            </p>

            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              {isLessonCompleted ? (
                <div className="px-6 py-2.5 border border-green-500/30 text-green-400 rounded-md font-medium bg-green-500/10">
                  <IconCheck className="inline mr-1" size={18} /> Course
                  Completed
                </div>
              ) : (
                <button
                  onClick={handleNextLesson}
                  className="px-6 py-2.5 bg-[#e0c9b1] text-[#0f0f12] rounded-md font-medium hover:bg-[#d4b595] transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Completing..." : "Complete Course"}
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

export default Lesson5;
