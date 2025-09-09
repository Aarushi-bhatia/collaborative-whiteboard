import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import Home from "./home/home";
import SignIn from "./auth/sign-in";
import SignUp from "./auth/sign-up";
import Canvas from "./components/Canvas";

const App = () => {
  return (
    <>
      <Router>
        {" "}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
          <Route path="/canvas" element={<Canvas />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
