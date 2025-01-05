import React from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
const routes = (
  <Router>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/dashboard" exact element={<Dashboard />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />
    </Routes>
  </Router>
);
function App() {
  return <div>{routes}</div>;
}

export default App;
