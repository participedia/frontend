import React, { Component, PropTypes } from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";

import EditProfile from "../components/EditProfile";
import { loadNouns, ORGANIZATION } from "../actions";

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated } = auth;

  let organizations = [];
  if (state && state.nouns && state.nouns.organization) {
    organizations = Object.keys(state.nouns.organization);
  }

  return {
    isAuthenticated,
    organizations
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: function(data) {},
    dispatch: dispatch
  };
};

class ProfileEditor extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  loadOrganizationList(props) {
    props.dispatch(loadNouns(ORGANIZATION));
  }

  componentDidMount() {
    this.loadOrganizationList(this.props);
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    return <EditProfile {...this.props} />;
  }
}

function fetchNouns(component, nouns) {
  connect(mapStateToProps, mapDispatchToProps)(ProfileEditor);
}

export default fetchNouns;
