import React from "react";
import {
  IconChartBar,
  IconHome,
  IconX,
  IconLock,
  IconLogout,
  IconMathSymbols,
} from "@tabler/icons-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getUserProgress } from "../utils/ProgressUtils";

const SidePanel = ({ isOpen = true, togglePanel }) => {
  const { user, signOut } = useAuth();
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      const progress = await getUserProgress();
      setUserProgress(progress);
      setLoading(false);
    };

    fetchProgress();
  }, []);

  const isLessonUnlocked = (lessonId) => {
    if (loading) return lessonId === 1;
    return lessonId <= (userProgress?.current_lesson || 1);
  };

  const NavItem = ({ icon, text, path, active = false, locked = false }) => {
    return (
      <>
        <Link
          to={locked ? "#" : path}
          className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
            active
              ? "bg-[#2a2a35] text-[#e0c9b1]"
              : locked
              ? "text-[#e0c9b1]/40 cursor-not-allowed"
              : "text-[#e0c9b1]/70 hover:bg-[#2a2a35]/50 hover:text-[#e0c9b1]"
          }`}
        >
          <span className="mr-3">{icon}</span>
          <span>{text}</span>
          {locked && <IconLock size={14} className="ml-auto" />}
        </Link>
      </>
    );
  };

  const lessons = [
    {
      id: 1,
      title: "Addition Made Easy",
      description: "Learn quick addition techniques",
      path: "/lesson/1",
    },
    {
      id: 2,
      title: "Subtraction Simplified",
      description: "Master mental subtraction",
      path: "/lesson/2",
    },
    {
      id: 3,
      title: "Multiplication Magic",
      description: "Multiply large numbers rapidly",
      path: "/lesson/3",
    },
    {
      id: 4,
      title: "Division Decoded",
      description: "Approach division differently",
      path: "/lesson/4",
    },
    {
      id: 5,
      title: "Squaring Numbers",
      description: "Learn to square numbers instantly",
      path: "/lesson/5",
    },
  ];

  return (
    <>
      <div
        className={`fixed left-0 top-0 bottom-0 w-64 bg-[#0a0a10] border-r border-[#2a2a35] 
        overflow-hidden flex flex-col transition-transform duration-300 ease-in-out z-30
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-5 flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="font-bricolage font-bold text-2xl bg-gradient-to-r from-[#e0c9b1] to-[#d4b595] bg-clip-text text-transparent">
              VedicMath
            </div>

            {/* Add close button */}
            {togglePanel && (
              <button
                onClick={togglePanel}
                className="text-[#e0c9b1]/70 hover:text-[#e0c9b1]"
                aria-label="Close panel"
              >
                <IconX size={20} />
              </button>
            )}
          </div>

          <nav className="space-y-1">
            <NavItem
              icon={<IconHome size={20} />}
              text="Dashboard"
              path="/dashboard"
              active
            />
            <NavItem
              icon={<IconChartBar size={20} />}
              text="Progress"
              path="/progress"
            />
          </nav>

          <div className="my-4 border-t border-[#2a2a35]"></div>

          <div className="mb-2 text-sm font-medium text-[#e0c9b1]/70">
            Vedic Techniques
          </div>
          <nav className="space-y-1">
            {lessons.map((lesson) => (
              <NavItem
                key={lesson.id}
                icon={
                  isLessonUnlocked(lesson.id) ? (
                    <IconMathSymbols size={20} />
                  ) : (
                    <IconLock size={20} />
                  )
                }
                text={lesson.title}
                path={isLessonUnlocked(lesson.id) ? lesson.path : "#"}
                locked={!isLessonUnlocked(lesson.id)}
              />
            ))}
          </nav>

          <div className="mb-20"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#0a0a10] border-t border-[#2a2a35]/40">
          <button
            onClick={signOut}
            className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-[#2a2a35] transition-colors duration-200 text-[#e0c9b1]/80 hover:text-[#e0c9b1]"
          >
            <IconLogout size={20} className="mr-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SidePanel;
