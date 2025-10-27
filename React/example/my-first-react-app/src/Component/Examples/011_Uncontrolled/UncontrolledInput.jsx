import React from 'react';

export default function UncontrolledInput() {
  const inputRef = React.useRef(null);

  const handleClick = () => {
    alert(`You entered: ${inputRef.current?.value || ''}`);
  };

  return (
    <div>
      <h3>Uncontrolled Input</h3>
      <input ref={inputRef} placeholder="Type something" />
      <button onClick={handleClick}>Show Value</button>
    </div>
  );
}
