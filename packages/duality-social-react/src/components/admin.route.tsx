import { Navigate, Route } from "react-router-dom";
import { isAdmin } from "../services/user.service";

interface AdminRouteProps {
  path: string;
  element: React.ReactElement;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ path, element }) => {
  return isAdmin() ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/not-allowed" />
  );
};

export default AdminRoute;