import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function FinancialChart({ result }) {
  if (!result) return null;

  const data = [
    {
      name: "Score",
      value: result.financial_score,
    },
    {
      name: "DTI",
      value: result.debt_to_income_ratio,
    },
    {
      name: "Savings",
      value: result.savings_rate,
    },
  ];

  return (
    <div
      style={{
        background: "white",
        marginTop: "30px",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        📊 Financial Analysis
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FinancialChart;