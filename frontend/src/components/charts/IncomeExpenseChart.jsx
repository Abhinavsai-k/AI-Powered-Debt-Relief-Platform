import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function IncomeExpenseChart({ result }) {
  if (!result) {
    return null;
  }

  const data = [
    {
      name: "Income",
      amount: result.monthly_income || 0,
    },
    {
      name: "Expenses",
      amount: result.monthly_expenses || 0,
    },
    {
      name: "EMI",
      amount: result.total_emi || 0,
    },
  ];

  return (
    <div className="chart-card">
      <h3>Income vs Expenses</h3>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="amount"
            fill="#2563EB"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeExpenseChart;