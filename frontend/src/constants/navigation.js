import {
  LayoutDashboard,
  Users,
  CreditCard,
  User,
  Handshake,
} from "lucide-react";

export const navItems = [
  {
    id: "dashboard",
    path: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "users",
    path: "/users",
    label: "Users",
    icon: Users,
  },
  {
    id: "loans",
    path: "/loans",
    label: "Loans",
    icon: CreditCard,
  },
  {
    id: "financial-profile",
    path: "/financial-profile",
    label: "Financial Profile",
    icon: User,
  },
  {
    id: "settlement",
    path: "/settlement",
    label: "Settlement",
    icon: Handshake,
  },
];