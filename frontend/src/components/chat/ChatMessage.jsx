import React from "react";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isUser ? "row-reverse" : "row",
          alignItems: "flex-start",
          gap: 12,
          maxWidth: "80%",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: isUser
              ? "linear-gradient(135deg,#2563eb,#3b82f6)"
              : "linear-gradient(135deg,#10b981,#22c55e)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {isUser ? <User size={20} /> : <Bot size={20} />}
        </div>

        {/* Message Bubble */}
        <div
          style={{
            background: isUser
              ? "linear-gradient(135deg,#2563eb,#3b82f6)"
              : "rgba(255,255,255,.06)",
            border: "1px solid rgba(255,255,255,.08)",
            color: "#fff",
            padding: "14px 18px",
            borderRadius: 18,
            lineHeight: 1.6,
            wordBreak: "break-word",
          }}
        >
          {message.content}

          <div
            style={{
              marginTop: 8,
              fontSize: 11,
              opacity: 0.65,
              textAlign: "right",
            }}
          >
            {message.time}
          </div>
        </div>
      </div>
    </motion.div>
  );
}