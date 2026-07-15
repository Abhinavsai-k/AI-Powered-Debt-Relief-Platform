import { useState, useEffect } from "react";

function FinancialProfileForm({
  onSubmit,
  editingProfile,
  onCancel,
}) {
  const [form, setForm] = useState({
    user_id: "",
    monthly_income: "",
    monthly_expenses: "",
    savings: "",
    employment_type: "",
    credit_score: "",
    dependents: "",
  });

  useEffect(() => {
    if (editingProfile) {
      setForm(editingProfile);
    } else {
      setForm({
        user_id: "",
        monthly_income: "",
        monthly_expenses: "",
        savings: "",
        employment_type: "",
        credit_score: "",
        dependents: "",
      });
    }
  }, [editingProfile]);

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
        name="user_id"
        placeholder="User ID"
        value={form.user_id}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="monthly_income"
        placeholder="Monthly Income"
        value={form.monthly_income}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="monthly_expenses"
        placeholder="Monthly Expenses"
        value={form.monthly_expenses}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="savings"
        placeholder="Savings"
        value={form.savings}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="employment_type"
        placeholder="Employment Type"
        value={form.employment_type}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="credit_score"
        placeholder="Credit Score"
        value={form.credit_score}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="dependents"
        placeholder="Dependents"
        value={form.dependents}
        onChange={handleChange}
        required
      />

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
        {editingProfile ? "Update Profile" : "Add Profile"}
      </button>

      {editingProfile && (
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

export default FinancialProfileForm;