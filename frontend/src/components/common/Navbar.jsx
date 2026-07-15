import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
      }}
    >
      <motion.div
        className="logo"
        whileHover={{
          scale: 1.08,
          rotate: -2,
        }}
        onClick={() => navigate("/dashboard")}
      >
        🤖 FinRelief AI
      </motion.div>

      <div className="nav-links">

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: .95 }}
          className="nav-btn"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: .95 }}
          className="nav-btn"
          onClick={() => navigate("/loans")}
        >
          Loans
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: .95 }}
          className="nav-btn"
          onClick={() => navigate("/financial-profile")}
        >
          Profile
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: .95 }}
          className="nav-btn"
          onClick={() => navigate("/settlement")}
        >
          Settlement
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: .95 }}
          className="nav-btn"
          onClick={() => navigate("/negotiation")}
        >
          AI
        </motion.button>

      </div>

      <div className="nav-actions">

        <motion.div
          className="user-chip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .6 }}
        >
          👤 {user?.name}
        </motion.div>

        <motion.button
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: .95,
          }}
          className="nav-btn"
          onClick={() => navigate("/register")}
        >
          ➕ Register
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: .95,
          }}
          className="nav-btn logout-btn"
          onClick={handleLogout}
        >
          🚪 Logout
        </motion.button>

      </div>

    </motion.nav>
  );
}

export default Navbar;