import React from "react";
import keycloak from "../keycloak";

function Login() {
  const handleLogin = () => {
    keycloak.login();
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Keycloak</button>
    </div>
  );
}

export default Login;