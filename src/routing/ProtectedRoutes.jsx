import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Protected route - Skyddar rutter som kräver autentisering
const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  // Kontrollera om en token finns, annars omdirigera till inloggningssidan
  return auth.token ? children : <Navigate to="/auth/signin" replace />;
};

// Admin route
const AdminRoute = ({ children }) => {
  const { auth } = useAuth();

  // Kontrollera om token och administratörsstatus finns, annars omdirigera till inloggningssidan
  return auth.token && auth.isAdmin ? (
    children
  ) : (
    <Navigate to="/auth/signin" replace />
  );
};

export { ProtectedRoute, AdminRoute };
