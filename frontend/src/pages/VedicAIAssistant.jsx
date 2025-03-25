// pages/VedicAIAssistant.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { IconMessage, IconCalculator } from "@tabler/icons-react";
import AIChatInterface from "../components/VedicAI/AIChatInterface";
import AIProblemGenerator from "../components/VedicAI/AIProblemGenerator";
import SidePanel from "../components/SidePanel"; // Your existing side panel

const VedicAIAssistant = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f12] to-[#1a1a21] text-[#e0c9b1] font-inter">
      <SidePanel isOpen={isSidePanelOpen} togglePanel={toggleSidePanel} />

      <div
        className={`transition-all duration-300 ${
          isSidePanelOpen ? "ml-64" : "ml-0"
        }`}
      >
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-bricolage font-bold text-3xl md:text-4xl bg-gradient-to-r from-[#e0c9b1] to-[#d4b595] bg-clip-text text-transparent"
            >
              VedicAI Assistant
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#e0c9b1]/80 mt-2"
            >
              Your intelligent companion for mastering Vedic Mathematics
              techniques
            </motion.p>
          </div>

          <div className="mb-6">
            <div className="flex border-b border-[#2a2a35]">
              <button
                onClick={() => setActiveTab("chat")}
                className={`py-3 px-6 flex items-center ${
                  activeTab === "chat"
                    ? "border-b-2 border-[#d4b595] text-[#e0c9b1]"
                    : "text-[#e0c9b1]/60 hover:text-[#e0c9b1]/90"
                }`}
              >
                <IconMessage size={20} className="mr-2" />
                Chat with VedicAI
              </button>
              <button
                onClick={() => setActiveTab("problems")}
                className={`py-3 px-6 flex items-center ${
                  activeTab === "problems"
                    ? "border-b-2 border-[#d4b595] text-[#e0c9b1]"
                    : "text-[#e0c9b1]/60 hover:text-[#e0c9b1]/90"
                }`}
              >
                <IconCalculator size={20} className="mr-2" />
                Generate Practice Problems
              </button>
            </div>
          </div>

          <div className="h-[calc(100vh-280px)] min-h-[500px]">
            {activeTab === "chat" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full"
              >
                <AIChatInterface />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full overflow-auto"
              >
                <AIProblemGenerator />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VedicAIAssistant;
