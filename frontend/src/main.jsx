import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={12}
          toastOptions={{
            duration: 3000,

            style: {
              background: "#111827",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: "14px",
              padding: "14px 18px",
              fontSize: "14px",
              backdropFilter: "blur(14px)",
              boxShadow:
                "0 12px 40px rgba(0,0,0,.35)",
            },

            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#ffffff",
              },
            },

            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },

            loading: {
              iconTheme: {
                primary: "#3b82f6",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);