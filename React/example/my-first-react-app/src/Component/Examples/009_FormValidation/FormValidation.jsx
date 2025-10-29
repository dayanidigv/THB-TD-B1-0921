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

    // fetch("https://example.com/api/submit", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  return (
    <div>
      <h3>Form & Validation</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
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
