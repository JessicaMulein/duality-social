import React, { ReactNode } from 'react'

interface RenderOnAuthenticatedProps {
  children: ReactNode;
}

const isLoggedIn = () => {
  return false;
}

const RenderOnAuthenticated: React.FC<RenderOnAuthenticatedProps> = ({ children }) => (
  isLoggedIn() ? <>{children}</> : null
);

export default RenderOnAuthenticated;