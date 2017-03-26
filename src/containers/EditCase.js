/* this is the container used when editing a case.  It's job is to get
the data about a case (from a redux store, or from the network), and sets the props
to the corresponding component (the CaseEditor)
*/

import React, { Component, PropTypes } from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import CaseEditor from "../components/CaseEditor/CaseEditor";
import { loadObject, CASE_TYPE, loadNouns, ORGANIZATION, CASE, METHOD } from "../actions";

const mapStateToProps = (state, ownProps) => {
  let cases = [];
  if (state && state.nouns && state.nouns.case) {
    cases = Object.keys(state.nouns.case);
  }
  let organizations = [];
  if (state && state.nouns && state.nouns.organization) {
    organizations = Object.keys(state.nouns.organization);
  }
  let methods = [];
  if (state && state.nouns && state.nouns.method) {
    methods = Object.keys(state.nouns.method);
  }
  if (state.objects.currentObject) {
    return { case: state.objects.currentObject, cases, methods, organizations };
    // return {caseID: ownProps.params.nodeID, case: state.objects.currentObject, loading: false}
  } else {
    return { caseID: ownProps.params.nodeID, case: null, loading: true, cases, methods, organizations };
  }
};

function loadData(props) {
  props.dispatch(props.loadObject(CASE_TYPE, props.params.nodeID));
}

function loadOrganizationList(props) {
  props.dispatch(loadNouns(CASE));
  props.dispatch(loadNouns(ORGANIZATION));
  props.dispatch(loadNouns(METHOD));
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: function(data) {},
    loadObject: loadObject
  };
};

export const fields = ["title_en", "body_en"];

class _EditCase extends Component {
  static propTypes = {
    loadObject: PropTypes.func.isRequired
  };

  componentWillMount() {
    loadData(this.props);
    loadOrganizationList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.caseID !== this.props.caseID) {
      // loadData(nextProps)
    }
  }

  render() {
    return <CaseEditor {...this.props} />;
  }
}

export default reduxForm({
  form: "caseform"
})(connect(mapStateToProps, mapDispatchToProps)(_EditCase));
