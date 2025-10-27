import React from 'react';

export default function ControlledInput() {
  const [name, setName] = React.useState("");

  return (
    <div>
      <h3>Controlled Input</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello, {name || 'stranger'}</p>
    </div>
  );
}
