
import React, {useEffect} from 'react';

export default function ControlledInput() {
  const [name, setName] = React.useState("");

useEffect(() => {
  if (name[name.length - 1] === "a") {
    setName(name.replace(/a+$/, '@'));
  }
}, [name]);

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
