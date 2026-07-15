import { useState, useEffect } from "react";

function SettlementForm({
  onSubmit,
  editingSettlement,
  onCancel,
}) {
  const [form, setForm] = useState({
    loan_id: "",
    settlement_percentage: "",
    predicted_amount: "",
    eligibility: "Eligible",
    status: "Pending",
  });

  useEffect(() => {
    if (editingSettlement) {
      setForm(editingSettlement);
    } else {
      setForm({
        loan_id: "",
        settlement_percentage: "",
        predicted_amount: "",
        eligibility: "Eligible",
        status: "Pending",
      });
    }
  }, [editingSettlement]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "15px",
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "30px",
      }}
    >
      <input
        type="number"
        name="loan_id"
        placeholder="Loan ID"
        value={form.loan_id}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="settlement_percentage"
        placeholder="Settlement %"
        value={form.settlement_percentage}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="predicted_amount"
        placeholder="Predicted Amount"
        value={form.predicted_amount}
        onChange={handleChange}
        required
      />

      <select
        name="eligibility"
        value={form.eligibility}
        onChange={handleChange}
      >
        <option value="Eligible">Eligible</option>
        <option value="Not Eligible">Not Eligible</option>
      </select>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
        <option value="Completed">Completed</option>
      </select>

      <button
        type="submit"
        style={{
          gridColumn: "span 2",
          padding: "12px",
          background: "#2563EB",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {editingSettlement ? "Update Settlement" : "Add Settlement"}
      </button>

      {editingSettlement && (
        <button
          type="button"
          onClick={onCancel}
          style={{
            gridColumn: "span 2",
            padding: "12px",
            background: "#6B7280",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default SettlementForm;