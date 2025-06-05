import React, { useEffect, useState } from "react";

const LoadingSpinner = ({
  size = 40,
  color = "#3b82f6",
  text = "Loading",
  className = "",
}) => {
  const [dotCount, setDotCount] = useState(1);

  // Animate dots in loading text: "Loading.", "Loading..", "Loading..."
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev === 3 ? 1 : prev + 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const spinnerStyle = {
    width: size,
    height: size,
    border: `${size / 8}px solid #e5e7eb`,
    borderTop: `${size / 8}px solid ${color}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center ${className}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div style={spinnerStyle} />
      {text && (
        <div
          style={{
            marginTop: 12,
            fontSize: size / 3,
            color,
            fontWeight: "600",
            fontFamily: "sans-serif",
          }}
        >
          {text + ".".repeat(dotCount)}
        </div>
      )}

      {/* Add keyframes in style tag */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
