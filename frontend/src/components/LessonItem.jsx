import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  IconChevronRight,
  IconLock,
  IconMathSymbols,
} from "@tabler/icons-react";

const LessonItem = ({ lesson, unlocked, current, isFirst, isLast }) => {
  return (
    <>
      <div className="flex">
        <div
          className={`relative flex items-center justify-center w-12 h-12 rounded-full mr-5 ${
            unlocked
              ? current
                ? "bg-[#e0c9b1]"
                : "bg-[#2a2a35]"
              : "bg-[#2a2a35]/50"
          }`}
        >
          {unlocked ? (
            <IconMathSymbols
              size={20}
              className={current ? "text-[#0f0f12]" : "text-[#e0c9b1]"}
            />
          ) : (
            <IconLock size={20} className="text-[#e0c9b1]/40" />
          )}
        </div>

        <div className="flex-1">
          <div
            className={`p-5 rounded-xl ${
              current
                ? "bg-[#2a2a35] border border-[#e0c9b1]/30"
                : "bg-[#1e1e23]/40"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3
                className={`font-bricolage font-semibold text-lg ${
                  unlocked ? "text-[#e0c9b1]" : "text-[#e0c9b1]/50"
                }`}
              >
                {lesson.title}
              </h3>
              {unlocked && (
                <span className="text-xs uppercase font-medium px-2 py-1 rounded-full bg-[#e0c9b1]/10 text-[#e0c9b1]/80">
                  {current ? "Current" : "Completed"}
                </span>
              )}
            </div>

            <p
              className={`text-sm mb-4 ${
                unlocked ? "text-[#e0c9b1]/70" : "text-[#e0c9b1]/30"
              }`}
            >
              {lesson.description}
            </p>

            {unlocked && (
              <Link to={lesson.path}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center text-sm font-medium text-[#e0c9b1] hover:text-[#e0c9b1]/80"
                >
                  {current ? "Start Lesson" : "Review Lesson"}
                  <IconChevronRight size={16} className="ml-1" />
                </motion.button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonItem;
