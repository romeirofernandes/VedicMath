import React, { useState, useRef, useEffect } from "react";
import { useGeminiAI } from "../hooks/useGeminiAI";
import AIResponse from "./AIResponse";
import { motion } from "framer-motion";
import { IconSend, IconBulb } from "@tabler/icons-react";

const AIChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      type: "ai",
      content:
        "Namaste! I'm VedicAI, your Vedic Mathematics assistant. How can I help you learn today?",
    },
  ]);
  const [input, setInput] = useState("");
  const { sendMessage, loading, error } = useGeminiAI();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Show typing indicator
    setMessages((prev) => [
      ...prev,
      { id: "typing", type: "typing", content: "" },
    ]);

    // Get AI response
    const response = await sendMessage(input);

    // Remove typing indicator and add AI response
    setMessages((prev) =>
      prev
        .filter((msg) => msg.id !== "typing")
        .concat({
          id: Date.now().toString() + "-ai",
          type: "ai",
          content:
            response || "I'm having trouble connecting. Please try again.",
        })
    );
  };

  const suggestedPrompts = [
    "Explain the Nikhilam method for multiplication",
    "Generate practice problems for squaring numbers",
    "Show me how to divide by 9 using Vedic math",
    "What's the Vertically and Crosswise method?",
    "How can I use Vedic math in everyday life?",
  ];

  return (
    <div className="flex flex-col h-full bg-[#0f0f12] rounded-xl overflow-hidden border border-[#2a2a35]">
      <div className="p-4 border-b border-[#2a2a35] bg-[#1a1a21]">
        <h2 className="font-bricolage font-bold text-xl text-[#e0c9b1]">
          VedicAI Assistant
        </h2>
        <p className="text-[#e0c9b1]/70 text-sm">
          Your personal Vedic Mathematics guide
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) =>
          message.type === "typing" ? (
            <div key="typing" className="flex items-start">
              <div className="bg-[#2a2a35] text-[#e0c9b1]/90 p-3 rounded-lg max-w-[80%]">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-[#e0c9b1]/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[#e0c9b1]/60 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[#e0c9b1]/60 rounded-full animate-bounce"
                    style={{ animationDelay: "600ms" }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start ${
                message.type === "user" ? "justify-end" : ""
              }`}
            >
              {message.type === "ai" && (
                <div className="w-8 h-8 rounded-full bg-[#d4b595] flex items-center justify-center mr-2">
                  <IconBulb size={18} className="text-[#0f0f12]" />
                </div>
              )}

              <div
                className={`p-3 rounded-lg max-w-[80%] ${
                  message.type === "user"
                    ? "bg-[#d4b595] text-[#0f0f12]"
                    : "bg-[#2a2a35] text-[#e0c9b1]/90"
                }`}
              >
                {message.type === "ai" ? (
                  <AIResponse content={message.content} />
                ) : (
                  <p>{message.content}</p>
                )}
              </div>

              {message.type === "user" && (
                <div className="w-8 h-8 rounded-full bg-[#e0c9b1]/20 flex items-center justify-center ml-2">
                  <span className="text-[#e0c9b1]">You</span>
                </div>
              )}
            </motion.div>
          )
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested prompts */}
      {messages.length <= 2 && (
        <div className="p-3 flex overflow-x-auto gap-2 border-t border-[#2a2a35]">
          {suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
              className="px-3 py-1.5 bg-[#2a2a35] text-[#e0c9b1]/80 rounded-full whitespace-nowrap text-sm hover:bg-[#3a3a45] transition-colors"
              onClick={() => setInput(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="p-3 border-t border-[#2a2a35] flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Vedic Math techniques..."
          className="flex-1 bg-[#2a2a35] text-[#e0c9b1] rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#d4b595]"
          disabled={loading}
        />
        <button
          type="submit"
          className={`p-2 rounded-lg ${
            loading || !input.trim()
              ? "bg-[#2a2a35] text-[#e0c9b1]/50"
              : "bg-[#d4b595] text-[#0f0f12] hover:bg-[#e0c9b1] transition-colors"
          }`}
          disabled={loading || !input.trim()}
        >
          <IconSend size={20} />
        </button>
      </form>

      {error && (
        <div className="px-4 py-2 bg-red-500/20 text-red-200 text-sm">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default AIChatInterface;
