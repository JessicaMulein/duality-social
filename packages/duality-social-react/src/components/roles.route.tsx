import React, { useEffect, useState } from 'react';
import { Route } from "react-router-dom";
import NotAllowed from "./not.allowed";

interface RolesRouteProps {
  path: string;
  roles: string[];
  element: React.ReactElement;
}

const hasRole = (roles: string[]) => {
  return false;
}

const RolesRoute: React.FC<RolesRouteProps> = ({ roles, element, path }) => {
  const [hasNeededRole, setHasNeededRole] = useState(false);

  useEffect(() => {
    setHasNeededRole(hasRole(roles));
  }, [roles]);

  return (
    <Route path={path} element={hasNeededRole ? element : <NotAllowed />} />
  );
};

export default RolesRoute;