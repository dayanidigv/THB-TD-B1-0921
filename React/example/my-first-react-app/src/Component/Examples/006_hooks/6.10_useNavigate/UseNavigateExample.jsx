import React from "react";
import { useNavigate } from "react-router-dom";

export default function UseNavigateExample() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      <h2 style={{ color: "#0070f3" }}>6.10 - useNavigate() Example</h2>
      <p>
        🔁 <code>useNavigate</code> allows <b>programmatic navigation</b> —
        you can move between routes using functions instead of links.
      </p>

      <div style={buttonGroup}>
        <button onClick={() => navigate("/")}>🏠 Go Home</button>
        <button onClick={() => navigate(-1)}>⬅️ Go Back</button>
        <button onClick={() => navigate(1)}>➡️ Go Forward</button>
        <button onClick={() => navigate("/about", { replace: true })}>
          📄 Go to About (replace)
        </button>
      </div>
    </div>
  );
}

// 🎨 Simple styles
const container = {
  padding: "20px",
  fontFamily: "monospace",
};

const buttonGroup = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
};

const infoBox = {
  backgroundColor: "#f3f3f3",
  padding: "10px",
  borderRadius: "8px",
  marginTop: "20px",
  border: "1px solid #ddd",
};
