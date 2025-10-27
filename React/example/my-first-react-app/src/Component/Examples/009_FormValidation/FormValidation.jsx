import React from 'react';

export default function FormValidation() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Invalid email address ❌");
    } else {
      setError("");
      alert("Form submitted ✅");
    }
  };

  return (
    <div>
      <h3>Form &amp; Validation</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
        <p style={{ color: 'red' }}>{error}</p>
      </form>
    </div>
  );
}
