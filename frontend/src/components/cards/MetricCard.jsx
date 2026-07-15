import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function MetricCard({
  title,
  value,
  icon: Icon,
  trend = "+0%",
}) {
  return (
    <motion.div
      className="glass-card"
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 18,
      }}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "24px",
        minHeight: "170px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: "rgba(59,130,246,.12)",
          right: -60,
          top: -60,
          filter: "blur(20px)",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "14px",
              letterSpacing: ".5px",
            }}
          >
            {title}
          </p>

          <h2
            style={{
              marginTop: 12,
              marginBottom: 0,
              fontSize: "2rem",
              fontWeight: 700,
            }}
          >
            {value}
          </h2>
        </div>

        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background:
              "linear-gradient(135deg,#2563eb,#3b82f6)",
            color: "#fff",
            boxShadow:
              "0 10px 30px rgba(37,99,235,.35)",
          }}
        >
          {Icon && <Icon size={24} />}
        </div>
      </div>

      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <span
          style={{
            color: "#22c55e",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <ArrowUpRight size={16} />
          {trend}
        </span>

        <span
          style={{
            color: "var(--text-muted)",
            fontSize: "13px",
          }}
        >
          Updated today
        </span>
      </div>
    </motion.div>
  );
}