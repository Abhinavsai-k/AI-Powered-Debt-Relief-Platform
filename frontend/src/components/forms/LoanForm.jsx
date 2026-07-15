import { useState, useEffect } from "react";

import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";

import {
  getCurrentUserName,
} from "../../utils/auth";

function LoanForm({ onSubmit, editingLoan, onCancel }) {
  const [form, setForm] = useState({
    loan_type: "",
    lender: "",
    amount: "",
    interest_rate: "",
    tenure: "",
    emi: "",
    overdue_months: 0,
    remaining_balance: "",
    status: "Active",
  });

  useEffect(() => {
    if (editingLoan) {
      setForm({
        loan_type: editingLoan.loan_type,
        lender: editingLoan.lender,
        amount: editingLoan.amount,
        interest_rate: editingLoan.interest_rate,
        tenure: editingLoan.tenure,
        emi: editingLoan.emi,
        overdue_months: editingLoan.overdue_months,
        remaining_balance: editingLoan.remaining_balance,
        status: editingLoan.status,
      });
    } else {
      setForm({
        loan_type: "",
        lender: "",
        amount: "",
        interest_rate: "",
        tenure: "",
        emi: "",
        overdue_months: 0,
        remaining_balance: "",
        status: "Active",
      });
    }
  }, [editingLoan]);

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
    <Card>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "18px",
        }}
      >
        <div
          style={{
            gridColumn: "span 2",
            background: "#EFF6FF",
            padding: "12px",
            borderRadius: "10px",
            fontWeight: "600",
            color: "#2563EB",
          }}
        >
          👤 Logged in as: {getCurrentUserName()}
        </div>

        <div>
          <label>Loan Type</label>

          <select
            name="loan_type"
            value={form.loan_type}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              marginTop: "8px",
            }}
            required
          >
            <option value="">Select Loan Type</option>
            <option value="Personal">Personal</option>
            <option value="Home">Home</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Education">Education</option>
            <option value="Credit Card">Credit Card</option>
          </select>
        </div>

        <Input
          label="Lender"
          name="lender"
          value={form.lender}
          onChange={handleChange}
          placeholder="Enter Lender Name"
          required
        />

        <Input
          label="Loan Amount"
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Loan Amount"
          required
        />

        <Input
          label="Interest Rate (%)"
          type="number"
          name="interest_rate"
          value={form.interest_rate}
          onChange={handleChange}
          placeholder="Interest Rate"
          required
        />

        <Input
          label="Tenure (Months)"
          type="number"
          name="tenure"
          value={form.tenure}
          onChange={handleChange}
          placeholder="Loan Tenure"
          required
        />

        <Input
          label="Monthly EMI"
          type="number"
          name="emi"
          value={form.emi}
          onChange={handleChange}
          placeholder="Monthly EMI"
          required
        />

        <Input
          label="Remaining Balance"
          type="number"
          name="remaining_balance"
          value={form.remaining_balance}
          onChange={handleChange}
          placeholder="Outstanding Balance"
          required
        />

        <Input
          label="Overdue Months"
          type="number"
          name="overdue_months"
          value={form.overdue_months}
          onChange={handleChange}
          placeholder="0"
          required
        />

        <div>
          <label>Status</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              marginTop: "8px",
            }}
          >
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div
          style={{
            gridColumn: "span 2",
            display: "flex",
            gap: "12px",
          }}
        >
          <Button type="submit">
            {editingLoan ? "Update Loan" : "Add Loan"}
          </Button>

          {editingLoan && (
            <Button
              type="button"
              variant="danger"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}

export default LoanForm;