import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './microapps/Login';
import SignupPage from './microapps/SignupPage';
import App from "./App";
import Dashboard from "./microapps/Dashboard";

// // Dummy function to check signup status - replace with actual implementation
const isMemberSignedUp = () => {
  // Replace with your actual logic to determine signup status
  // For example, checking localStorage or making an API call
  return localStorage.getItem('signedUp') === 'true';
};

// Component to handle routing based on signup status
const routing = () => {
    const status = localStorage.getItem('status');
    console.log("status::Routing:- ",status);
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/app" element={status ? <App /> : <Navigate to="/login" />} />
            <Route path="/register" element={isMemberSignedUp() ? <Navigate to="/login" /> : <SignupPage />} />
          {/* You can add more routes here as needed */}
        </Routes>
      </Router>
    </div>
  );
};

export default routing;