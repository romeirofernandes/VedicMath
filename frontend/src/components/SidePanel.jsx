import React from "react";
import {
  IconBook2,
  IconChartBar,
  IconHome,
  IconLock,
  IconLogout,
  IconMathSymbols,
  IconTrophy,
} from "@tabler/icons-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const SidePanel = () => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(true);

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

  const isLessonUnlocked = (lessonId) => {
    return lessonId <= getCurrentProgress();
  };

  const getCurrentProgress = () => {
    if (loading) return 1;
    return profile?.progress || 1;
  };

  return (
    <>
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-[#0a0a10] border-r border-[#2a2a35] overflow-hidden flex flex-col">
        <div className="p-5 flex-1">
          <div className="font-bricolage font-bold text-2xl bg-gradient-to-r from-[#e0c9b1] to-[#d4b595] bg-clip-text text-transparent mb-6">
            VedicMath
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
