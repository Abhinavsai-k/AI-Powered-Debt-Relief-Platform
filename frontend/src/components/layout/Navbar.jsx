import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/navbar.css";

import {
  Menu,
  Search,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth();

  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <header
      className="navbar glass-panel hover-lift"
      style={{
        position: "relative",
      }}
    >
      {/* Left Side */}

      <div
        className="navbar-left"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <button
          className="icon-btn"
          onClick={toggleSidebar}
          aria-label="Open Sidebar"
        >
          <Menu size={22} />
        </button>

        <h2 className="logo">
          💰 FinRelief AI
        </h2>
      </div>

      {/* Search */}

      <div className="navbar-center">
        <div className="search-box">
          <Search
            size={18}
            className="search-icon"
          />

          <input
            type="text"
            placeholder="Search loans, settlements..."
          />
        </div>
      </div>

      {/* Right Side */}

      <div className="navbar-right">
                <div
          ref={profileRef}
          style={{
            position: "relative",
          }}
        >
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="profile"
            onClick={() =>
              setShowProfile(!showProfile)
            }
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
              padding: "8px 14px",
              borderRadius: 16,
            }}
          >
            <div className="avatar">
              {(user?.name || "U")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="profile-info">
              <h4>
                {user?.name || "User"}
              </h4>

              <p>
                {user?.email || ""}
              </p>
            </div>

            <ChevronDown
              size={18}
              className={
                showProfile
                  ? "rotate-icon"
                  : ""
              }
            />
          </motion.div>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.96,
                }}
                transition={{
                  duration: 0.2,
                }}
                style={{
                  position: "absolute",
                  top: "110%",
                  right: 0,
                  width: 310,
                  background: "#111827",
                  border:
                    "1px solid rgba(255,255,255,.08)",
                  borderRadius: 18,
                  overflow: "hidden",
                  boxShadow:
                    "0 20px 45px rgba(0,0,0,.35)",
                  zIndex: 9999,
                  backdropFilter: "blur(20px)",
                }}
              >
                              {/* User Info */}

                <div
                  style={{
                    padding: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    className="avatar"
                    style={{
                      width: 52,
                      height: 52,
                      fontSize: 20,
                    }}
                  >
                    {(user?.name || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <h4
                      style={{
                        margin: 0,
                        fontSize: 16,
                      }}
                    >
                      {user?.name || "User"}
                    </h4>

                    <p
                      style={{
                        margin: "4px 0 0",
                        color: "#94a3b8",
                        fontSize: 13,
                      }}
                    >
                      {user?.email || ""}
                    </p>
                  </div>
                </div>

                <div className="profile-divider" />

                {/* Logout */}

                <button
                  className="profile-menu-item logout-btn"
                  onClick={() => {
                    setShowProfile(false);
                    logout();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    width: "100%",
                    padding: "16px 20px",
                    border: "none",
                    background: "transparent",
                    color: "#ef4444",
                    cursor: "pointer",
                    fontSize: 15,
                    fontWeight: 600,
                    transition: "all .2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(239,68,68,.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "transparent";
                  }}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
                  </div>
      </div>
    </header>
  );
}

export default Navbar;