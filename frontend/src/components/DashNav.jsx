import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DashNav = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);

      try {
        if (!user) return;

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [user]);

  const getName = () => {
    if (loading) return "...";
    if (profile?.name) return profile.name;
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    return "Scholar";
  };
  return (
    <>
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="font-bricolage font-bold text-3xl bg-gradient-to-r from-[#e0c9b1] to-[#d4b595] bg-clip-text text-transparent mb-1">
            Welcome, {getName()}
          </h1>
          <p className="text-[#e0c9b1]/60">
            Ready to continue your Vedic Mathematics journey?
          </p>
        </div>

        <Link to="/game">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center px-5 py-3 bg-[#e0c9b1] text-[#0f0f12] rounded-md font-bold hover:bg-[#d4b595] transition-colors duration-300"
          >
            <span>Play Math Game</span>
          </motion.button>
        </Link>
      </div>
    </>
  );
};

export default DashNav;
