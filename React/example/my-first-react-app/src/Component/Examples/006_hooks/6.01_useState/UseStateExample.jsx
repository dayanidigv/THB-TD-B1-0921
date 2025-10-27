import React, { useState } from 'react';

export default function UseStateExample() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h4>6.01 - useState</h4>
      <p>count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
