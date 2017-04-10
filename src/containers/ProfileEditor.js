import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";
import { connect } from "react-redux";

import EditProfile from "../components/EditProfile/EditProfile";
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

function loadOrganizationList(props) {
  props.dispatch(loadNouns(ORGANIZATION));
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: function(data) {},
    loadOrganizationList: function() {
      dispatch(loadNouns(ORGANIZATION));
    },
    dispatch: dispatch
  };
};

class ProfileEditor extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loadOrganizationList: PropTypes.func.isRequired
  };

  componentDidMount() {
    loadOrganizationList(this.props);
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    return <EditProfile {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditor);
