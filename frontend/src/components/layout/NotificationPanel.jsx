import { motion } from "framer-motion";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";

const notifications = [
  {
    icon: <AlertTriangle size={18} color="#f59e0b" />,
    title: "EMI Due Soon",
    message: "Your HDFC loan EMI is due in 3 days.",
    time: "3 mins ago",
  },
  {
    icon: <CheckCircle size={18} color="#22c55e" />,
    title: "Credit Score Improved",
    message: "Your credit score increased to 780.",
    time: "Today",
  },
  {
    icon: <Bell size={18} color="#3b82f6" />,
    title: "AI Recommendation",
    message: "New settlement strategy is available.",
    time: "Yesterday",
  },
  {
    icon: <Clock size={18} color="#8b5cf6" />,
    title: "Profile Reminder",
    message: "Update your financial profile this month.",
    time: "2 days ago",
  },
];

export default function NotificationPanel() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -15,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -10,
      }}
      transition={{
        duration: 0.25,
      }}
      style={{
        position: "fixed",
        top: "82px",
        right: "25px",

        width: "380px",
        maxHeight: "500px",

        overflowY: "auto",

        background: "#111827",

        border: "1px solid rgba(255,255,255,.08)",

        borderRadius: "20px",

        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",

        boxShadow:
          "0 25px 60px rgba(0,0,0,.55)",

        padding: "22px",

        zIndex: 99999,
      }}
    >
      {/* Arrow */}

      <div
        style={{
          position: "absolute",
          top: "-8px",
          right: "42px",

          width: "16px",
          height: "16px",

          background: "#111827",

          transform: "rotate(45deg)",

          borderLeft:
            "1px solid rgba(255,255,255,.08)",

          borderTop:
            "1px solid rgba(255,255,255,.08)",
        }}
      />

      <h2
        style={{
          marginTop: 0,
          marginBottom: "20px",
          fontSize: "22px",
        }}
      >
        🔔 Notifications
      </h2>

      {notifications.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{
            x: 5,
          }}
          style={{
            display: "flex",
            gap: "14px",

            padding: "16px",

            borderRadius: "14px",

            marginBottom: "12px",

            background:
              "rgba(255,255,255,.03)",

            border:
              "1px solid rgba(255,255,255,.05)",

            transition: ".3s",
          }}
        >
          <div
            style={{
              marginTop: "4px",
            }}
          >
            {item.icon}
          </div>

          <div
            style={{
              flex: 1,
            }}
          >
            <h4
              style={{
                margin: 0,
                fontSize: "16px",
              }}
            >
              {item.title}
            </h4>

            <p
              style={{
                margin: "6px 0",
                color: "#94a3b8",
                lineHeight: 1.5,
                fontSize: "14px",
              }}
            >
              {item.message}
            </p>

            <small
              style={{
                color: "#64748b",
              }}
            >
              {item.time}
            </small>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}