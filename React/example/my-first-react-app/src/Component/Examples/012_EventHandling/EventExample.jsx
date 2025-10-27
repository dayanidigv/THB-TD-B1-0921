import React from 'react';

export default function EventExample() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => setCount((c) => c + 1);

  return (
    <div>
      <h3>Event Handling</h3>
      <p>Clicked {count} times</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
