import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

function LoanDistributionChart({ loans = [] }) {
  if (!loans.length) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          color: "#64748B",
        }}
      >
        No Loan Data Available
      </div>
    );
  }

  const chartData = loans.map((loan) => ({
    name: loan.loan_type,
    value: loan.remaining_balance,
  }));

  return (
    <div className="chart-card">
      <h3>Loan Distribution</h3>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LoanDistributionChart;