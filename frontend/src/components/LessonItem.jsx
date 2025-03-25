import React from "react";
import { Link } from "react-router-dom";
import { IconCheck } from "@tabler/icons-react";

const LessonItem = ({
  lesson,
  unlocked,
  current,
  completed,
  isFirst,
  isLast,
}) => {
  return (
    <div className="flex items-start">
      <div className="relative flex flex-col items-center mr-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
            completed
              ? "bg-green-500 text-white"
              : current
              ? "bg-[#e0c9b1] text-[#1a1a21]"
              : unlocked
              ? "bg-[#e0c9b1]/40 text-[#e0c9b1]"
              : "bg-[#e0c9b1]/10 text-[#e0c9b1]/30"
          }`}
        >
          {completed ? <IconCheck size={20} /> : lesson.id}
        </div>
      </div>

      <div
        className={`flex-1 bg-[#1e1e25] p-5 rounded-lg ${
          !unlocked && "opacity-60"
        }`}
      >
        <Link
          to={unlocked ? lesson.path : "#"}
          className={`block ${!unlocked && "pointer-events-none"}`}
        >
          <h3 className="font-bricolage font-medium text-xl mb-1 flex items-center">
            {lesson.title}
            {completed && (
              <span className="ml-2 text-green-500 text-sm font-normal">
                Completed
              </span>
            )}
            {current && !completed && (
              <span className="ml-2 text-yellow-400 text-sm font-normal">
                In Progress
              </span>
            )}
          </h3>
          <p className="text-[#e0c9b1]/70">{lesson.description}</p>
        </Link>
      </div>
    </div>
  );
};

export default LessonItem;
