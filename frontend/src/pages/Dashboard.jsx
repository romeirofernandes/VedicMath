import React, { useState } from "react";
import { IconBrain, IconCalculator, IconTrophy } from "@tabler/icons-react";
import StatsCard from "../components/StatsCard";
import DashNav from "../components/DashNav";
import SidePanel from "../components/SidePanel";
import LessonItem from "../components/LessonItem";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

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
    return profile?.progress || 1;
  };

  const isLessonUnlocked = (lessonId) => {
    return lessonId <= getCurrentProgress();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0f0f12] to-[#1a1a21] text-[#e0c9b1] font-inter overflow-hidden">
      <SidePanel />

      <div className="ml-64 relative z-0 h-screen overflow-y-auto custom-scrollbar">
        <div className="p-8 min-h-screen">
          <DashNav />

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
                    current={lesson.id === getCurrentProgress()}
                    isFirst={index === 0}
                    isLast={index === lessons.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              icon={<IconBrain className="text-[#e0c9b1]" />}
              title="Progress"
              value={`${Math.round(
                (getCurrentProgress() / lessons.length) * 100
              )}%`}
            />
            <StatsCard
              icon={<IconCalculator className="text-[#e0c9b1]" />}
              title="Exercises"
              value="23 Completed"
            />
            <StatsCard
              icon={<IconTrophy className="text-[#e0c9b1]" />}
              title="Achievements"
              value="3 Unlocked"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

<StatsCard icon title value />;

export default Dashboard;
