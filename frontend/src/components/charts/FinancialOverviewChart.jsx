import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function FinancialOverviewChart({
  income,
  expenses,
  savings,
}) {
  const data = [
    {
      name: "Income",
      amount: income,
    },
    {
      name: "Expenses",
      amount: expenses,
    },
    {
      name: "Savings",
      amount: savings,
    },
  ];

  return (
    <div
      className="glass-card"
      style={{
        height: 380,
        padding: "24px",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: 20,
        }}
      >
        Financial Overview
      </h2>

      <ResponsiveContainer
        width="100%"
        height="85%"
      >
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="incomeGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#3b82f6"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="#3b82f6"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#334155"
          />

          <XAxis
            dataKey="name"
            stroke="#94a3b8"
          />

          <YAxis stroke="#94a3b8" />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            strokeWidth={3}
            fill="url(#incomeGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}