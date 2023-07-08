import React, { ReactNode } from 'react'
import { isLoggedIn } from "../services/user.service";

interface RenderOnAuthenticatedProps {
  children: ReactNode;
}

const RenderOnAuthenticated: React.FC<RenderOnAuthenticatedProps> = ({ children }) => (
  isLoggedIn() ? <>{children}</> : null
);

export default RenderOnAuthenticated;