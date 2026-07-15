import {
  CheckCircle2,
  CreditCard,
  Sparkles,
  Wallet,
} from "lucide-react";

const activities = [
  {
    icon: Wallet,
    title: "Financial Profile Updated",
    subtitle: "Your financial profile was successfully saved.",
    time: "Today",
  },
  {
    icon: CreditCard,
    title: "Loan Analysis Completed",
    subtitle: "AI analyzed your current loans.",
    time: "Yesterday",
  },
  {
    icon: Sparkles,
    title: "AI Recommendation Generated",
    subtitle: "New debt optimization strategy available.",
    time: "2 days ago",
  },
  {
    icon: CheckCircle2,
    title: "Credit Score Improved",
    subtitle: "Your financial health is improving.",
    time: "Last week",
  },
];

export default function RecentActivity() {
  return (
    <div className="glass-card">
      <h2 style={{ marginTop: 0 }}>
        Recent Activity
      </h2>

      <div
        style={{
          marginTop: 25,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {activities.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background:
                    "linear-gradient(135deg,#2563eb,#06b6d4)",
                }}
              >
                <Icon
                  size={20}
                  color="white"
                />
              </div>

              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    margin: 0,
                  }}
                >
                  {item.title}
                </h4>

                <p
                  style={{
                    marginTop: 4,
                    color: "#94a3b8",
                    fontSize: 14,
                  }}
                >
                  {item.subtitle}
                </p>
              </div>

              <span
                style={{
                  color: "#64748b",
                  fontSize: 13,
                }}
              >
                {item.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}