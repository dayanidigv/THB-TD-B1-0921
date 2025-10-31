import React, { useState, useEffect } from "react";

export default function SessionStorageExample() {
  const [color, setColor] = useState("");

  useEffect(() => {
    const savedColor = sessionStorage.getItem("color");
    if (savedColor) setColor(savedColor);
  }, []);

  const handleSave = () => {
    sessionStorage.setItem("color", color);
    alert("Color saved in sessionStorage!");
  };

  const handleClear = () => {
    sessionStorage.removeItem("color");
    setColor("");
    alert("sessionStorage cleared!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>sessionStorage Example</h3>
      <input
        type="text"
        value={color}
        placeholder="Enter your favorite color"
        onChange={(e) => setColor(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleClear}>Clear</button>
      <p>{color ? `Your favorite color is ${color}` : "No color saved."}</p>
    </div>
  );
}
