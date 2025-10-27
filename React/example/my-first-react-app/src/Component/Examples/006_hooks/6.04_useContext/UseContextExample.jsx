import React, { createContext, useContext } from 'react';

// Create a ThemeContext with default value
const ThemeContext = createContext('light');

// Individual components consuming the same context
function ThemeDisplay() {
  const theme = useContext(ThemeContext);
  return <p className={theme}> Current theme (via useContext): {theme}</p>;
}

function HomeDisplay() {
  const theme = useContext(ThemeContext);
  return <p className={theme}>Home display theme (via useContext): {theme}</p>;
}

function MainDisplay() {
  const theme = useContext(ThemeContext);
  return <p className={theme}>Main display theme (via useContext): {theme}</p>;
}

// Root component providing context
export default function UseContextExample() {

    // fetching user info ..... user id is 1
const id = 1;
  return (
    <div>
      <h4>6.04 - useContext</h4>


      {/* Provide an explicit value to override the default ('light') */}
      <ThemeContext.Provider value={id}>
        <ThemeDisplay />
        <HomeDisplay />
        <MainDisplay />
      </ThemeContext.Provider>
    </div>
  );
}
