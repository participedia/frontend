import React from "react";
import EditProfile from "../components/EditProfile/EditProfile";
import api from "../utils/api";

function dict2list(obj) {
  return Object.getOwnPropertyNames(obj).map(function(e) {
    return { text: e, value: obj[e] };
  });
}

export default class ProfileEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      organizations: [],
      auth: null
    };
  }
  componentDidMount() {
    let component = this;
    api.fetchNouns("ORGANIZATION").then(function(orgs) {
      orgs = dict2list(orgs);
      component.setState({ organizations: orgs });
    });
    api.fetchUser().then(function(user) {
      component.setState({ user: user });
    });
  }

  render() {
    return (
      <EditProfile
        profile={this.props.profile}
        user={this.state.user}
        organizations={this.state.organizations}
        auth={this.state.auth}
        {...this.props}
      />
    );
  }
}
