import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserProgress } from "../utils/ProgressUtils";

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProgress = async () => {
    try {
      const progress = await getUserProgress();
      setUserProgress(progress);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching progress:", error);
      setLoading(false);
    }
  };

  const refreshProgress = async () => {
    console.log("Refreshing progress...");
    try {
      const progress = await getUserProgress();
      console.log("New progress data:", progress);
      setUserProgress(progress);
      return progress;
    } catch (error) {
      console.error("Error refreshing progress:", error);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const value = {
    userProgress,
    loading,
    refreshProgress,
    completedLessons: userProgress?.completed_lessons || [],
    currentLesson: userProgress?.current_lesson || 1,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
