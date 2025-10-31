import React, { useState, useEffect } from "react";

export default function LocalStorageExample() {
  const [name, setName] = useState("");

  useEffect(() => {
    // Load stored name on mount
    const savedName = localStorage.getItem("username");
    if (savedName) setName(savedName);
  }, []);

  const handleSave = () => {
    localStorage.setItem("username", name);
    alert("Name saved in localStorage!");
  };

  const handleClear = () => {
    localStorage.removeItem("username");
    setName("");
    alert("localStorage cleared!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>localStorage Example</h3>
      <input
        type="text"
        value={name}
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleClear}>Clear</button>
      <p>{name ? `Welcome, ${name}!` : "No name found."}</p>
    </div>
  );
}
