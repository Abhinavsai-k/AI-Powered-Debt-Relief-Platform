import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

import { getSettlements } from "../services/settlementService";
import { generateLetter } from "../services/NegotiationService";
import PageHeader from "../components/common/PageHeader";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";

import "../styles/settlement.css";

export default function Settlement() {
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({});

  const [settlements, setSettlements] = useState([]);

  // AI Letter
  const [showLetter, setShowLetter] = useState(false);
  const [letter, setLetter] = useState("");
  const [loadingLetter, setLoadingLetter] = useState(false);

  useEffect(() => {
    loadSettlements();
  }, []);

  async function loadSettlements() {
    try {
      setLoading(true);

      const response = await getSettlements();

      console.log("========== SETTLEMENT RESPONSE ==========");
      console.log(response);
      console.log(
        "Settlement Analysis:",
        response.settlement_analysis
      );

      if (response.success) {
        setSummary(response);
        setSettlements(
          response.settlement_analysis || []
        );
      } else {
        setSummary({});
        setSettlements([]);
      }
    } catch (error) {
      console.error("Settlement Error:", error);

      toast.error(
        "Unable to load settlement prediction."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // Generate AI Settlement Letter
  // ==========================================

  async function handleGenerateLetter(loan) {
  try {
    setLoadingLetter(true);

    const response = await generateLetter(
      loan.lender
    );

    console.log("Letter Response:", response);

    setLetter(
      response.letter ||
      response.settlement_letter ||
      response.ai_letter ||
      response.content ||
      response.message ||
      JSON.stringify(response, null, 2)
    );

    setShowLetter(true);
  } catch (error) {
    console.error(error);

    toast.error("Unable to generate settlement letter.");
  } finally {
    setLoadingLetter(false);
  }
}

  if (loading) {
    return (
      <LoadingSpinner text="Loading Settlement Prediction..." />
    );
  }

  console.log(
    "Rendering settlements:",
    settlements
  );

  return (
    <div className="settlement-page">
      <PageHeader
        title="AI Settlement Prediction"
        subtitle="AI-generated settlement recommendations."
      />

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
          <h4>Total Loans</h4>

          <h2>
            {summary.total_loans || 0}
          </h2>
        </div>

        <div className="glass-card">
          <h4>Total Outstanding</h4>

          <h2>
            ₹{summary.total_outstanding || 0}
          </h2>
        </div>

        <div className="glass-card">
          <h4>
            Recommended Settlement
          </h4>

          <h2>
            ₹
            {summary.recommended_settlement_total ||
              0}
          </h2>
        </div>

        <div className="glass-card">
          <h4>
            Estimated Savings
          </h4>

          <h2
            style={{
              color: "#22c55e",
            }}
          >
            ₹
            {summary.estimated_savings ||
              0}
          </h2>
        </div>
      </div>

      <div className="settlement-table-container">
        <table className="settlement-table">
          <thead>
            <tr>
              <th>Loan Type</th>
              <th>Lender</th>
              <th>Balance</th>
              <th>Interest</th>
              <th>Overdue</th>
              <th>Settlement %</th>
              <th>AI Amount</th>
              <th>Risk</th>
              <th>Priority</th>
              <th>Eligibility</th>
              <th>Recommendation</th>
              <th>Letter</th>
            </tr>
          </thead>

          <tbody>
            {settlements.length > 0 ? (
              settlements.map((loan) => (
                <tr key={loan.loan_id}>
                  <td>{loan.loan_type}</td>

                  <td>{loan.lender}</td>

                  <td>
                    ₹
                    {loan.remaining_balance}
                  </td>

                  <td>
                    {loan.interest_rate}%
                  </td>

                  <td>
                    {loan.overdue_months}
                  </td>

                  <td>
                    {
                      loan.settlement_percentage
                    }
                    %
                  </td>

                  <td>
                    ₹
                    {
                      loan.recommended_amount
                    }
                  </td>

                  <td>
                    {loan.risk_category}
                  </td>

                  <td>{loan.priority}</td>

                  <td>
                    {loan.eligibility}
                  </td>

                  <td>
                    {loan.recommendation}
                  </td>

                  <td>
                    <button
                      className="btn-primary"
                      disabled={
                        loadingLetter
                      }
                      onClick={() =>
                        handleGenerateLetter(
                          loan
                        )
                      }
                    >
                      {loadingLetter
                        ? "Generating..."
                        : "Generate"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12">
                  <EmptyState
                    title="No Settlement Predictions"
                    description="No settlement recommendations found."
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
            {/* AI Settlement Letter Modal */}

      <AnimatePresence>
        {showLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLetter(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.65)",
              backdropFilter: "blur(8px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "900px",
                maxWidth: "95%",
                maxHeight: "90vh",
                overflowY: "auto",
                background: "#111827",
                borderRadius: 20,
                padding: 30,
                border:
                  "1px solid rgba(255,255,255,.08)",
                boxShadow:
                  "0 20px 50px rgba(0,0,0,.4)",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: 20,
                }}
              >
                AI Settlement Letter
              </h2>

              <textarea
                readOnly
                value={letter}
                rows={18}
                style={{
                  width: "100%",
                  padding: 18,
                  background: "#0f172a",
                  color: "#fff",
                  border:
                    "1px solid rgba(255,255,255,.1)",
                  borderRadius: 12,
                  resize: "vertical",
                  fontSize: 14,
                  lineHeight: 1.6,
                  fontFamily:
                    "Consolas, monospace",
                  boxSizing: "border-box",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 15,
                  marginTop: 25,
                }}
              >
                <button
                  className="btn-primary"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      letter
                    );
                    toast.success(
                      "Letter copied."
                    );
                  }}
                >
                  Copy
                </button>

                <button
                  className="btn-primary"
                  onClick={() => {
                    const blob = new Blob(
                      [letter],
                      {
                        type: "text/plain",
                      }
                    );

                    const url =
                      window.URL.createObjectURL(
                        blob
                      );

                    const a =
                      document.createElement("a");

                    a.href = url;
                    a.download =
                      "AI_Settlement_Letter.txt";

                    document.body.appendChild(
                      a
                    );

                    a.click();

                    a.remove();

                    window.URL.revokeObjectURL(
                      url
                    );

                    toast.success(
                      "Letter downloaded."
                    );
                  }}
                >
                  Download
                </button>

                <button
                  className="btn-primary"
                  onClick={() =>
                    window.print()
                  }
                >
                  Print
                </button>

                <button
                  className="btn-primary"
                  onClick={() =>
                    setShowLetter(false)
                  }
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}