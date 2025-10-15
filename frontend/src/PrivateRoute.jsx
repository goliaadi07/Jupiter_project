// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  // If no token, redirect to login
  if (!token) {
    console.warn("Access denied ❌ No token found, redirecting to login");
    return <Navigate to="/" replace />;
  }
  return children;
}
