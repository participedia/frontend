import React from "react";
import EditProfile from "../components/EditProfile/EditProfile";
import api from "../utils/api";
import myhistory from "../utils/history";

function dict2list(obj) {
  return Object.getOwnPropertyNames(obj).map(function(e) {
    return { label: e, value: obj[e] };
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
      orgs = orgs.sort(function(a, b) {
        if (a.label.toLowerCase() < b.label.toLowerCase()) return -1;
        if (a.label.toLowerCase() === b.label.toLowerCase()) return 0;
        return 1;
      });
      component.setState({ organizations: orgs });
    });
    api.fetchUser().then(function(user) {
      component.setState({ user: user.data });
    });
  }

  onChange(user) {
    // this.setState(newState);
    api.saveUser(user).then(function(user) {
      // console.log("after saving user, user:", user);
      myhistory.push("/profile");
    });
  }

  render() {
    if (this.state.profile) {
      return (
        <EditProfile
          profile={this.state.profile}
          user={this.state.user}
          intl={this.props.intl}
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
