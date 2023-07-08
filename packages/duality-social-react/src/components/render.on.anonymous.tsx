import React, { ReactNode } from 'react'
import UserService from "../services/user.service";

interface RenderOnAnonymousProps {
  children: ReactNode;
}

const RenderOnAnonymous: React.FC<RenderOnAnonymousProps> = ({ children }) => (
  !UserService.isLoggedIn() ? <>{children}</> : null
);

export default RenderOnAnonymous;