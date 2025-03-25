import { useState, useCallback } from "react";
import geminiService from "../services/geminiService";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";

export const useGeminiAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { lessonProgress } = useProgress();

  const getUserContext = useCallback(() => {
    return {
      lessonProgress: lessonProgress?.completedLessons || 0,
      userSkillLevel: calculateUserLevel(lessonProgress),
      recentTopics: getRecentTopics(lessonProgress),
    };
  }, [lessonProgress, user]);

  const sendMessage = useCallback(
    async (message) => {
      setLoading(true);
      setError(null);

      try {
        const contextData = getUserContext();
        const response = await geminiService.sendMessage(message, contextData);
        setLoading(false);
        return response;
      } catch (err) {
        setError(err.message || "Failed to get AI response");
        setLoading(false);
        return null;
      }
    },
    [getUserContext]
  );

  const generatePracticeProblems = useCallback(
    async (topic, difficulty, count = 5) => {
      setLoading(true);

      try {
        const prompt = `Generate ${count} practice problems about ${topic} at ${difficulty} difficulty level. Format each problem with a problem statement, 4 multiple choice options, the correct answer, and a step-by-step vedic math solution. Use JSON format.`;

        const response = await geminiService.sendMessage(prompt);
        setLoading(false);

        // Extract and parse JSON from response
        const jsonMatch = response.match(/```json([\s\S]*?)```/);
        if (jsonMatch && jsonMatch[1]) {
          return JSON.parse(jsonMatch[1].trim());
        }

        throw new Error("Failed to parse generated problems");
      } catch (err) {
        setError(err.message);
        setLoading(false);
        return [];
      }
    },
    []
  );

  // Helper functions
  const calculateUserLevel = (progress) => {
    const completedLessons = progress?.completedLessons || 0;
    if (completedLessons >= 5) return "advanced";
    if (completedLessons >= 3) return "intermediate";
    return "beginner";
  };

  const getRecentTopics = (progress) => {
    // Logic to extract recent topics based on progress
    const topicMap = {
      1: "Digit Sum and Multiplication",
      2: "Addition and Subtraction",
      3: "Mental Division",
      4: "Algebra Shortcuts",
      5: "Squaring Numbers",
    };

    const completed = progress?.lessons || {};
    return Object.keys(completed)
      .filter((lessonId) => completed[lessonId].completed)
      .map((lessonId) => topicMap[lessonId])
      .slice(-3); // Last 3 topics
  };

  return {
    sendMessage,
    generatePracticeProblems,
    loading,
    error,
    clearHistory: geminiService.clearHistory,
  };
};
