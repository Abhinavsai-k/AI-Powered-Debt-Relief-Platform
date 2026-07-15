import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import AnimatedPage from "../components/layout/AnimatedPage";

import {
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../services/profileService";

import { addActivity } from "../services/activityService";

import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  AlertCircle,
  User,
  TrendingUp,
  CreditCard,
  PiggyBank,
  ShieldAlert,
  Sparkles,
  Wallet,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

export default function FinancialProfile() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    monthly_income: "",
    monthly_expenses: "",
    savings: "",
    employment_type: "",
    credit_score: "",
    dependents: "",
  });

  useEffect(() => {
    loadProfiles();
  }, []);

  async function loadProfiles() {
    try {
      setLoading(true);

      const data = await getProfiles();

      const profile =
        data?.profile ||
        (Array.isArray(data) ? data[0] : data);

      setProfiles(profile ? [profile] : []);
      setEditingProfile(profile || null);
    } catch (error) {
      console.error(error);
      setProfiles([]);
      setEditingProfile(null);
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setEditingProfile(null);

    setFormData({
      monthly_income: "",
      monthly_expenses: "",
      savings: "",
      employment_type: "",
      credit_score: "",
      dependents: "",
    });

    setShowModal(true);
  }

  function openEditModal(profile) {
    setEditingProfile(profile);

    setFormData({
      monthly_income: profile.monthly_income || "",
      monthly_expenses: profile.monthly_expenses || "",
      savings: profile.savings || "",
      employment_type: profile.employment_type || "",
      credit_score: profile.credit_score || "",
      dependents: profile.dependents || "",
    });

    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);

    const toastId = toast.loading(
      editingProfile
        ? "Updating Financial Profile..."
        : "Creating Financial Profile..."
    );

    try {
      const payload = {
        monthly_income: Number(formData.monthly_income),
        monthly_expenses: Number(formData.monthly_expenses),
        savings: Number(formData.savings),
        employment_type: formData.employment_type,
        credit_score: Number(formData.credit_score),
        dependents: Number(formData.dependents),
      };

      if (editingProfile) {
  await updateProfile(payload);

  try {
    await addActivity({
      title: "Financial Profile Updated",
      description: "Updated Financial Profile",
      type: "profile",
    });
  } catch (err) {
    console.warn("Activity logging failed:", err);
  }

  await loadProfiles();          // Reload latest profile
  setEditingProfile(null);       // Exit edit mode
  setShowModal(false);           // Close modal

  toast.success("Financial Profile Updated");
} else {
  await createProfile(payload);

  try {
    await addActivity({
      title: "Financial Profile Created",
      description: "Created Financial Profile",
      type: "profile",
    });
  } catch (err) {
    console.warn("Activity logging failed:", err);
  }

  await loadProfiles();          // Reload latest profile
  setEditingProfile(null);
  setShowModal(false);

  toast.success("Financial Profile Created");
}

      setShowModal(false);
      await loadProfiles();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.detail ||
          "Unable to save Financial Profile"
      );
    } finally {
      toast.dismiss(toastId);
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Delete Financial Profile?")) return;

    const toastId = toast.loading("Deleting Profile...");

    try {
      await deleteProfile();

      await addActivity({
        title: "Financial Profile Deleted",
        description: "Deleted Financial Profile",
        type: "profile",
      });

      toast.success("Profile Deleted");

      setProfiles([]);
      setEditingProfile(null);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.detail ||
          "Unable to delete Financial Profile"
      );
    } finally {
      toast.dismiss(toastId);
    }
  }
    // ===========================================
  // Calculated Values
  // ===========================================

  const profile = profiles[0];

  const savingsRate =
    profile && profile.monthly_income > 0
      ? (
          (profile.savings /
            profile.monthly_income) *
          100
        ).toFixed(1)
      : 0;

  const expenseRate =
    profile && profile.monthly_income > 0
      ? (
          (profile.monthly_expenses /
            profile.monthly_income) *
          100
        ).toFixed(1)
      : 0;

  const healthScore = profile
    ? Math.min(
        100,
        Math.max(
          0,
          Math.round(
            (Number(profile.credit_score) /
              900) *
              70 +
              Number(savingsRate) * 0.3
          )
        )
      )
    : 0;

  // ===========================================
  // Styles
  // ===========================================

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    border:
      "1px solid rgba(255,255,255,.08)",
    background:
      "rgba(255,255,255,.05)",
    color: "#fff",
    outline: "none",
    fontSize: 15,
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    marginBottom: 8,
    color: "#cbd5e1",
    fontSize: 14,
    fontWeight: 500,
  };

  const cardStyle = {
    background:
      "rgba(255,255,255,.05)",
    border:
      "1px solid rgba(255,255,255,.08)",
    borderRadius: 24,
    padding: 24,
    backdropFilter: "blur(20px)",
    boxShadow:
      "0 10px 30px rgba(0,0,0,.2)",
  };

  const fieldLabels = {
    monthly_income:
      "Monthly Income (₹)",

    monthly_expenses:
      "Monthly Expenses (₹)",

    savings:
      "Savings (₹)",

    credit_score:
      "Credit Score",

    dependents:
      "Dependents",
  };

  // ===========================================
  // Loading
  // ===========================================

  if (loading) {
    return (
      <AnimatedPage>
        <div
          style={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader2
            className="spinner"
            size={42}
            color="#3b82f6"
          />
        </div>
      </AnimatedPage>
    );
  }

  // ===========================================
  // Main UI
  // ===========================================

  return (
    <AnimatedPage>

      {!profile ? (

        <>
          {/* Header */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 35,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "2.3rem",
                  fontWeight: 700,
                }}
              >
                Financial Profile
              </h1>

              <p
                style={{
                  color:
                    "var(--text-muted)",
                  marginTop: 8,
                }}
              >
                Manage your financial information used by the AI.
              </p>
            </div>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="btn-primary"
              onClick={openAddModal}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Plus size={18} />
              Create Profile
            </motion.button>
          </div>

          {/* Empty Card */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            style={{
              ...cardStyle,
              textAlign: "center",
              padding: 60,
            }}
          >
            <AlertCircle
              size={70}
              color="#64748b"
              style={{
                marginBottom: 20,
              }}
            />

            <h2>No Financial Profile</h2>

            <p
              style={{
                color: "#94a3b8",
                maxWidth: 520,
                margin:
                  "20px auto 30px",
                lineHeight: 1.8,
              }}
            >
              Create your Financial Profile to unlock AI Negotiation,
              Financial Analysis, Settlement Prediction and the
              Financial Dashboard.
            </p>

            <button
              className="btn-primary"
              onClick={openAddModal}
            >
              Create Profile
            </button>
          </motion.div>
        </>

      ) : (
                <>
          {/* Header */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 35,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "2.3rem",
                  fontWeight: 700,
                }}
              >
                Financial Profile
              </h1>

              <p
                style={{
                  color: "var(--text-muted)",
                  marginTop: 8,
                }}
              >
                Manage your financial information used by the AI.
              </p>
            </div>
          </div>

          {/* Summary Cards */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: 22,
              marginBottom: 30,
            }}
          >
            {[
              {
                icon: TrendingUp,
                color: "#22c55e",
                title: "Monthly Income",
                value: `₹${Number(
                  profile.monthly_income
                ).toLocaleString()}`,
              },
              {
                icon: CreditCard,
                color: "#ef4444",
                title: "Monthly Expenses",
                value: `₹${Number(
                  profile.monthly_expenses
                ).toLocaleString()}`,
              },
              {
                icon: PiggyBank,
                color: "#3b82f6",
                title: "Savings",
                value: `₹${Number(
                  profile.savings
                ).toLocaleString()}`,
              },
              {
                icon: Sparkles,
                color: "#f59e0b",
                title: "Financial Health",
                value: `${healthScore}%`,
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                style={cardStyle}
              >
                <card.icon
                  size={34}
                  color={card.color}
                />

                <small
                  style={{
                    display: "block",
                    marginTop: 16,
                    color: "#94a3b8",
                  }}
                >
                  {card.title}
                </small>

                <h2
                  style={{
                    marginTop: 10,
                    color:
                      card.title ===
                      "Financial Health"
                        ? healthScore >= 80
                          ? "#22c55e"
                          : healthScore >= 60
                          ? "#f59e0b"
                          : "#ef4444"
                        : "#fff",
                  }}
                >
                  {card.value}
                </h2>
              </motion.div>
            ))}
          </div>

          {/* Financial Details */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            style={cardStyle}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: 24,
              }}
            >
              Financial Details
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(260px,1fr))",
                gap: 24,
              }}
            >
              {[
                {
                  icon: Wallet,
                  color: "#3b82f6",
                  label: "Employment",
                  value: profile.employment_type,
                },
                {
                  icon: ShieldAlert,
                  color: "#22c55e",
                  label: "Credit Score",
                  value: profile.credit_score,
                },
                {
                  icon: User,
                  color: "#8b5cf6",
                  label: "Dependents",
                  value: profile.dependents,
                },
                {
                  icon: BarChart3,
                  color: "#f59e0b",
                  label: "Expense Ratio",
                  value: `${expenseRate}%`,
                },
                {
                  icon: PiggyBank,
                  color: "#10b981",
                  label: "Savings Rate",
                  value: `${savingsRate}%`,
                },
                {
                  icon: CheckCircle2,
                  color: "#22c55e",
                  label: "Status",
                  value: "Financial Profile Active",
                },
              ].map((item, index) => (
                <div key={index}>
                  <item.icon
                    color={item.color}
                    size={28}
                  />

                  <h4
                    style={{
                      marginTop: 12,
                      marginBottom: 6,
                    }}
                  >
                    {item.label}
                  </h4>

                  <p
                    style={{
                      color: "#cbd5e1",
                      margin: 0,
                    }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 15,
                marginTop: 35,
              }}
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() =>
                  openEditModal(profile)
                }
                className="btn-primary"
              >
                <Pencil size={16} />
                Edit
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={handleDelete}
                style={{
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "12px 22px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 600,
                }}
              >
                <Trash2 size={16} />
                Delete
              </motion.button>
            </div>
          </motion.div>

        </>
      )}
            {/* Create / Edit Modal */}

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.65)",
              backdropFilter: "blur(10px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
          >
            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 22,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              style={{
                width: "600px",
                maxWidth: "92vw",
                maxHeight: "90vh",
                overflowY: "auto",
                background: "#111827",
                border:
                  "1px solid rgba(255,255,255,.08)",
                borderRadius: 24,
                padding: 30,
                boxSizing: "border-box",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  marginBottom: 25,
                }}
              >
                {editingProfile
                  ? "Edit Financial Profile"
                  : "Create Financial Profile"}
              </h2>

              <form
                onSubmit={handleSubmit}
                style={{
                  display: "grid",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "1fr 1fr",
                    gap: 20,
                  }}
                >
                  {Object.entries(
                    fieldLabels
                  ).map(([key, label]) => (
                    <div key={key}>
                      <label
                        style={labelStyle}
                      >
                        {label}
                      </label>

                      <input
                        type="number"
                        required
                        min={
                          key ===
                          "credit_score"
                            ? 300
                            : 0
                        }
                        max={
                          key ===
                          "credit_score"
                            ? 900
                            : undefined
                        }
                        style={inputStyle}
                        value={formData[key]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [key]:
                              e.target.value,
                          })
                        }
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      style={labelStyle}
                    >
                      Employment Type
                    </label>

                    <select
                      required
                      value={
                        formData.employment_type
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          employment_type:
                            e.target.value,
                        })
                      }
                      style={{
                        ...inputStyle,
                        background:
                          "#1f2937",
                      }}
                    >
                      <option value="">
                        Select Employment Type
                      </option>

                      <option value="Salaried">
                        Salaried
                      </option>

                      <option value="Self Employed">
                        Self Employed
                      </option>

                      <option value="Business">
                        Business
                      </option>

                      <option value="Student">
                        Student
                      </option>

                      <option value="Retired">
                        Retired
                      </option>
                    </select>
                  </div>
                </div>
                                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 14,
                    marginTop: 15,
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setShowModal(false)
                    }
                    style={{
                      padding: "12px 24px",
                      borderRadius: 12,
                      border:
                        "1px solid rgba(255,255,255,.15)",
                      background: "transparent",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={saving}
                    style={{
                      width: "auto",
                      minWidth: 160,
                    }}
                  >
                    {saving ? (
                      <Loader2
                        className="spinner"
                        size={18}
                      />
                    ) : editingProfile ? (
                      "Update Profile"
                    ) : (
                      "Create Profile"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </AnimatedPage>
  );
}