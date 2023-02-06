import { Navigate } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";
import { ROUTES } from "../constants/AppConstants";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (data === undefined || !data.user) {
    // Not Authenticated
    return <Navigate to={ROUTES.LOGIN_IN} />;
  }
  return children;
};
