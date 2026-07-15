import { useState, useEffect } from "react";

function UserForm({ onSubmit, editingUser, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (editingUser) {
      setForm({
        name: editingUser.name,
        email: editingUser.email,
        password: editingUser.password || "",
      });
    } else {
      setForm({
        name: "",
        email: "",
        password: "",
      });
    }
  }, [editingUser]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);

    if (!editingUser) {
      setForm({
        name: "",
        email: "",
        password: "",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: "12px",
        maxWidth: "500px",
        marginBottom: "30px",
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        style={{
          padding: "12px",
          background: "#2563EB",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {editingUser ? "Update User" : "Add User"}
      </button>

      {editingUser && (
        <button
          type="button"
          onClick={onCancel}
          style={{
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

export default UserForm;