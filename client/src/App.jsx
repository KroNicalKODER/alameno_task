import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CourseList from "./pages/CourseList";
import CourseDetails from "./pages/CourseDetails";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <div className="" style={{ backgroundColor: "" }}>
        <nav className="d-flex justify-content-end my-3">
          <Link to="/">
            <button className="btn btn-sm btn-outline-light mx-3">Home</button>
          </Link>
          <Link to="/dashboard">
          <button className="btn btn-sm btn-outline-light mx-3">
            Dashboard
          </button>
          </Link>
        </nav>
        <Routes>
          <Route path="/" exact element={<CourseList />} />
          <Route path="/:id" exact element={<CourseList />} />
          <Route path="/course/:id" exact element={<CourseDetails />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
