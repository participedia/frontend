import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import Profile from "../components/Profile";
import api from "../utils/api";
import authService from "../utils/AuthService";
import { Redirect } from "react-router";

export default class ProfileLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      user: false,
      userId: props.match.params.userId
    };
  }

  componentDidMount() {
    authService.getUser((err, user) => {
      if (err) {
        return;
      }
      if (user.id === this.state.userId) {
        this.setState({ user });
      } else {
        api
          .fetchUser(this.state.userId)
          .then(userResponse => this.setState({ user: userResponse.data }));
      }
    });
  }

  render() {
    if (this.state.error) {
      console.error("ProfileLoader error: %s", this.state.error.message);
      return <div>{this.state.error.message}</div>;
    } else if (this.state.user && !this.state.userId) {
      console.log("User (no userId): %o", this.state.user);
      return <Redirect to={"/users/" + this.state.user.id} />;
    } else if (this.state.user) {
      console.log("User for userId: %o", this.state.user);
      return <Profile auth={authService} user={this.state.user} />;
    } else {
      return <div>Loading user data.</div>;
    }
  }
}
