import { Navigate, useLocation } from "react-router-dom";
import permissions from "./permissions";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, path }) => {
  const location = useLocation();

  // Retrieve the token directly from localStorage
  const token = localStorage.getItem("token");
  let role = null;

  // Decode the token to get the role
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return <Navigate to="/" replace state={{ from: location }} />;
    }
  }

  if (!role) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  const rolePermissions = permissions[role];

  if (!rolePermissions) {
    // Role not found in permissions map
    return <Navigate to="/unauthorized" replace />;
  }

  // Extract the allowed paths from rolePermissions.routes
  const allowedPaths = rolePermissions.routes.map((route) => route.path);

  // Check if the requested path is in the allowed paths
  if (!allowedPaths.includes(path)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
