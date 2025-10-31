import React, { useState, useEffect } from "react";

// Helper functions for cookies
const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const getCookie = (name) => {
  console.log(document.cookie);
  // const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  // "email=daya@gmail.com/createdby=data" 
  // -> ["email=daya@gmail.com", "createdby=data"].find() 
  // -> "email=daya@gmail.com" -> ["email", "daya@gmail.com"]


  let match = document.cookie.split('/').find(row => row.startsWith(name + '='));
  if (match) {
    match = match.split('=')[1];
  }
  console.log("Matched cookie:", match);
  return match ? match : null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export default function CookieExample() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedEmail = getCookie("email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleSave = () => {
    setCookie("email", email, 1); // 1 day
    alert("Email saved in cookie for 1 day!");
  };

  const handleClear = () => {
    deleteCookie("email");
    setEmail("");
    alert("Cookie deleted!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Cookie Example</h3>
      <input
        type="email"
        value={email}
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSave}>Set Cookie</button>
      <button onClick={handleClear}>Delete Cookie</button>
      <p>{email ? `Email cookie: ${email}` : "No cookie found."}</p>
    </div>
  );
}
