import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const token: string | null = localStorage.getItem("token");

  if (token === null) {
    return <Navigate to="/login" replace />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
