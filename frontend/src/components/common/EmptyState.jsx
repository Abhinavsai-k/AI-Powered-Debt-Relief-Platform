import "./EmptyState.css";

function EmptyState({
  title = "Nothing Found",
  message = "There is no data to display.",
  action,
}) {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        📂
      </div>

      <h2>{title}</h2>

      <p>{message}</p>

      {action}

    </div>
  );
}

export default EmptyState;