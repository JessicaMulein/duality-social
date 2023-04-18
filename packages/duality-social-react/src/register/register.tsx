import React from "react";
import keycloak from "../keycloak";

function Register() {
  const handleRegister = () => {
    keycloak.register();
  };

  return (
    <div>
      <h1>Register</h1>
      <button onClick={handleRegister}>Register with Keycloak</button>
    </div>
  );
}

export default Register;