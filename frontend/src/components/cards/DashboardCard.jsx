function DashboardCard({ title, value, color }) {
  return (
    <div
      style={{
        background: color,
        color: "white",
        padding: "20px",
        borderRadius: "12px",
        minWidth: "220px",
        flex: 1,
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>

      <h1>{value}</h1>
    </div>
  );
}

export default DashboardCard;