import { Navigate, Route } from "react-router-dom";

interface AdminRouteProps {
  path: string;
  element: React.ReactElement;
}

const isAdmin = () => {
  return false;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ path, element }) => {
  return isAdmin() ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/not-allowed" />
  );
};

export default AdminRoute;