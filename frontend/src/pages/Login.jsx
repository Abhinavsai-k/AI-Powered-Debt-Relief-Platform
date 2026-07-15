import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, AlertCircle, Sparkles } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

import AnimatedPage from "../components/layout/AnimatedPage";
import Spotlight from "../components/effects/Spotlight";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  // ===========================
  // 3D Card Effect
  // ===========================

  const handleMouseMove = (e) => {
    const card = e.currentTarget;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = ((rect.height / 2 - y) / rect.height) * 12;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-4px)
    `;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  // ===========================
  // Login
  // ===========================

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const data = response.data;

      login(data.user, data.access_token);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      console.error(err);

      if (typeof err.response?.data?.detail === "string") {
        setError(err.response.data.detail);
      } else if (Array.isArray(err.response?.data?.detail)) {
        setError(err.response.data.detail[0]?.msg || "Login failed.");
      } else {
        setError("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Spotlight />

      <div
        className="glass-card login-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "460px",
          padding: "40px",
          transition: "transform .15s ease-out",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Logo */}

        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            margin: "0 auto 22px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
           background:
  "linear-gradient(135deg,#7c3aed,#10b981)",

boxShadow:
  "0 15px 40px rgba(16,185,129,.35)",
          }}
        >
          <Sparkles color="white" size={34} />
        </div>

        <h1
          style={{
            textAlign: "center",
            fontSize: "2rem",
            marginBottom: "10px",
          }}
        >
          Welcome to FinRelief AI Pro
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            marginBottom: "30px",
            lineHeight: 1.6,
          }}
        >
          Secure AI-powered Financial Recovery Platform
<br />
<strong>FinRelief AI Pro</strong>
        </p>

        {error && (
          <div
            style={{
              background: "rgba(239,68,68,.12)",
              color: "#ef4444",
              padding: "14px",
              borderRadius: "12px",
              marginBottom: "22px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "18px" }}>
            <label>Email Address</label>

            <input
              className="input-field"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "26px" }}>
            <label>Password</label>

            <input
              className="input-field"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="spinner"
                />
                Logging in...
              </>
            ) : (
              "Access Dashboard"
            )}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "26px",
            color: "var(--text-muted)",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#60a5fa",
              fontWeight: 600,
            }}
          >
            Create Account
          </Link>
        </p>
      </div>
    </AnimatedPage>
  );
}