import React, { ReactNode } from 'react'

interface RenderOnAnonymousProps {
  children: ReactNode;
}

const isLoggedIn = () => {
  return false;
}

const RenderOnAnonymous: React.FC<RenderOnAnonymousProps> = ({ children }) => (
  !isLoggedIn() ? <>{children}</> : null
);

export default RenderOnAnonymous;