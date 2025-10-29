import React, { useState, useCallback } from "react";

// ✅ React.memo prevents unnecessary re-render when props don’t change
function Child1({ onClick }){
  console.log(`❌ Normal Increment`);
  return (
    <div style={{ marginBottom: "10px" }}>
      <button onClick={onClick}>Normal Increment</button>
    </div>
  );
}

const Child2 = React.memo(({ onClick }) => {
  console.log(`✅ Memoized Increment`);
  return (
    <div style={{ marginBottom: "10px" }}>
      <button onClick={onClick}>Memoized Increment</button>
    </div>
  );
});

const Child3 = React.memo(({ onClick, value }) => {
  console.log(`✅ Memoized Increment with value: ${value}`);
  return (
    <div style={{ marginBottom: "10px" }}>
      <button onClick={onClick}>Memoized Increment - {value}</button>
    </div>
  );
});

function UseCallbackExample() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [rerender, setRerender] = useState(0);

  // Function recreated every render
//   const increment1 = useCallback(() => setCount1((c) => c + 1), []);
  const increment1 = () => setCount1((c) => c + 1);

  // Function reference cached (stable)
  const increment2 = useCallback(() => setCount2((c) => c + 1), []);

  const increment3 = useCallback(() => setCount3((c) => c + 1), []);

  console.log("Parent Rendered");

  return (
    <div style={{ padding: 20 }}>
      <h2>useCallback() Example (React.memo Visible)</h2>

      <p>Count 1: {count1}</p>
      <Child1 onClick={increment1}/>

      <p>Count 2: {count2}</p>
      <Child2 onClick={increment2}/>

      <Child3 onClick={increment3} value={count3}/>

      <button onClick={() => setRerender((r) => r + 1)}>Force Parent Re-render</button>
    </div>
  );
}

export default UseCallbackExample;
