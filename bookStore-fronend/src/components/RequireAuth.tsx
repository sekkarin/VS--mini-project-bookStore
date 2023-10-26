import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useStore";

const RequireAuth = () => {
  const { token } = useAppSelector((state) => state.auth);
  const location = useLocation();
  
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
