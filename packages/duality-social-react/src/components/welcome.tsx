import React from 'react'
import { doLogin, doRegister } from "../services/user.service";

const Welcome = () => (
  <div className="jumbotron">
    <h1>Hello Anonymous!</h1>
    <p className="lead">Please authenticate yourself!</p>
    <p>
      <button className="btn btn-lg btn-warning" onClick={() => doLogin()}>Login</button>
      <button className="btn btn-lg btn-warning" onClick={() => doRegister()}>Register</button>
    </p>
  </div>
)

export default Welcome