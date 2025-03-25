import React, { useState } from "react";
import { useGeminiAI } from "../hooks/useGeminiAI";
import { motion } from "framer-motion";
import { IconLoader2, IconRefresh, IconChevronDown } from "@tabler/icons-react";

const AIProblemGenerator = () => {
  const [topic, setTopic] = useState("multiplication");
  const [difficulty, setDifficulty] = useState("medium");
  const [count, setCount] = useState(5);
  const [problems, setProblems] = useState([]);
  const [expandedProblem, setExpandedProblem] = useState(null);
  const { generatePracticeProblems, loading } = useGeminiAI();

  const handleGenerate = async () => {
    const generatedProblems = await generatePracticeProblems(
      topic,
      difficulty,
      count
    );
    if (generatedProblems && generatedProblems.length > 0) {
      setProblems(generatedProblems);
    }
  };

  const toggleSolution = (index) => {
    if (expandedProblem === index) {
      setExpandedProblem(null);
    } else {
      setExpandedProblem(index);
    }
  };

  const topicOptions = [
    { value: "multiplication", label: "Multiplication" },
    { value: "division", label: "Division" },
    { value: "squaring", label: "Squaring Numbers" },
    { value: "addition", label: "Addition" },
    { value: "subtraction", label: "Subtraction" },
    { value: "algebra", label: "Algebraic Equations" },
  ];

  const difficultyOptions = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  return (
    <div className="bg-[#1a1a21] rounded-xl border border-[#2a2a35] overflow-hidden">
      <div className="p-4 border-b border-[#2a2a35]">
        <h2 className="font-bricolage font-bold text-xl text-[#e0c9b1]">
          VedicAI Problem Generator
        </h2>
        <p className="text-[#e0c9b1]/70 text-sm">
          Generate custom practice problems with step-by-step Vedic solutions
        </p>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-[#e0c9b1] text-sm mb-1">Topic</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-[#2a2a35] text-[#e0c9b1] rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#d4b595]"
            >
              {topicOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#e0c9b1] text-sm mb-1">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full bg-[#2a2a35] text-[#e0c9b1] rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#d4b595]"
            >
              {difficultyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#e0c9b1] text-sm mb-1">
              Number of Problems
            </label>
            <select
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full bg-[#2a2a35] text-[#e0c9b1] rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#d4b595]"
            >
              <option value={3}>3 Problems</option>
              <option value={5}>5 Problems</option>
              <option value={10}>10 Problems</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full py-2 rounded-lg flex items-center justify-center ${
            loading
              ? "bg-[#2a2a35] text-[#e0c9b1]/50"
              : "bg-[#d4b595] text-[#0f0f12] hover:bg-[#e0c9b1] transition-colors"
          }`}
        >
          {loading ? (
            <>
              <IconLoader2 size={20} className="animate-spin mr-2" />
              Generating Problems...
            </>
          ) : (
            <>
              <IconRefresh size={20} className="mr-2" />
              Generate Problems
            </>
          )}
        </button>
      </div>

      {problems.length > 0 && (
        <div className="p-4 border-t border-[#2a2a35]">
          <h3 className="font-bricolage font-semibold text-lg text-[#e0c9b1] mb-3">
            Practice Problems
          </h3>

          <div className="space-y-4">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#2a2a35] rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-0.5 bg-[#d4b595]/20 text-[#d4b595] text-xs rounded mb-2">
                        Problem {index + 1}
                      </span>
                      <p className="text-[#e0c9b1]">{problem.question}</p>

                      {problem.options && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                          {problem.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`p-2 border rounded-md text-sm ${
                                option === problem.answer
                                  ? "border-green-500/30 bg-green-500/10 text-green-300"
                                  : "border-[#3a3a45] text-[#e0c9b1]/80"
                              }`}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIProblemGenerator;
