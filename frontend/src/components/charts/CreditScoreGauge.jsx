export default function CreditScoreGauge({
  score,
}) {
  const percentage = Math.min(
    (score / 900) * 100,
    100
  );

  return (
    <div
      className="glass-card"
      style={{
        textAlign: "center",
        height: 360,
      }}
    >
      <h2>Credit Score</h2>

      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          margin: "30px auto",
          background: `conic-gradient(
            #3b82f6 ${percentage * 3.6}deg,
            rgba(255,255,255,.08) 0deg
          )`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 135,
            height: 135,
            borderRadius: "50%",
            background: "#0f172a",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              margin: 0,
            }}
          >
            {score}
          </h1>

          <span
            style={{
              color: "#94a3b8",
            }}
          >
            /900
          </span>
        </div>
      </div>

      <p
        style={{
          color: "#22c55e",
        }}
      >
        Excellent Credit Health
      </p>
    </div>
  );
}