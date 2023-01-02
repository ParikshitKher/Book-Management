import { Navigate, Outlet } from "react-router-dom";
function ProtectedRoutes() {
  const islog = true;
  return islog ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoutes;
