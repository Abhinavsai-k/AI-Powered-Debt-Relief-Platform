import React, { useState, useRef, useEffect } from "react";
import { Send, Bot } from "lucide-react";
import { motion } from "framer-motion";

import AnimatedPage from "../components/layout/AnimatedPage";
import ChatMessage from "../components/chat/ChatMessage";
import { sendMessage } from "../services/aiChatService";

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm FinRelief AI. How can I help you with your loans or financial planning today?",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = input;
    setInput("");
    setLoading(true);

    try {
      const response = await sendMessage(currentMessage);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            response.reply ||
            response.message ||
            "No response received.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong while contacting the AI.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <AnimatedPage>
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <h1>🤖 AI Chat Assistant</h1>

        <div
          style={{
            marginTop: 20,
            height: "65vh",
            overflowY: "auto",
            padding: 20,
            borderRadius: 20,
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(255,255,255,.08)",
          }}
        >
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg}
            />
          ))}

          {loading && (
            <motion.div
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "#94a3b8",
              }}
            >
              <Bot size={18} />
              FinRelief AI is typing...
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 20,
          }}
        >
          <input
            type="text"
            value={input}
            placeholder="Ask anything..."
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            style={{
              flex: 1,
              padding: 16,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,.08)",
              background: "rgba(255,255,255,.05)",
              color: "#fff",
              outline: "none",
            }}
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="btn-primary"
            style={{
              width: 60,
            }}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </AnimatedPage>
  );
}