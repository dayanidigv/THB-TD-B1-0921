import React, {useState} from 'react';

export default function EventExample() {
  const [count, setCount] = useState(0);

  const handleClick = () => setCount((c) => c + 1);

  return (
    <div>
      <h3>Event Handling</h3>
      <p>Clicked {count} times</p>
      <button onClick={handleClick} onMouseEnter={()=>{console.log("Mouse entered")}}>Click Me</button>
    </div>
  );
}
