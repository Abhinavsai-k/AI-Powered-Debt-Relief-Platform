import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  X, LayoutDashboard, CreditCard, Wallet, Bot, MessageCircle,
  Handshake, TrendingUp, History, Settings, LogOut,
} from "lucide-react";

// Add this style to your global CSS or an index.css file
// .custom-scroll::-webkit-scrollbar { width: 6px; }
// .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,.18); border-radius: 10px; }

const menu = [
  { title: "Dashboard", desc: "Overview", path: "/", icon: LayoutDashboard },
  { title: "Loans", desc: "Manage your loans", path: "/loans", icon: CreditCard },
  { title: "Financial Profile", desc: "Income & expenses", path: "/profile", icon: Wallet },
  { title: "AI Negotiation", desc: "AI settlement strategies", path: "/negotiation", icon: Bot, badge: true },
  { title: "AI Chat Assistant", desc: "Talk with FinRelief AI", path: "/ai-chat", icon: MessageCircle },
  { title: "Settlements", desc: "Track settlements", path: "/settlements", icon: Handshake },
  { title: "Analytics", desc: "Financial insights", path: "/analytics", icon: TrendingUp },
  { title: "History", desc: "Recent activity", path: "/history", icon: History },
];

export default function NavigationDrawer({ open, onClose }) {
  const { user, logout } = useAuth();
  const [hovered, setHovered] = useState(-1);
  const [mouse, setMouse] = useState({ x: 160, y: 250 });
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(2,6,23,.55)", backdropFilter: "blur(18px)", zIndex: 9998 }} />
          <motion.aside
            ref={drawerRef}
            initial={{ x: -380 }} animate={{ x: 0 }} exit={{ x: -380 }} transition={{ type: "spring", stiffness: 250, damping: 26 }}
            onMouseMove={(e) => {
              const rect = drawerRef.current.getBoundingClientRect();
              setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
            style={{
              position: "fixed", left: 0, top: 0, bottom: 0, width: "min(340px,90vw)",
              background: "linear-gradient(180deg, rgba(17,25,40,.9), rgba(9,13,24,.9))",
              backdropFilter: "blur(40px)", borderRight: "1px solid rgba(255,255,255,.12)",
              overflow: "hidden", zIndex: 9999, display: "flex", flexDirection: "column"
            }}
          >
            <motion.div animate={{ x: mouse.x - 120, y: mouse.y - 120 }} transition={{ type: "spring", stiffness: 120, damping: 20 }} style={{ position: "absolute", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,.15), transparent 70%)", filter: "blur(40px)", pointerEvents: "none", zIndex: 1 }} />

            <div style={{ padding: 26, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,.08)", zIndex: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: 14, background: "linear-gradient(135deg,#2563eb,#38bdf8)", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 20 }}>💎</div>
                <div><h2 style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>FinRelief AI</h2><p style={{ margin: 0, marginTop: 4, color: "#94a3b8", fontSize: 13 }}>Smart Debt Assistant</p></div>
              </div>
              <button aria-label="Close navigation" onClick={onClose} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}><X size={20} /></button>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ margin: 22, padding: 18, borderRadius: 20, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", zIndex: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#60a5fa)", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff", fontWeight: 700, fontSize: 22 }}>
                  {(user?.name || "User").split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 style={{ margin: 0 }}>{user?.name || "User"}</h3>
                  <p style={{ marginTop: 4, color: "#22c55e", fontSize: 13 }}>● Verified User</p>
                </div>
              </div>
            </motion.div>

            <div className="custom-scroll" style={{ flex: 1, padding: "0 18px", overflowY: "auto", zIndex: 2 }}>
              {menu.map((item, index) => {
                const Icon = item.icon;
                return (
                  <NavLink key={item.title} to={item.path} onClick={onClose} style={{ textDecoration: "none" }}>
                    {({ isActive }) => (
                      <motion.div
                        onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(-1)}
                        whileHover={{ x: 12, scale: 1.04, boxShadow: "0 20px 40px rgba(59,130,246,.25)" }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          position: "relative", display: "flex", alignItems: "center", gap: 16, padding: "15px 18px", marginBottom: 12, borderRadius: 18,
                          background: isActive ? "linear-gradient(135deg,#2563eb,#3b82f6)" : hovered === index ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.03)",
                          border: isActive ? "1px solid rgba(96,165,250,.6)" : "1px solid rgba(255,255,255,.05)",
                          transition: "all .25s ease"
                        }}
                      >
                        {isActive && <motion.div layoutId="activeMenu" style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: 5, borderRadius: 30, background: "linear-gradient(#60a5fa,#38bdf8)" }} />}
                        <div style={{ width: 44, height: 44, borderRadius: 14, display: "flex", justifyContent: "center", alignItems: "center", background: isActive ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.05)" }}>
                          <Icon size={20} color={isActive ? "#fff" : "#cbd5e1"} />
                        </div>
                        {item.badge && <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ position: "absolute", top: 12, right: 12, width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />}
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontWeight: isActive ? 600 : 500, color: "#fff" }}>{item.title}</span>
                          <span style={{ fontSize: 11, color: isActive ? "rgba(255,255,255,.7)" : "#64748b" }}>{item.desc}</span>
                        </div>
                      </motion.div>
                    )}
                  </NavLink>
                );
              })}
            </div>

            <div style={{ padding: 18, borderTop: "1px solid rgba(255,255,255,.08)", zIndex: 2 }}>
              <Link to="/settings" onClick={onClose} style={{ textDecoration: "none" }}>
                <motion.div whileHover={{ x: 8, scale: 1.03 }} whileTap={{ scale: 0.98 }} style={{ display: "flex", alignItems: "center", gap: 15, padding: "14px 18px", borderRadius: 16, color: "#cbd5e1", cursor: "pointer" }}>
                  <Settings size={20} /><span>Settings</span>
                </motion.div>
              </Link>
              <motion.div whileHover={{ x: 8, scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={async () => { await logout(); onClose(); }} style={{ display: "flex", alignItems: "center", gap: 15, padding: "14px 18px", borderRadius: 16, color: "#ef4444", cursor: "pointer" }}>
                <LogOut size={20} /><span>Logout</span>
              </motion.div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}