import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
];

export default function SavingsPieChart({
  income,
  expenses,
  savings,
}) {
  const data = [
    {
      name: "Income",
      value: income,
    },
    {
      name: "Expenses",
      value: expenses,
    },
    {
      name: "Savings",
      value: savings,
    },
  ];

  return (
    <div
      className="glass-card"
      style={{
        height: 360,
      }}
    >
      <h2
        style={{
          marginTop: 0,
        }}
      >
        Money Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={65}
            outerRadius={110}
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}