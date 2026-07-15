import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Loader2,
  FileText,
  Shield,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import api from "../services/api";

export default function Negotiation() {
  const [strategy, setStrategy] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateStrategy = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.post("/ai-negotiation/generate");

      setStrategy(response.data);
    } catch (error) {
      console.error(error);

      alert("Unable to generate AI strategy.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="negotiation-container padding-20"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="glass-card">

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <Bot size={34} color="#3b82f6" />

          <div>
            <h2 style={{ margin: 0 }}>
              AI Debt Negotiation
            </h2>

            <p
              style={{
                color: "gray",
                marginTop: 6,
              }}
            >
              Personalized AI strategy for faster debt settlement.
            </p>
          </div>
        </div>

        <button
          className="btn-primary"
          onClick={handleGenerateStrategy}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2
                className="spinner"
                size={18}
              />
              &nbsp;Generating...
            </>
          ) : (
            "Generate AI Strategy"
          )}
        </button>

        {strategy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginTop: 30 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(220px,1fr))",
                gap: 20,
                marginBottom: 30,
              }}
            >
              <div className="glass-card">
                <TrendingUp
                  color="#22c55e"
                  size={30}
                />

                <h4>Financial Status</h4>

                <strong>
                  Needs Improvement
                </strong>
              </div>

              <div className="glass-card">
                <Shield
                  color="#f59e0b"
                  size={30}
                />

                <h4>Negotiation Priority</h4>

                <strong>High</strong>
              </div>

              <div className="glass-card">
                <CheckCircle
                  color="#3b82f6"
                  size={30}
                />

                <h4>Recommended Action</h4>

                <strong>
                  Start Negotiation
                </strong>
              </div>
            </div>

            <div className="glass-card">

              <h3
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <FileText size={24} />

                AI Recommendation
              </h3>

              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  fontFamily: "inherit",
                  lineHeight: 1.8,
                  marginTop: 20,
                }}
              >
                {strategy.strategy}
              </pre>

            </div>

          </motion.div>
        )}
      </div>
    </motion.div>
  );
}