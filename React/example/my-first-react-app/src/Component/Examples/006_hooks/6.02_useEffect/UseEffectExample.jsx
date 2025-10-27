import React, { useState, useEffect } from 'react';

export default function UseEffectExample() {


  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);

    return () => {
        clearInterval(id);
        console.log('Cleanup: Interval cleared');
    }; // cleanup on unmount

  }, []); // run once on mount

  return (
    <div>
      <h4>6.02 - useEffect</h4>
      <p>Seconds since mount: {seconds}</p>
    </div>
  );
}
