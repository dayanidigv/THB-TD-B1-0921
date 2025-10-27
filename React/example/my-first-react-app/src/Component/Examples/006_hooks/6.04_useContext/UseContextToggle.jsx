import React, { createContext, useContext, useState } from 'react';

// Self-contained context for this small demo
const LocalThemeContext = createContext('light');

function LocalThemeStatus() {
  const theme = useContext(LocalThemeContext);
  return <p>Current theme (toggle demo): <strong>{theme}</strong></p>;
}

export default function UseContextToggle() {
  const [theme, setTheme] = useState('light');
  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <div>
      <h4>6.04b - useContext (interactive)</h4>
      <LocalThemeContext.Provider value={theme}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={toggle}>Toggle theme</button>
          <LocalThemeStatus />
        </div>
      </LocalThemeContext.Provider>
    </div>
  );
}
