import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import API from "../services/api";

import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/users/", form);

      toast.success("User created successfully!");

      navigate("/");

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
          "Registration failed."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-page">

      <div className="register-background"></div>

      <motion.div
        className="register-card"
        initial={{
          opacity: 0,
          y: 60,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
        }}
      >

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Create Account
        </motion.h1>

        <p className="register-subtitle">
          Join FinRelief AI and manage your
          financial health with AI assistance.
        </p>

        <form onSubmit={handleSubmit}>

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

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </motion.button>

        </form>

        <p className="login-link">

          Already have an account?

          <Link to="/">
            Login
          </Link>

        </p>

      </motion.div>

    </div>
  );
}

export default Register;