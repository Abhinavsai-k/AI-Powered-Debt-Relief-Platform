import "./LoadingSpinner.css";

function LoadingSpinner({
  message = "Loading...",
}) {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>

      <h2>{message}</h2>

      <p>Please wait while we prepare your data.</p>
    </div>
  );
}

export default LoadingSpinner;