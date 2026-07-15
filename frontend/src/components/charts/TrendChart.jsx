import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function TrendChart({ result }) {
  if (!result) return null;

  const data = [
    {
      name: "Financial Score",
      value: result.financial_score,
    },
    {
      name: "DTI",
      value: result.debt_to_income_ratio,
    },
    {
      name: "Savings",
      value: result.savings || 0,
    },
  ];

  return (
    <div className="glass-panel hover-lift" style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>
        📈 Financial Trend
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563EB"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrendChart;