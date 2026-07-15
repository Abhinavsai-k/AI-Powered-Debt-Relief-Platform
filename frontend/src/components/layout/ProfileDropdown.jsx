import { motion } from "framer-motion";
import {
  User,
  Wallet,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const menu = [
  {
    icon: <User size={18} />,
    title: "My Profile",
    subtitle: "View personal information",
  },
  {
    icon: <Wallet size={18} />,
    title: "Financial Profile",
    subtitle: "Income, expenses & loans",
  },
  {
    icon: <Settings size={18} />,
    title: "Settings",
    subtitle: "Preferences & security",
  },
  {
    icon: <LogOut size={18} />,
    title: "Logout",
    subtitle: "Sign out from account",
  },
];

export default function ProfileDropdown() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10,
        scale: .95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: .25,
      }}
      style={{
        position: "fixed",
        top: "82px",
        right: "25px",
        width: "340px",

        background: "#111827",

        borderRadius: "20px",

        border: "1px solid rgba(255,255,255,.08)",

        boxShadow:
          "0 30px 60px rgba(0,0,0,.55)",

        overflow: "hidden",

        zIndex: 99999,
      }}
    >
      <div
        style={{
          padding: "24px",
          borderBottom:
            "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg,#2563eb,#38bdf8)",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              color: "#fff",

              fontWeight: 700,

              fontSize: "22px",
            }}
          >
            A
          </div>

          <div>
            <h3
              style={{
                margin: 0,
              }}
            >
              Abhinav Sai
            </h3>

            <p
              style={{
                marginTop: 6,
                color: "#94a3b8",
              }}
            >
              Premium Member
            </p>
          </div>
        </div>
      </div>

      {menu.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            padding: "18px 24px",

            cursor: "pointer",

            borderBottom:
              index !== menu.length - 1
                ? "1px solid rgba(255,255,255,.05)"
                : "none",

            transition: ".25s",
          }}
          onMouseEnter={(e)=>{
            e.currentTarget.style.background="rgba(255,255,255,.04)";
          }}
          onMouseLeave={(e)=>{
            e.currentTarget.style.background="transparent";
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "14px",
            }}
          >
            {item.icon}

            <div>
              <strong>{item.title}</strong>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#94a3b8",
                  fontSize: "13px",
                }}
              >
                {item.subtitle}
              </p>
            </div>
          </div>

          <ChevronRight size={18} />
        </div>
      ))}
    </motion.div>
  );
}