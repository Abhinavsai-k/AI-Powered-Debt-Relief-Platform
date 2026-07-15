import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedPage from "../components/layout/AnimatedPage";
import api from "../services/api";

import {
  Loader2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Wallet,
  IndianRupee,
  ShieldCheck,
  CircleDollarSign,
  BadgePercent,
  BrainCircuit,
} from "lucide-react";

export default function FinancialEngine() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [analysis, setAnalysis] = useState({
    financial_score: 0,
    risk_level: "Unknown",
    monthly_surplus: 0,
    settlement_probability: 0,
    debt_to_income_ratio: 0,
    expense_ratio: 0,
    savings_ratio: 0,
    recommendations: [],
  });

  useEffect(() => {
    loadAnalysis();
  }, []);

  async function loadAnalysis() {
    try {
      setLoading(true);
      const response = await api.post("/financial-engine/analyze");
      const data = response.data;
      setAnalysis({
        financial_score: data.financial_score ?? 0,
        risk_level: data.risk_level ?? "Unknown",
        monthly_surplus: data.monthly_surplus ?? 0,
        settlement_probability: data.settlement_probability ?? 0,
        debt_to_income_ratio: data.debt_to_income_ratio ?? 0,
        expense_ratio: data.expense_ratio ?? 0,
        savings_ratio: data.savings_ratio ?? 0,
        recommendations: data.recommendations ?? [],
      });
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load Financial Analysis.");
    } finally {
      setLoading(false);
    }
  }

  const cardStyle = {
    padding: 24,
    borderRadius: 24,
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.08)",
    backdropFilter: "blur(20px)",
    position: "relative",
    overflow: "hidden",
  };

  const progressBar = (value, color) => ({
    width: `${Math.min(value, 100)}%`,
    height: "100%",
    borderRadius: 20,
    background: color,
    transition: "1s",
  });

  if (loading) {
    return (
      <AnimatedPage>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
          <Loader2 className="spinner" size={42} color="#3b82f6" />
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 35, flexWrap: "wrap", gap: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "2.3rem", fontWeight: 700 }}>Financial Engine</h1>
          <p style={{ marginTop: 8, color: "var(--text-muted)" }}>AI powered financial health analysis.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
          style={{ width: "auto" }}
          onClick={loadAnalysis}
        >
          Refresh Analysis
        </motion.button>
      </div>

      {error && (
        <div style={{ display: "flex", gap: 10, alignItems: "center", color: "#ef4444", marginBottom: 30 }}>
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 22, marginBottom: 35 }}>
        <motion.div whileHover={{ y: -5 }} style={cardStyle}>
          <ShieldCheck color="#22c55e" size={34} />
          <small style={{ display: "block", marginTop: 18, color: "#94a3b8" }}>Financial Score</small>
          <h1 style={{ marginTop: 10, marginBottom: 0, fontSize: 42 }}>{analysis.financial_score}</h1>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} style={cardStyle}>
          <Wallet color="#3b82f6" size={34} />
          <small style={{ display: "block", marginTop: 18, color: "#94a3b8" }}>Monthly Surplus</small>
          <h2 style={{ marginTop: 10, marginBottom: 0 }}>₹{Number(analysis.monthly_surplus).toLocaleString()}</h2>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} style={cardStyle}>
          <BadgePercent color="#f59e0b" size={34} />
          <small style={{ display: "block", marginTop: 18, color: "#94a3b8" }}>Settlement Chance</small>
          <h2 style={{ marginTop: 10, marginBottom: 0 }}>{analysis.settlement_probability}%</h2>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} style={cardStyle}>
          <BrainCircuit color="#8b5cf6" size={34} />
          <small style={{ display: "block", marginTop: 18, color: "#94a3b8" }}>Risk Level</small>
          <h2 style={{ marginTop: 10, color: analysis.risk_level === "Low" ? "#22c55e" : analysis.risk_level === "Medium" ? "#f59e0b" : "#ef4444" }}>
            {analysis.risk_level}
          </h2>
        </motion.div>
      </div>

      {/* Ratios & Recommendations */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))", gap: 24 }}>
        
        {/* Debt To Income */}
        <motion.div whileHover={{ y: -5 }} style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ margin: 0 }}>Debt to Income Ratio</h2>
            <TrendingDown color="#ef4444" size={28} />
          </div>
          <h1 style={{ marginBottom: 20 }}>{analysis.debt_to_income_ratio}%</h1>
          <div style={{ height: 12, borderRadius: 20, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
            <div style={progressBar(analysis.debt_to_income_ratio, "linear-gradient(90deg,#ef4444,#f97316)")} />
          </div>
          <p style={{ marginTop: 16, color: "#94a3b8" }}>Lower debt-to-income ratios improve loan approval and settlement chances.</p>
        </motion.div>

        {/* Expense Ratio */}
        <motion.div whileHover={{ y: -5 }} style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ margin: 0 }}>Expense Ratio</h2>
            <IndianRupee color="#3b82f6" size={28} />
          </div>
          <h1 style={{ marginBottom: 20 }}>{analysis.expense_ratio}%</h1>
          <div style={{ height: 12, borderRadius: 20, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
            <div style={progressBar(analysis.expense_ratio, "linear-gradient(90deg,#3b82f6,#06b6d4)")} />
          </div>
          <p style={{ marginTop: 16, color: "#94a3b8" }}>A lower expense ratio leaves more room for debt repayment.</p>
        </motion.div>

        {/* Savings Ratio */}
        <motion.div whileHover={{ y: -5 }} style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ margin: 0 }}>Savings Ratio</h2>
            <CircleDollarSign color="#22c55e" size={28} />
          </div>
          <h1 style={{ marginBottom: 20 }}>{analysis.savings_ratio}%</h1>
          <div style={{ height: 12, borderRadius: 20, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
            <div style={progressBar(analysis.savings_ratio, "linear-gradient(90deg,#22c55e,#10b981)")} />
          </div>
          <p style={{ marginTop: 16, color: "#94a3b8" }}>Higher savings improve financial stability and negotiation strength.</p>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div whileHover={{ y: -5 }} style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <BrainCircuit color="#8b5cf6" size={28} />
            <h2 style={{ margin: 0 }}>AI Recommendations</h2>
          </div>
          {analysis.recommendations.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>No recommendations available.</p>
          ) : (
            analysis.recommendations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 18, padding: 16, borderRadius: 16, background: "rgba(255,255,255,.04)" }}
              >
                <ShieldCheck size={18} color="#22c55e" />
                <span>{item}</span>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* Bottom Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: 35, padding: 30, borderRadius: 24, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", backdropFilter: "blur(20px)" }}
      >
        <h2 style={{ marginTop: 0, marginBottom: 25 }}>Financial Summary</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
          <div>
            <small style={{ color: "#94a3b8" }}>Financial Health</small>
            <h3 style={{ color: analysis.financial_score >= 80 ? "#22c55e" : analysis.financial_score >= 60 ? "#f59e0b" : "#ef4444" }}>
              {analysis.financial_score >= 80 ? "Excellent" : analysis.financial_score >= 60 ? "Good" : "Needs Improvement"}
            </h3>
          </div>
          <div>
            <small style={{ color: "#94a3b8" }}>Settlement Readiness</small>
            <h3 style={{ color: "#3b82f6" }}>{analysis.settlement_probability}%</h3>
          </div>
          <div>
            <small style={{ color: "#94a3b8" }}>Monthly Cash Flow</small>
            <h3 style={{ color: analysis.monthly_surplus >= 0 ? "#22c55e" : "#ef4444" }}>₹{Number(analysis.monthly_surplus).toLocaleString()}</h3>
          </div>
          <div>
            <small style={{ color: "#94a3b8" }}>Overall Risk</small>
            <h3 style={{ color: analysis.risk_level === "Low" ? "#22c55e" : analysis.risk_level === "Medium" ? "#f59e0b" : "#ef4444" }}>{analysis.risk_level}</h3>
          </div>
        </div>
      </motion.div>
    </AnimatedPage>
  );
}