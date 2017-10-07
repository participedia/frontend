import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import Profile from "../components/Profile";
import api from "../utils/api";
import authService from "../utils/AuthService";

export default class ProfileLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      user: false
    };
  }
  
  componentWillMount(){
    this.props.handleInternal();
  }

  componentDidMount() {
    let component = this;
    let userId = null;
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      userId = this.props.match.params.id;
    }
    api.fetchUser(userId).then(function(results) {
      if (results.error) {
        component.setState({ error: results.error });
      } else {
        component.setState({ user: results.data });
      }
    });
  }
  render() {
    if (this.state.error) {
      return <div>{this.state.error.message}</div>;
    } else if (this.state.user) {
      return <Profile auth={authService} user={this.state.user} />;
    } else {
      return <div>Loading user data.</div>;
    }
  }
}
