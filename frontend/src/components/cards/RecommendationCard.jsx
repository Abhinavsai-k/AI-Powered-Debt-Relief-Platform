function RecommendationCard({ recommendation, summary }) {
  return (
    <div className="recommendation-card">
      <h2>🤖 AI Recommendation</h2>

      <div className="recommendation-box">
        <h3>{recommendation}</h3>

        <p>{summary}</p>
      </div>
    </div>
  );
}

export default RecommendationCard;