import React, { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { useAuth } from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Loans from "./pages/Loans";
import Negotiation from "./pages/Negotiation";
import Settlement from "./pages/Settlement";
import FinancialProfile from "./pages/FinancialProfile";
import AIChat from "./pages/AIChat";

// Layout
import Navbar from "./components/layout/Navbar";
import NavigationDrawer from "./components/layout/NavigationDrawer";

// ==========================================
// Protected Route
// ==========================================

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <NavigationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <Navbar
        toggleSidebar={() => setDrawerOpen(true)}
      />

      <main
        style={{
          paddingTop: "90px",
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingBottom: "30px",
        }}
      >
        {children}
      </main>
    </>
  );
}

// ==========================================
// Animated Routes
// ==========================================

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={location.pathname}
      >
        {/* Public Routes */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <FinancialProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/loans"
          element={
            <ProtectedRoute>
              <Loans />
            </ProtectedRoute>
          }
        />

        <Route
          path="/negotiation"
          element={
            <ProtectedRoute>
              <Negotiation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settlements"
          element={
            <ProtectedRoute>
              <Settlement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-chat"
          element={
            <ProtectedRoute>
              <AIChat />
            </ProtectedRoute>
          }
        />

        {/* Unknown Routes */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </AnimatePresence>
  );
}

// ==========================================
// App
// ==========================================

export default function App() {
  return <AnimatedRoutes />;
}