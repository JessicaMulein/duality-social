import React, { ReactNode } from 'react';
import UserService from "../services/user.service";

interface RenderOnRoleProps {
  roles: string[];
  children: ReactNode;
}

const RenderOnRole: React.FC<RenderOnRoleProps> = ({ roles, children }) => (
  UserService.hasRole(roles) ? <>{children}</> : null
);

export default RenderOnRole;