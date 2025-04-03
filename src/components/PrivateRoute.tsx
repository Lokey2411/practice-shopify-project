import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token"); // Kiểm tra token trong localStorage

  return token ? <Outlet /> : <Navigate to="/sign-up" replace />;
};

export default PrivateRoute;
