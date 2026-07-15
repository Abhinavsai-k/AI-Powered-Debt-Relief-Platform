import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedPage from "../components/layout/AnimatedPage";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import {
  Loader2,
  Plus,
  Search,
  Pencil,
  Trash2,
  AlertCircle,
  CreditCard,
  Landmark,
  Wallet,
  DollarSign,
  TrendingUp,
} from "lucide-react";

export default function Loans() {
  const { user } = useAuth(); // ⭐ Grabbing the real user!
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingLoan, setEditingLoan] = useState(null);

  // Added tenure
  const [formData, setFormData] = useState({
    lender: "",
    loan_type: "",
    amount: "",
    remaining_balance: "",
    interest_rate: "",
    emi: "",
    tenure: "", 
  });

  useEffect(() => {
    fetchLoans();
  }, []);

  async function fetchLoans() {
    try {
      const response = await api.get("/loans/");
      setLoans(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load loans.");
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setEditingLoan(null);
    setFormData({
      lender: "",
      loan_type: "",
      amount: "",
      remaining_balance: "",
      interest_rate: "",
      emi: "",
      tenure: "",
    });
    setShowModal(true);
  }

  function openEditModal(loan) {
    setEditingLoan(loan);
    setFormData({
      lender: loan.lender,
      loan_type: loan.loan_type,
      amount: loan.amount,
      remaining_balance: loan.remaining_balance,
      interest_rate: loan.interest_rate || "",
      emi: loan.emi || "",
      tenure: loan.tenure || "",
    });
    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    // ⭐ Strict Type Casting & Dynamic User ID
    const payload = {
      ...formData,
      user_id: user?.id || 1, 
      amount: Number(formData.amount),
      remaining_balance: Number(formData.remaining_balance),
      interest_rate: Number(formData.interest_rate),
      emi: Number(formData.emi),
      tenure: Number(formData.tenure),
    };

    try {
      if (editingLoan) {
        await api.put(`/loans/${editingLoan.id}`, payload);
      } else {
        await api.post("/loans/", payload);
      }
      setShowModal(false);
      fetchLoans();
    } catch (err) {
      console.error(err);
      alert("Unable to save loan.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this loan?")) return;

    try {
      await api.delete(`/loans/${id}`);
      setLoans(loans.filter((loan) => loan.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  }

  const filteredLoans = useMemo(() => {
    return loans.filter((loan) => {
      const value = search.toLowerCase();
      return (
        loan.lender?.toLowerCase().includes(value) ||
        loan.loan_type?.toLowerCase().includes(value)
      );
    });
  }, [search, loans]);

  const totalLoan = loans.reduce((sum, loan) => sum + Number(loan.amount), 0);
  const totalRemaining = loans.reduce((sum, loan) => sum + Number(loan.remaining_balance), 0);
  const totalEMI = loans.reduce((sum, loan) => sum + Number(loan.emi || 0), 0);

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.1)",
    color: "#fff",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
  };

  return (
    <AnimatedPage>
      {/* ================= HEADER ================= */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30, flexWrap: "wrap", gap: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "2.3rem", fontWeight: 700 }}>My Loans</h1>
          <p style={{ marginTop: 8, color: "var(--text-muted)" }}>Manage all your active loans in one place.</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
          style={{ width: "auto", display: "flex", gap: 10, alignItems: "center" }}
          onClick={openAddModal}
        >
          <Plus size={18} />
          Add Loan
        </motion.button>
      </div>

      {/* ================= STATISTICS ================= */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 22, marginBottom: 30 }}>
        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <small>Total Loans</small>
              <h2 style={{ marginTop: 10 }}>{loans.length}</h2>
            </div>
            <CreditCard color="#3b82f6" size={34} />
          </div>
        </div>

        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <small>Total Borrowed</small>
              <h2 style={{ marginTop: 10 }}>₹{totalLoan.toLocaleString()}</h2>
            </div>
            <Landmark color="#22c55e" size={34} />
          </div>
        </div>

        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <small>Remaining</small>
              <h2 style={{ marginTop: 10 }}>₹{totalRemaining.toLocaleString()}</h2>
            </div>
            <Wallet color="#f59e0b" size={34} />
          </div>
        </div>

        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <small>Total EMI</small>
              <h2 style={{ marginTop: 10 }}>₹{totalEMI.toLocaleString()}</h2>
            </div>
            <TrendingUp color="#8b5cf6" size={34} />
          </div>
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="glass-card" style={{ marginBottom: 30, display: "flex", alignItems: "center", gap: 14 }}>
        <Search color="#94a3b8" size={20} />
        <input
          type="text"
          placeholder="Search lender or loan type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 16 }}
        />
      </div>

      {error && (
        <div style={{ marginBottom: 25, display: "flex", alignItems: "center", gap: 10, color: "#ef4444" }}>
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* ================= LOANS LIST ================= */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 80 }}>
          <Loader2 className="spinner" size={40} color="#3b82f6" />
        </div>
      ) : filteredLoans.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: 70, textAlign: "center" }}>
          <AlertCircle size={55} color="#64748b" />
          <h2 style={{ marginTop: 20 }}>No Loans Found</h2>
          <p style={{ color: "var(--text-muted)", marginTop: 12, marginBottom: 30 }}>
            Click the button above to add your first loan.
          </p>
          <button className="btn-primary" style={{ width: "auto" }} onClick={openAddModal}>
            <Plus size={18} />
            Add Loan
          </button>
        </motion.div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 24 }}>
          {filteredLoans.map((loan) => {
            const percent = loan.amount > 0 ? (((loan.amount - loan.remaining_balance) / loan.amount) * 100).toFixed(0) : 0;

            return (
              <motion.div
                key={loan.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                className="glass-card"
                style={{ position: "relative", overflow: "hidden" }}
              >
                {/* Glow */}
                <div style={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", background: "rgba(59,130,246,.12)", top: -70, right: -70, filter: "blur(35px)" }} />

                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, position: "relative" }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 22 }}>{loan.lender}</h2>
                    <p style={{ marginTop: 5, color: "var(--text-muted)" }}>{loan.loan_type}</p>
                  </div>
                  <DollarSign color="#22c55e" size={32} />
                </div>

                {/* Details */}
                <div style={{ display: "grid", gap: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Total Amount</span>
                    <strong>₹{Number(loan.amount).toLocaleString()}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Remaining</span>
                    <strong style={{ color: "#3b82f6" }}>₹{Number(loan.remaining_balance).toLocaleString()}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Interest</span>
                    <strong>{loan.interest_rate || 0}%</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>EMI</span>
                    <strong>₹{Number(loan.emi || 0).toLocaleString()}</strong>
                  </div>
                  {/* Added Tenure Display to the card for completeness */}
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Tenure</span>
                    <strong>{loan.tenure ? `${loan.tenure} Months` : "---"}</strong>
                  </div>
                </div>

                {/* Progress */}
                <div style={{ marginTop: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <small>Repayment</small>
                    <small>{percent}%</small>
                  </div>
                  <div style={{ width: "100%", height: 10, borderRadius: 50, background: "rgba(255,255,255,.08)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 1 }}
                      style={{ height: "100%", borderRadius: 50, background: "linear-gradient(90deg,#22c55e,#3b82f6)" }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 28 }}>
                  <button onClick={() => openEditModal(loan)} className="btn-primary" style={{ width: "auto" }}>
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(loan.id)}
                    style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 12, padding: "10px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ================= ADD / EDIT MODAL ================= */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", backdropFilter: "blur(8px)", zIndex: 9998 }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-45%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-45%" }}
              transition={{ type: "spring", stiffness: 250, damping: 22 }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                width: "520px",
                maxWidth: "92vw",
                maxHeight: "90vh",
                overflowY: "auto",
                padding: "30px",
                background: "#0f172a",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: "22px",
                boxShadow: "0 25px 80px rgba(0,0,0,.45)",
                zIndex: 9999,
              }}
            >
              <h2 style={{ marginTop: 0, marginBottom: 25 }}>
                {editingLoan ? "Edit Loan" : "Add New Loan"}
              </h2>

              <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontSize: 13, color: "var(--text-muted)" }}>Lender Name</label>
                  <input
                    type="text"
                    placeholder="e.g. HDFC Bank"
                    value={formData.lender}
                    onChange={(e) => setFormData({ ...formData, lender: e.target.value })}
                    required
                    style={inputStyle}
                  />
                </div>
                
                <div>
                  <label style={{ display: "block", marginBottom: 6, fontSize: 13, color: "var(--text-muted)" }}>Loan Type</label>
                  <input
                    type="text"
                    placeholder="e.g. Personal Loan"
                    value={formData.loan_type}
                    onChange={(e) => setFormData({ ...formData, loan_type: e.target.value })}
                    required
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                  <div>
                    <label style={{ display: "block", marginBottom: 6, fontSize: 13, color: "var(--text-muted)" }}>Total Amount</label>
                    <input
                      type="number"
                      placeholder="₹"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      required
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: 6, fontSize: 13, color: "var(--text-muted)" }}>Remaining Balance</label>
                    <input
                      type="number"
                      placeholder="₹"
                      value={formData.remaining_balance}
                      onChange={(e) => setFormData({ ...formData, remaining_balance: e.target.value })}
                      required
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Added 3-column grid for Interest, EMI, and Tenure */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
                  <div>
                    <label style={{ display: "block", marginBottom: 6, fontSize: 13, color: "var(--text-muted)" }}>Rate (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="%"
                      value={formData.interest_rate}
                      onChange={(e) => setFormData({ ...formData, interest_rate: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: 6, fontSize: 13, color: "var(--text-muted)" }}>EMI</label>
                    <input
                      type="number"
                      placeholder="₹"
                      value={formData.emi}
                      onChange={(e) => setFormData({ ...formData, emi: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: 6, fontSize: 13, color: "var(--text-muted)" }}>Tenure (Mo)</label>
                    <input
                      type="number"
                      placeholder="60"
                      value={formData.tenure}
                      onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                      required
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 12 }}>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{ background: "#334155", color: "#fff", border: "none", borderRadius: 12, padding: "12px 20px", cursor: "pointer", fontWeight: 500 }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" style={{ width: "auto" }}>
                    {editingLoan ? "Update Loan" : "Add Loan"}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AnimatedPage>
  );
}