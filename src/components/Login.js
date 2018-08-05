import React from "react";
import authService from "../utils/AuthService";

export default class Login extends React.Component {
  render() {
    authService.handleAuthentication();
    return <div>Loading...</div>;
  }
}
