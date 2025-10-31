import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import {Routes, Route, BrowserRouter} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
