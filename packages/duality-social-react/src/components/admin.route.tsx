import React, { ReactNode } from 'react';
import { Route } from "react-router-dom";
import { hasRole } from "../services/user.service";
import NotAllowed from "./not.allowed";

interface AdminRouteProps {
  path: string;
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children, path }) => (
  <Route path={path}>
    {hasRole(['admin']) ? <>{children}</> : <NotAllowed />}
  </Route>
);

export default AdminRoute;