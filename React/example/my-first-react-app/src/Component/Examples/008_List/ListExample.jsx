import React from 'react';

export default function ListExample() {
  const fruits = ['Apple', 'Banana', 'Orange'];

  return (
    <div>
      <h3>List Example</h3>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index} className={`fruit-${index}`}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

// 1st -> Apple, 0
// 2nd -> Banana, 1
// 3rd -> Orange, 2