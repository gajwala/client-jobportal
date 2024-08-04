import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // const user = useSelector((state) => state.user);
  const user = JSON.parse(localStorage.getItem("user")); // adjust based on your state structure
  const isAuthenticated = !!user; // adjust based on your auth logic

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
