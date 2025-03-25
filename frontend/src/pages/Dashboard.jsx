import React, { useEffect, useState } from "react";
import DashNav from "../components/DashNav";
import SidePanel from "../components/SidePanel";
import LessonItem from "../components/LessonItem";
import { IconMenu2 } from "@tabler/icons-react";
import ProgressBar from "../components/ProgressBar";
import { useProgress } from "../context/ProgressContext";

const Dashboard = () => {
  const { userProgress, loading, refreshProgress } = useProgress();
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  useEffect(() => {
    console.log("Dashboard mounted, refreshing progress...");
    refreshProgress();
  }, []);

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
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

  const getCurrentProgress = () => {
    if (loading) return 1;
    return userProgress?.current_lesson || 1;
  };

  const isLessonUnlocked = (lessonId) => {
    return lessonId <= getCurrentProgress();
  };

  const isLessonCompleted = (lessonId) => {
    if (!userProgress?.completed_lessons) return false;
    return userProgress.completed_lessons.includes(lessonId);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0f0f12] to-[#1a1a21] text-[#e0c9b1] font-inter overflow-hidden">
      <SidePanel isOpen={isSidePanelOpen} togglePanel={toggleSidePanel} />

      {!isSidePanelOpen && (
        <button
          onClick={toggleSidePanel}
          className="fixed top-6 left-6 z-20 p-2 rounded-md bg-[#2a2a35]/60 hover:bg-[#2a2a35] text-[#e0c9b1]"
          aria-label="Toggle navigation"
        >
          <IconMenu2 size={24} />
        </button>
      )}

      <div
        className={`
          transition-all duration-300 relative z-0 h-screen overflow-y-auto custom-scrollbar
          ${isSidePanelOpen ? "ml-64" : "ml-0 flex justify-center"}
        `}
      >
        <div
          className={`
          p-8 min-h-screen
          ${isSidePanelOpen ? "w-full" : "max-w-4xl w-full"}
        `}
        >
          <DashNav toggleSidePanel={toggleSidePanel} />

          <div className="mb-8">
            <ProgressBar />
          </div>

          <div className="mb-10">
            <h2 className="font-bricolage font-semibold text-2xl mb-6">
              Your Learning Path
            </h2>

            <div className="relative">
              <div className="absolute left-[25px] top-[60px] bottom-[60px] w-[2px] bg-gradient-to-b from-[#e0c9b1] via-[#e0c9b1]/30 to-[#e0c9b1]/10"></div>

              <div className="space-y-5">
                {lessons.map((lesson, index) => (
                  <LessonItem
                    key={lesson.id}
                    lesson={lesson}
                    unlocked={isLessonUnlocked(lesson.id)}
                    completed={isLessonCompleted(lesson.id)}
                    current={lesson.id === getCurrentProgress()}
                    isFirst={index === 0}
                    isLast={index === lessons.length - 1}
                  />
                ))}
                <div className="pb-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
