import React, { ReactNode } from 'react';

interface RenderOnRoleProps {
  roles: string[];
  children: ReactNode;
}

const hasRole = (roles: string[]) => {
  return false;
}

const RenderOnRole: React.FC<RenderOnRoleProps> = ({ roles, children }) => (
  hasRole(roles) ? <>{children}</> : null
);

export default RenderOnRole;