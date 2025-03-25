import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { IconArrowRight, IconLoader2, IconTrophy } from "@tabler/icons-react";

const Game = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [gameState, setGameState] = useState("start"); // start, playing, completed
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showWrongAnswer, setShowWrongAnswer] = useState(false);
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  const totalQuestions = 5;

  const generateQuestions = () => {
    const questionTypes = [
      generateAddition,
      generateSubtraction,
      generateMultiplication,
      generateSquaring,
      generateNearBase,
    ];

    const newQuestions = [];
    const usedQuestionHashes = new Set();

    while (newQuestions.length < totalQuestions) {
      // Randomly select a question type
      const randomType =
        questionTypes[Math.floor(Math.random() * questionTypes.length)];
      const question = randomType();

      // Create a hash of the question to check for duplicates
      const questionHash = `${question.question}-${question.answer}`;

      // Only add if this exact question hasn't been used before
      if (!usedQuestionHashes.has(questionHash)) {
        usedQuestionHashes.add(questionHash);
        newQuestions.push(question);
      }
    }

    return newQuestions;
  };

  // Different question generators
  const generateAddition = () => {
    // Generate numbers that work well with Vedic addition techniques
    const num1 = Math.floor(Math.random() * 900) + 100; // 3-digit number
    const num2 = Math.floor(Math.random() * 900) + 100; // 3-digit number

    return {
      question: `${num1} + ${num2}`,
      answer: (num1 + num2).toString(),
      type: "addition",
    };
  };

  const generateSubtraction = () => {
    // Generate numbers that work well with Vedic subtraction techniques
    const num2 = Math.floor(Math.random() * 900) + 100; // 3-digit number
    const num1 = num2 + Math.floor(Math.random() * 900) + 100; // Ensure num1 > num2

    return {
      question: `${num1} - ${num2}`,
      answer: (num1 - num2).toString(),
      type: "subtraction",
    };
  };

  const generateMultiplication = () => {
    const strategies = [
      // Generate numbers close to 100 (like 98, 102, etc.)
      () => {
        const base = 100;
        const num1 = base - Math.floor(Math.random() * 15) - 1; // 85-99
        const num2 = base - Math.floor(Math.random() * 15) - 1; // 85-99
        return { num1, num2 };
      },
      // Generate numbers ending in 5
      () => {
        const num1 = Math.floor(Math.random() * 20) * 10 + 5; // 5, 15, 25, ...
        const num2 = Math.floor(Math.random() * 20) * 10 + 5; // 5, 15, 25, ...
        return { num1, num2 };
      },
      // Generate numbers that work well with cross multiplication
      () => {
        const num1 = Math.floor(Math.random() * 90) + 10; // 2-digit number
        const num2 = Math.floor(Math.random() * 90) + 10; // 2-digit number
        return { num1, num2 };
      },
    ];

    const strategy =
      strategies[Math.floor(Math.random() * strategies.length)]();
    const { num1, num2 } = strategy;

    return {
      question: `${num1} × ${num2}`,
      answer: (num1 * num2).toString(),
      type: "multiplication",
    };
  };

  const generateSquaring = () => {
    // Generate numbers for squaring exercises
    // Examples: numbers ending in 5, numbers close to powers of 10

    const strategies = [
      // Numbers ending in 5
      () => {
        const num = Math.floor(Math.random() * 20) * 10 + 5; // 5, 15, 25, ...
        return num;
      },
      // Numbers close to 100
      () => {
        const base = 100;
        const num = base - Math.floor(Math.random() * 15) - 1; // 85-99
        return num;
      },
      // Two-digit numbers for general squaring
      () => {
        return Math.floor(Math.random() * 90) + 10; // 10-99
      },
    ];

    const strategy =
      strategies[Math.floor(Math.random() * strategies.length)]();
    const num = strategy;

    return {
      question: `${num}²`,
      answer: (num * num).toString(),
      type: "squaring",
    };
  };

  const generateNearBase = () => {
    // Generate questions for numbers near a base (like 100, 1000)
    // Example: 998 × 997 (both near 1000)

    const bases = [10, 100, 1000];
    const base = bases[Math.floor(Math.random() * bases.length)];

    // Generate numbers near the base (within 15%)
    const maxDeviation = Math.floor(base * 0.15);
    const deviation1 =
      Math.floor(Math.random() * maxDeviation) * (Math.random() > 0.5 ? 1 : -1);
    const deviation2 =
      Math.floor(Math.random() * maxDeviation) * (Math.random() > 0.5 ? 1 : -1);

    const num1 = base + deviation1;
    const num2 = base + deviation2;

    // Avoid too simple calculations
    if (num1 === base || num2 === base) {
      return generateMultiplication();
    }

    return {
      question: `${num1} × ${num2}`,
      answer: (num1 * num2).toString(),
      type: "near_base",
    };
  };

  // Format time to display as mm:ss.ms
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  // Start the game
  const startGame = () => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setGameState("playing");
    setCurrentQuestion(0);
    setScore(0);
    setTimer(0);
    setIsCorrect(null);

    // Start the timer
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 10); // Update every 10ms
    }, 10);

    // Focus on input field
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) return;

    const correct = userAnswer.trim() === questions[currentQuestion].answer;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
    }

    // Always move to next question after a delay (whether correct or not)
    setTimeout(
      () => {
        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestion((prev) => prev + 1);
          setUserAnswer("");
          setIsCorrect(null);
          setShowWrongAnswer(false); // Reset wrong answer display
          if (inputRef.current) {
            inputRef.current.focus();
          }
        } else {
          // End game
          clearInterval(timerRef.current);
          setFinalTime(timer);
          setGameState("completed");
          saveGameResult();
        }
      },
      correct ? 500 : 1500
    );
    if (!correct) {
      setShowWrongAnswer(true);
    }
  };

  const saveGameResult = async () => {
    setLoading(true);

    try {
      if (!user) return;

      const userName = user?.user_metadata?.full_name || "Anonymous Player";

      const { error } = await supabase.from("game_scores").insert([
        {
          user_id: user.id,
          user_name: userName,
          score,
          time_taken: timer,
          completed_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;
    } catch (error) {
      console.error("Error saving game result:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkAnswer();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const goToLeaderboard = () => {
    navigate("/leaderboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f12] to-[#1a1a21] text-[#e0c9b1] font-inter">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1e1e23]/40 backdrop-blur-sm border border-[#ffffff05] rounded-2xl p-8 shadow-xl"
        >
          <h1 className="font-bricolage font-bold text-3xl md:text-4xl bg-gradient-to-r from-[#e0c9b1] to-[#d4b595] bg-clip-text text-transparent mb-8 text-center">
            Vedic Math Challenge
          </h1>

          {/* Start Screen */}
          {gameState === "start" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="bg-[#2a2a35]/50 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-bricolage font-semibold text-xl mb-4">
                  How to Play
                </h3>
                <ul className="space-y-2 text-[#e0c9b1]/80">
                  <li>• You'll be presented with 5 math problems</li>
                  <li>• Use Vedic techniques to solve them quickly</li>
                  <li>• Type your answer and press Enter</li>
                  <li>
                    • Your score is based on correct answers and time taken
                  </li>
                  <li>
                    • The game will continue to the next question even if your
                    answer is incorrect
                  </li>
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={startGame}
                className="px-8 py-3 bg-[#e0c9b1] text-[#0f0f12] rounded-md font-bold hover:bg-[#d4b595] transition-colors duration-300"
              >
                Start Challenge
              </motion.button>
            </motion.div>
          )}

          {/* Game Playing Screen */}
          {gameState === "playing" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="bg-[#2a2a35]/50 px-4 py-2 rounded-md">
                  <span className="text-sm text-[#e0c9b1]/60">Question</span>
                  <div className="font-bricolage font-medium">
                    {currentQuestion + 1} / {totalQuestions}
                  </div>
                </div>

                <div className="bg-[#2a2a35]/50 px-4 py-2 rounded-md">
                  <span className="text-sm text-[#e0c9b1]/60">Time</span>
                  <div className="font-bricolage font-medium tabular-nums">
                    {formatTime(timer)}
                  </div>
                </div>

                <div className="bg-[#2a2a35]/50 px-4 py-2 rounded-md">
                  <span className="text-sm text-[#e0c9b1]/60">Score</span>
                  <div className="font-bricolage font-medium">
                    {score} / {currentQuestion}
                  </div>
                </div>
              </div>

              {questions.length > 0 && (
                <div className="mb-10">
                  <div className="text-center mb-8">
                    <motion.div
                      key={currentQuestion}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-4xl md:text-6xl font-bricolage font-bold mb-2"
                    >
                      {questions[currentQuestion].question}
                    </motion.div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center">
                      <div className="relative w-full max-w-xs">
                        <input
                          ref={inputRef}
                          type="text"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          className={`w-full px-5 py-4 text-center text-2xl font-bricolage font-bold rounded-md bg-[#2a2a35]/50 border focus:outline-none focus:ring-2 ${
                            isCorrect === null
                              ? "border-[#ffffff20] focus:ring-[#e0c9b1]/50"
                              : isCorrect
                              ? "border-green-500/50 focus:ring-green-500/30 text-green-400"
                              : "border-red-500/50 focus:ring-red-500/30 text-red-400"
                          }`}
                          placeholder="Your answer"
                          autoComplete="off"
                        />

                        {showWrongAnswer && (
                          <div className="absolute top-full mt-2 left-0 right-0 text-center text-red-400 text-sm">
                            Incorrect.
                          </div>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="mt-6 px-8 py-3 bg-[#e0c9b1] text-[#0f0f12] rounded-md font-medium hover:bg-[#d4b595] transition-colors duration-300 flex items-center"
                      >
                        Submit Answer
                        <IconArrowRight size={18} className="ml-2" />
                      </motion.button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* Game Completed Screen */}
          {gameState === "completed" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="mb-4">
                <span className="inline-block p-4 bg-[#e0c9b1]/10 rounded-full mb-4">
                  <IconTrophy size={48} className="text-[#e0c9b1]" />
                </span>
              </div>

              <h2 className="font-bricolage font-bold text-2xl md:text-3xl mb-6">
                Challenge Completed!
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="bg-[#2a2a35]/50 p-5 rounded-xl">
                  <div className="text-sm text-[#e0c9b1]/60 mb-1">Score</div>
                  <div className="text-3xl font-bricolage font-bold">
                    {score}/{totalQuestions}
                  </div>
                </div>

                <div className="bg-[#2a2a35]/50 p-5 rounded-xl">
                  <div className="text-sm text-[#e0c9b1]/60 mb-1">Time</div>
                  <div className="text-3xl font-bricolage font-bold tabular-nums">
                    {formatTime(finalTime)}
                  </div>
                </div>

                <div className="bg-[#2a2a35]/50 p-5 rounded-xl">
                  <div className="text-sm text-[#e0c9b1]/60 mb-1">Accuracy</div>
                  <div className="text-3xl font-bricolage font-bold">
                    {totalQuestions > 0
                      ? Math.round((score / totalQuestions) * 100)
                      : 0}
                    %
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={startGame}
                  className="px-8 py-3 border border-[#e0c9b1]/30 text-[#e0c9b1] rounded-md font-medium hover:border-[#e0c9b1] transition-all duration-300"
                >
                  Play Again
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={goToLeaderboard}
                  disabled={loading}
                  className="px-8 py-3 bg-[#e0c9b1] text-[#0f0f12] rounded-md font-medium hover:bg-[#d4b595] transition-colors duration-300 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <IconLoader2 size={18} className="animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <IconTrophy size={18} className="mr-2" />
                      View Leaderboard
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Game;
