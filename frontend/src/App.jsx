import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import Home from "./home/home";
import SignIn from "./auth/sign-in";
import SignUp from "./auth/sign-up";
import Canvas from "./components/Canvas";
import ExcaliSketch from "./components/ExcaliSketch";

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
          <Route 
            path="/canvas/:roomId" 
            element={<ExcaliSketchWrapper />}
          />
        </Routes>
      </Router>
    </>
  );
};

const ExcaliSketchWrapper = () => {
  const { roomId } = useParams();
  return <ExcaliSketch roomId={roomId} />;
};

export default App;
