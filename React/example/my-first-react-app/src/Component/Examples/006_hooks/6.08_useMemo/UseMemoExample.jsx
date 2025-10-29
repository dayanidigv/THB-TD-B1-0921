import React, { useState, useMemo, useEffect} from "react";

function UseMemoDemo() {
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [renderCount, setRenderCount] = useState(0);

  // Without useMemo — recalculates on every render
  const double1 = (
    () => {
      console.log("Calculating (no memo)... ", num1);
      return num1 * 2;
    }
  )();

  // const arrowFunctionName = () => {}
  // function functionName() {}
  // const Demo = ()();

  
  const Demo = (() => {
    console.log("Simple log to show re-rendering");
  })();

  // With useMemo — recalculates only when dependency changes
  const double2 = useMemo(
    () => {
    console.log("Calculating (memoized)...", num2);
      return num2 * 2;
    },
    [num2]
  );

  // Count how many times parent re-rendered
  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "monospace" }}>
      <h2 >useMemo() Example</h2>
      <p >🔁 Parent Re-rendered: {renderCount} times</p>

      {/* Without useMemo */}
      <div style={{ ...box }}>
        <h4>❌ Without useMemo</h4>
        <label>
          Enter Number:{" "}
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(+e.target.value)}
            style={input}
          />
        </label>
        <p>
          Double: <b>{double1}</b>
        </p>
        <p style={{ color: "red" }}>Recalculates on every render</p>
      </div>

      {/* With useMemo */}
      <div style={{ ...box,}}>
        <h4>✅ With useMemo</h4>
        <label>
          Enter Number:{" "}
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(+e.target.value)}
            style={input}
          />
        </label>
        <p>
          Double: <b>{double2}</b>
        </p>
        <p style={{ color: "green" }}>Recalculates only when num2 changes</p>
      </div>
    </div>
  );
}

const box = {
  border: "2px solid #ccc",
  padding: "15px",
  marginTop: "15px",
  borderRadius: "10px",
  boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
};

const input = {
  marginLeft: "10px",
  padding: "5px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #aaa",
};

export default UseMemoDemo;
