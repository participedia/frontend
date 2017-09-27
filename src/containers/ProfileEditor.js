import React from "react";
import EditProfile from "../components/EditProfile/EditProfile";
import { injectIntl } from "react-intl";
import api from "../utils/api";
import myhistory from "../utils/history";
import authService from "../utils/AuthService";

function dict2list(obj) {
  return Object.getOwnPropertyNames(obj).map(function(e) {
    return { label: e, value: obj[e] };
  });
}

class ProfileEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      organizations: []
    };
  }
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = authService;
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
          organizations={this.state.organizations}
          onChange={this.onChange.bind(this)}
          {...this.props}
        />
      );
    } else {
      return <div />;
    }
  }
}

export default injectIntl(ProfileEditor);
