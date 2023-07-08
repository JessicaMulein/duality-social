import React, { ReactNode } from 'react'
import { isLoggedIn } from "../services/user.service";

interface RenderOnAnonymousProps {
  children: ReactNode;
}

const RenderOnAnonymous: React.FC<RenderOnAnonymousProps> = ({ children }) => (
  !isLoggedIn() ? <>{children}</> : null
);

export default RenderOnAnonymous;