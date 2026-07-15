import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  Bot,
  Handshake,
  ShieldCheck,
  BarChart3,
  LogOut,
  Sparkles,
} from "lucide-react";

import "./Sidebar.css";

const menu = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Financial Profile",
    path: "/profile",
    icon: Wallet,
  },
  {
    name: "Loan Portfolio",
    path: "/loans",
    icon: CreditCard,
  },
  {
    name: "Settlement AI",
    path: "/settlements",
    icon: Handshake,
  },
  {
    name: "AI Negotiation",
    path: "/negotiation",
    icon: Bot,
  },
  {
    name: "Loan Analysis",
    path: "/loan-analysis",
    icon: BarChart3,
  },
  {
    name: "Borrower Rights",
    path: "/rights",
    icon: ShieldCheck,
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">

      {/* Logo */}

      <div className="sidebar-top">

        <div
          className="logo-circle"
          style={{
            background:
              "linear-gradient(135deg,#7c3aed,#10b981)",
          }}
        >
          <Sparkles size={22} color="white" />
        </div>

        <div>

          <h2
            className="logo-text"
            style={{
              margin: 0,
            }}
          >
            FinRelief AI Pro
          </h2>

          <p className="logo-sub">
            Smart Financial Recovery
          </p>

        </div>

      </div>

      {/* Navigation */}

      <nav className="sidebar-nav">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>

            </NavLink>
          );
        })}

      </nav>

      {/* Footer */}

      <div className="sidebar-footer">

        <div className="user-card">

          <div
            className="avatar"
            style={{
              background:
                "linear-gradient(135deg,#10b981,#7c3aed)",
            }}
          >
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>

          <div>

            <h4>
              {user?.name || "User"}
            </h4>

            <p>
              AI Premium Member
            </p>

          </div>

        </div>

        <button
          className="logout-button"
          onClick={logout}
        >
          <LogOut size={18} />

          Logout
        </button>

      </div>

    </aside>
  );
}