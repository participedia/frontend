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
      organizations: []
    };
  }
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  componentDidMount() {
    let component = this;
    api.fetchNouns("ORGANIZATION").then(function(orgs) {
      orgs = dict2list(orgs);
      component.setState({ organizations: orgs });
    });
    api.fetchUser().then(function(user) {
      component.setState({ user: user.data });
    });
  }

  onChange(newState) {
    console.log("got newState", newState);
    this.setState(newState);
  }

  render() {
    if (this.state.profile) {
      console.log("PROFILE", this.state.profile);
      return (
        <EditProfile
          profile={this.state.profile}
          user={this.state.user}
          organizations={this.state.organizations}
          auth={this.props.auth}
          onChange={this.onChange.bind(this)}
          {...this.props}
        />
      );
    } else {
      return <div />;
    }
  }
}
