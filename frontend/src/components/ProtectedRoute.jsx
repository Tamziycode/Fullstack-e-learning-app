import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Blocks unauthenticated users
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div className="auth-loading">
        <div className="auth-spinner" />
      </div>
    );
  if (!isAuthenticated)
    return <Navigate to="/Signin" state={{ from: location }} replace />;
  return children;
};

// Blocks non-instructors (and non-admins)
export const InstructorRoute = ({ children }) => {
  const { isAuthenticated, isInstructor, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div className="auth-loading">
        <div className="auth-spinner" />
      </div>
    );
  if (!isAuthenticated)
    return <Navigate to="/Signin" state={{ from: location }} replace />;
  if (!isInstructor && !isAdmin) return <Navigate to="/Dashboard" replace />;
  return children;
};

// Redirects already-logged-in users away from auth pages
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading)
    return (
      <div className="auth-loading">
        <div className="auth-spinner" />
      </div>
    );
  if (isAuthenticated) return <Navigate to="/Dashboard" replace />;
  return children;
};
