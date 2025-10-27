import React, { useState, useEffect } from 'react';


// useState return two values: current state and function to update state

// const [value, updateValue] = useState(0);

export default function StateExample() {
    // this. not able to use here
  const [a, b] = useState(0);

  const [scoure, setScore] = useState(10);

//   console.log('StateExample rendered with count:', a);
//   console.log('StateExample rendered with Score:', scoure);

//   ----------------------------------------

    useEffect(() => {
    console.log('useEffect: StateExample rendered with count:', a);
    console.log('useEffect: StateExample rendered with score:', scoure);
    }, []);

//   ----------------------------------------

  useEffect(() => {
    console.log('useEffect: StateExample rendered with count:', a);
  }, [a, scoure]);

    useEffect(() => {
    console.log('useEffect: StateExample rendered with score:', scoure);
  }, [scoure]);

//   ----------------------------------------


    useEffect(() => {
        return () => {
            console.log('useEffect final: StateExample rendered with count:', a);
            console.log('useEffect final: StateExample rendered with score:', scoure);
        }
  }, []);


  return (
    <div>
      <h3>State Example</h3>

      <p>Count: {a}</p>
        <p>Score: {scoure}</p>

      <button onClick={

        () => b(currentValue => currentValue + 1)

        }>Increment</button>

        <button onClick={
            () => setScore(prevScore => prevScore + 5)
        }>Increase Score by 5</button>
    </div>
  );
}


// inital Value -> 0

// count is currentValue

// setCount is function to update count
