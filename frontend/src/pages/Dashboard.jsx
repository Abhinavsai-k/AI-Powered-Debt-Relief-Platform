import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AnimatedPage from "../components/layout/AnimatedPage";
import MetricCard from "../components/cards/MetricCard";
import FinancialOverviewChart from "../components/charts/FinancialOverviewChart";
import SavingsPieChart from "../components/charts/SavingsPieChart";
import CreditScoreGauge from "../components/charts/CreditScoreGauge";
import RecentActivity from "../components/dashboard/RecentActivity";

import { useAuth } from "../context/AuthContext";

import api from "../services/api";
import { getProfiles } from "../services/profileService";
import { getLoans } from "../services/loanService";

import {
  Loader2,
  AlertCircle,
  TrendingUp,
  CreditCard,
  PiggyBank,
  ShieldAlert,
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  const [profileData, setProfileData] = useState(null);
  const [financialEngine, setFinancialEngine] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const [
        profileResponse,
        loansResponse,
        analysisResponse,
      ] = await Promise.all([
        getProfiles(),
        getLoans(),
        api.post("/financial-engine/analyze"),
      ]);

      const profile =
        profileResponse?.profile ||
        (Array.isArray(profileResponse)
          ? profileResponse[0]
          : profileResponse);

      const loans = Array.isArray(loansResponse)
        ? loansResponse
        : loansResponse?.loans || [];

      const monthlyIncome = Number(
        profile?.monthly_income || 0
      );

      const monthlyExpenses = Number(
        profile?.monthly_expenses || 0
      );

      const savings = Number(
        profile?.savings || 0
      );

      const monthlyEMI = loans.reduce(
        (sum, loan) =>
          sum +
          Number(
            loan.monthly_emi ??
              loan.emi ??
              0
          ),
        0
      );

      const outstandingDebt = loans.reduce(
        (sum, loan) =>
          sum +
          Number(
            loan.remaining_amount ??
              loan.remaining_balance ??
              loan.outstanding_amount ??
              0
          ),
        0
      );

      const monthlySurplus =
        monthlyIncome -
        monthlyExpenses -
        monthlyEMI;

      const savingsRate =
        monthlyIncome > 0
          ? (
              (savings /
                monthlyIncome) *
              100
            ).toFixed(1)
          : 0;

      const financialHealth =
        savingsRate >= 40
          ? "Excellent"
          : savingsRate >= 25
          ? "Good"
          : savingsRate >= 10
          ? "Average"
          : "Poor";

      setProfileData({
        ...profile,

        monthly_income: monthlyIncome,

        monthly_expenses: monthlyExpenses,

        monthly_savings: savings,

        monthly_emi: monthlyEMI,

        total_outstanding_debt:
          outstandingDebt,

        monthly_surplus:
          monthlySurplus,

        total_loans: loans.length,

        financial_health:
          financialHealth,
      });

      setFinancialEngine(
        analysisResponse.data
      );
    } catch (error) {
      console.error(error);

      setProfileData(null);

      setFinancialEngine(null);
    } finally {
      setLoading(false);
    }
  }
    if (loading) {
    return (
      <AnimatedPage>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "70vh",
          }}
        >
          <Loader2
            size={48}
            className="spinner"
            style={{ color: "#3b82f6" }}
          />
        </div>
      </AnimatedPage>
    );
  }

  if (!profileData) {
    return (
      <AnimatedPage>
        <div
          className="glass-card"
          style={{
            maxWidth: 760,
            margin: "80px auto",
            padding: 50,
            textAlign: "center",
          }}
        >
          <AlertCircle
            size={64}
            color="#f59e0b"
          />

          <h2
            style={{
              marginTop: 20,
            }}
          >
            Welcome, {user?.name || "User"} 👋
          </h2>

          <p
            style={{
              color: "var(--text-muted)",
              lineHeight: 1.8,
              marginTop: 12,
              marginBottom: 30,
            }}
          >
            No Financial Profile found.
            <br />
            Create your Financial Profile to unlock
            AI-powered analysis, settlement prediction,
            and personalized recommendations.
          </p>

          <Link
            to="/profile"
            className="btn-primary"
            style={{
              display: "inline-flex",
              width: "auto",
              paddingInline: 30,
            }}
          >
            Create Financial Profile
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>

      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 24,
          marginBottom: 35,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "2.4rem",
              fontWeight: 700,
            }}
          >
            Welcome, {user?.name}
          </h1>

          <p
            style={{
              color: "var(--text-muted)",
              marginTop: 8,
            }}
          >
            AI-powered Financial Recovery Dashboard
          </p>
        </div>

        <div
          className="glass-card"
          style={{
            padding: 24,
            minWidth: 280,
            borderRadius: 22,
          }}
        >
          <h3
            style={{
              marginTop: 0,
              marginBottom: 15,
            }}
          >
            AI Financial Score
          </h3>

          <h1
            style={{
              color: "#10b981",
              marginBottom: 12,
            }}
          >
            {financialEngine?.financial_score ?? 0}/100
          </h1>

          <p style={{ margin: 0 }}>
            Risk Level:
            <strong>
              {" "}
              {financialEngine?.risk_level ??
                "Unknown"}
            </strong>
          </p>

          <p
            style={{
              marginTop: 10,
            }}
          >
            Settlement Probability:
            <strong>
              {" "}
              {financialEngine?.settlement_probability ??
                0}
              %
            </strong>
          </p>
        </div>
      </div>

      {/* Metrics */}
            {/* ================= Metrics ================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: 22,
        }}
      >
        <MetricCard
          title="Monthly Income"
          value={`₹${Number(
            profileData.monthly_income
          ).toLocaleString()}`}
          icon={TrendingUp}
        />

        <MetricCard
          title="Monthly EMI"
          value={`₹${Number(
            profileData.monthly_emi
          ).toLocaleString()}`}
          icon={CreditCard}
        />

        <MetricCard
          title="Outstanding Debt"
          value={`₹${Number(
            profileData.total_outstanding_debt
          ).toLocaleString()}`}
          icon={PiggyBank}
        />

        <MetricCard
          title="Financial Health"
          value={profileData.financial_health}
          icon={ShieldAlert}
        />

        <MetricCard
          title="Monthly Surplus"
          value={`₹${Number(
            profileData.monthly_surplus
          ).toLocaleString()}`}
          icon={TrendingUp}
        />

        <MetricCard
          title="Active Loans"
          value={profileData.total_loans}
          icon={CreditCard}
        />
      </div>

      {/* ================= Financial Overview ================= */}

      <div
        style={{
          marginTop: 35,
        }}
      >
        <FinancialOverviewChart
          income={profileData.monthly_income}
          expenses={profileData.monthly_expenses}
          savings={
            profileData.monthly_savings
          }
        />
      </div>

      {/* ================= Charts ================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(360px,1fr))",
          gap: 25,
          marginTop: 30,
        }}
      >
        <SavingsPieChart
          income={profileData.monthly_income}
          expenses={profileData.monthly_expenses}
          savings={
            profileData.monthly_savings
          }
        />

        <CreditScoreGauge
          score={
            profileData.credit_score ??
            financialEngine?.financial_score ??
            0
          }
        />
      </div>
            {/* ================= AI Recommendations ================= */}

      <div
        className="glass-card"
        style={{
          marginTop: 35,
          padding: 30,
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: 20,
          }}
        >
          AI Recommendations
        </h2>

        {financialEngine?.recommendations?.length > 0 ? (
          <ul
            style={{
              lineHeight: 2,
              paddingLeft: 22,
              color: "var(--text-primary)",
            }}
          >
            {financialEngine.recommendations.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>
        ) : (
          <p
            style={{
              color: "var(--text-muted)",
            }}
          >
            No AI recommendations available.
          </p>
        )}
      </div>

      {/* ================= Recent Activity ================= */}

      <div
        style={{
          marginTop: 35,
        }}
      >
        <RecentActivity />
      </div>

    </AnimatedPage>
  );
}