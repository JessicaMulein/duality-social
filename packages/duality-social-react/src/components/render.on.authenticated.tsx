import React, { ReactNode } from 'react'
import UserService from "../services/user.service";

interface RenderOnAuthenticatedProps {
  children: ReactNode;
}

const RenderOnAuthenticated: React.FC<RenderOnAuthenticatedProps> = ({ children }) => (
  UserService.isLoggedIn() ? <>{children}</> : null
);

export default RenderOnAuthenticated;