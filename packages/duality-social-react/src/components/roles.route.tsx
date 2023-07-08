import React, { ReactNode } from 'react';
import { Route } from "react-router-dom";
import UserService from "../services/user.service";
import NotAllowed from "./not.allowed";

interface RolesRouteProps {
  path: string;
  roles: string[];
  children: ReactNode;
}

const RolesRoute: React.FC<RolesRouteProps> = ({ roles, children, path }) => (
  <Route path={path}>
    {UserService.hasRole(roles) ? <>{children}</> : <NotAllowed />}
  </Route>
);

export default RolesRoute;