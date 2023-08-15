import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './LoginLink.scss';

function LoginLink() {
  const { loginWithRedirect } = useAuth0();

  return (
    <button 
      onClick={() => loginWithRedirect()} 
      className="button-as-link"
    >
      Log In
    </button>
  );
}

export default LoginLink;