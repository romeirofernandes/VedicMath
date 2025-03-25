import React, { memo } from "react";
import { useProgress } from "../context/ProgressContext";

// Fix the memo syntax - incorrect parentheses
const ProgressBar = memo(({ percentage: initialPercentage = 0 }) => {
  const { userProgress, loading } = useProgress();
  const totalLessons = 5;

  console.log("ProgressBar rendering with:", userProgress);

  // Calculate the percentage
  let percentage = initialPercentage;
  if (!loading && userProgress?.completed_lessons) {
    percentage = Math.floor(
      (userProgress.completed_lessons.length / totalLessons) * 100
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-[#e0c9b1]/70">Course Progress</span>
        <span className="text-sm font-medium text-[#e0c9b1]">
          {loading ? "Loading..." : `${percentage}%`}
        </span>
      </div>

      <div className="h-2 bg-[#2a2a35] rounded-full overflow-hidden">
        {loading ? (
          <div className="h-full bg-[#e0c9b1]/30 animate-pulse" />
        ) : (
          <div
            className="h-full bg-gradient-to-r from-[#e0c9b1] to-[#d4b89c] transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  );
});

export default ProgressBar;
