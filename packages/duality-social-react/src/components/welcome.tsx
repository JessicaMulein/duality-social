import React from 'react'
import UserService from "../services/user.service";

const Welcome = () => (
  <div className="jumbotron">
    <h1>Hello Anonymous!</h1>
    <p className="lead">Please authenticate yourself!</p>
    <p>
      <button className="btn btn-lg btn-warning" onClick={() => UserService.doLogin()}>Login</button>
    </p>
  </div>
)

export default Welcome