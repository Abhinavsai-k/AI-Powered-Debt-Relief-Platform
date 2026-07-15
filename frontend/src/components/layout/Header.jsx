import { LogOut, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();

  // Get the latest logged-in user from AuthContext
  const { user } = useAuth();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <header
      style={{
        height: "75px",
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 35px",
        boxShadow: "0 2px 12px rgba(0,0,0,.08)",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: "#2563EB",
          }}
        >
          FinRelief AI
        </h2>

        <small
          style={{
            color: "#64748B",
          }}
        >
          AI Powered Debt Recovery Platform
        </small>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "22px",
        }}
      >
      
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <UserCircle size={32} />

          <div>
            <strong>
              {user?.name || "Welcome Back"}
            </strong>

            <br />

            <small>
              {user?.email || ""}
            </small>
          </div>
        </div>

        <button
          onClick={logout}
          style={{
            background: "#EF4444",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;