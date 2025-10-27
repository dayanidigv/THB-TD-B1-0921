import './App.css';
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Example from './pages/Example';
import About from './pages/About';
import Home from './pages/Home';

function App() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };
  return (
    <div className="App">

      {/* Navigation Bar */}
      <nav style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
        <Link to="/" style={{ ...linkStyle, color: isActive('/') ? '#ff0088' : 'gray' }}>Home</Link>
        <Link to="/about" style={{ ...linkStyle, color: isActive('/about') ? '#ff0088' : 'gray' }}>About</Link>
        <Link to="/example" style={{ ...linkStyle, color: isActive('/example') ? '#ff0088' : 'gray' }}>Example</Link>
      </nav>

      {/* Routes Area */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/example" element={<Example />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

const linkStyle = { marginRight: 12, textDecoration: 'none' };

export default App;
