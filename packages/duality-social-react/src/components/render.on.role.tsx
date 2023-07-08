import React, { ReactNode } from 'react';
import { hasRole } from "../services/user.service";

interface RenderOnRoleProps {
  roles: string[];
  children: ReactNode;
}

const RenderOnRole: React.FC<RenderOnRoleProps> = ({ roles, children }) => (
  hasRole(roles) ? <>{children}</> : null
);

export default RenderOnRole;