import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './microapps/Login';
import SignupPage from './microapps/SignupPage';
import App from "./App";
import Dashboard from "./microapps/Dashboard";

// PrivateRoute Component to protect routes
export const PrivateRoute = ({ element }) => {
  const status = localStorage.getItem('status');
  return status === 'true' ? element : <Navigate to="/login" />;
};

const Routing = () => {
  const isMemberSignedUp = () => localStorage.getItem('signedUp') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Use PrivateRoute for protected /app */}
        <Route path="/app" element={<PrivateRoute element={<App />} />} />
        <Route path="/register" element={isMemberSignedUp() ? <Navigate to="/login" /> : <SignupPage />} />
      </Routes>
    </Router>
  );
};

export default Routing;