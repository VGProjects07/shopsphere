import "./LoadingSpinner.css";

export default function LoadingSpinner({ size = "medium" }) {
  return (
    <div className={`spinner ${size}`}>
      <div className="spinner-circle"></div>
    </div>
  );
}