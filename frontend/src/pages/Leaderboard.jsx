import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import {
  IconArrowLeft,
  IconLoader,
  IconMedal,
  IconTrophy,
  IconUserCircle,
  IconClock,
} from "@tabler/icons-react";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("all");
  const { user } = useAuth();

  useEffect(() => {
    fetchLeaderboard();
  }, [timeFilter]);

  const fetchLeaderboard = async () => {
    setLoading(true);

    try {
      let query = supabase
        .from("game_scores")
        .select("*")
        .order("score", { ascending: false })
        .order("time_taken", { ascending: true });

      // Apply time filters
      if (timeFilter === "week") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        query = query.gte("completed_at", oneWeekAgo.toISOString());
      } else if (timeFilter === "month") {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        query = query.gte("completed_at", oneMonthAgo.toISOString());
      }

      const { data, error } = await query;

      if (error) throw error;

      const userBestScores = {};
      data.forEach((score) => {
        const userId = score.user_id;
        if (
          !userBestScores[userId] ||
          score.score > userBestScores[userId].score ||
          (score.score === userBestScores[userId].score &&
            score.time_taken < userBestScores[userId].time_taken)
        ) {
          userBestScores[userId] = score;
        }
      });

      const processedScores = Object.values(userBestScores)
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return a.time_taken - b.time_taken;
        })
        .slice(0, 100);

      setScores(processedScores);
    } catch (error) {
      console.error("Error fetching leaderboard:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f12] to-[#1a1a21] text-[#e0c9b1] font-inter">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link to="/dashboard">
              <motion.button
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center text-[#e0c9b1]/70 hover:text-[#e0c9b1] transition-colors"
              >
                <IconArrowLeft size={18} className="mr-1" />
                Back to Dashboard
              </motion.button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1e1e23]/40 backdrop-blur-sm border border-[#ffffff05] rounded-2xl p-8 shadow-xl"
          >
            <div className="text-center mb-10">
              <div className="mb-4">
                <span className="inline-block p-4 bg-[#e0c9b1]/10 rounded-full">
                  <IconTrophy size={40} className="text-[#e0c9b1]" />
                </span>
              </div>

              <h1 className="font-bricolage font-bold text-3xl md:text-4xl bg-gradient-to-r from-[#e0c9b1] to-[#d4b595] bg-clip-text text-transparent mb-2">
                Vedic Math Champions
              </h1>
              <p className="text-[#e0c9b1]/70 max-w-lg mx-auto">
                Top performers in the Vedic Math Challenge, ranked by score and
                time.
              </p>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bricolage font-semibold text-xl">
                Leaderboard
              </h2>

              <div className="flex space-x-2">
                <TimeFilterButton
                  active={timeFilter === "all"}
                  onClick={() => setTimeFilter("all")}
                >
                  All Time
                </TimeFilterButton>
                <TimeFilterButton
                  active={timeFilter === "month"}
                  onClick={() => setTimeFilter("month")}
                >
                  This Month
                </TimeFilterButton>
                <TimeFilterButton
                  active={timeFilter === "week"}
                  onClick={() => setTimeFilter("week")}
                >
                  This Week
                </TimeFilterButton>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <IconLoader
                  size={36}
                  className="animate-spin text-[#e0c9b1]/70"
                />
              </div>
            ) : scores.length === 0 ? (
              <div className="text-center py-16 bg-[#2a2a35]/20 rounded-xl">
                <p className="text-lg text-[#e0c9b1]/70">
                  No scores recorded yet. Be the first to top the leaderboard!
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#ffffff10]">
                      <th className="py-4 px-4 text-left">Rank</th>
                      <th className="py-4 px-4 text-left">Player</th>
                      <th className="py-4 px-4 text-center">Score</th>
                      <th className="py-4 px-4 text-center">Time</th>
                      <th className="py-4 px-4 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scores.map((score, index) => (
                      <motion.tr
                        key={score.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          background:
                            score.user_id === user?.id
                              ? "rgba(224, 201, 177, 0.07)"
                              : "transparent",
                        }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`border-b border-[#ffffff05] hover:bg-[#ffffff05] transition-colors ${
                          score.user_id === user?.id ? "bg-[#e0c9b1]/10" : ""
                        }`}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            {index === 0 ? (
                              <div className="p-1 rounded-full bg-[#FFD700]/10 mr-2">
                                <IconMedal
                                  size={18}
                                  className="text-[#FFD700]"
                                />
                              </div>
                            ) : index === 1 ? (
                              <div className="p-1 rounded-full bg-[#C0C0C0]/10 mr-2">
                                <IconMedal
                                  size={18}
                                  className="text-[#C0C0C0]"
                                />
                              </div>
                            ) : index === 2 ? (
                              <div className="p-1 rounded-full bg-[#CD7F32]/10 mr-2">
                                <IconMedal
                                  size={18}
                                  className="text-[#CD7F32]"
                                />
                              </div>
                            ) : (
                              <span className="w-6 text-center text-[#e0c9b1]/60 mr-2">
                                {index + 1}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <div className="p-1 rounded-full bg-[#e0c9b1]/10 mr-2">
                              <IconUserCircle
                                size={20}
                                className="text-[#e0c9b1]"
                              />
                            </div>
                            <span
                              className={
                                score.user_id === user?.id ? "font-medium" : ""
                              }
                            >
                              {score.user_name || "Anonymous Player"}
                              {score.user_id === user?.id && " (You)"}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center font-medium">
                          <div className="inline-flex items-center justify-center">
                            {score.score}/5
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center justify-center font-mono">
                            <IconClock
                              size={14}
                              className="mr-1 text-[#e0c9b1]/60"
                            />
                            {formatTime(score.time_taken)}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right text-sm text-[#e0c9b1]/70">
                          {formatDate(score.completed_at)}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-10 flex justify-center">
              <Link to="/game">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-[#e0c9b1] text-[#0f0f12] rounded-md font-medium hover:bg-[#d4b595] transition-colors duration-300"
                >
                  Play Again
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const TimeFilterButton = ({ active, onClick, children }) => {
  return (
    <button
      onClick={() => {
        setLoading(true);
        onClick();
      }}
      className={`px-3 py-1 text-sm rounded-md transition-colors ${
        active
          ? "bg-[#e0c9b1] text-[#0f0f12]"
          : "bg-[#2a2a35]/50 text-[#e0c9b1]/70 hover:bg-[#2a2a35] hover:text-[#e0c9b1]"
      }`}
    >
      {children}
    </button>
  );
};

export default Leaderboard;
