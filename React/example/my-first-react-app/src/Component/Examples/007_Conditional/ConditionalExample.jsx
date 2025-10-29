import React from 'react';

export default function ConditionalExample() {
  const isLoggedIn = true;

  return (
    <div>
      {
      isLoggedIn ?  <h2>Welcome Back! 😊</h2> : <h2>Please Login 🔐</h2>
      }
    </div>
  );
}
// condition ? true case : false case