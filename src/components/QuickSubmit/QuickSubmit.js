import React, { Component, PropTypes } from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import ItemForm from "../ItemForm/ItemForm";
import { reduxForm } from "redux-form";
import {
  loadNouns,
  ORGANIZATION,
  CASE,
  METHOD,
  makeObject,
  CASE_TYPE
} from "../../actions";

class QuickSubmit extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    itemType: PropTypes.string.isRequired,
    loadOrganizationList: PropTypes.func.isRequired
  };

  componentDidMount() {
    loadOrganizationList(this.props);
  }

  render() {
    return <ItemForm {...this.props} />;
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  const { isAuthenticated } = auth;

  let organizations = [];
  if (state && state.nouns && state.nouns.organization) {
    organizations = Object.keys(state.nouns.organization);
  }
  let methods = [];
  if (state && state.nouns && state.nouns.method) {
    methods = Object.keys(state.nouns.method);
  }
  let cases = [];
  if (state && state.nouns && state.nouns.case) {
    cases = Object.keys(state.nouns.case);
  }

  return {
    quicksubmit: state.form.quicksubmit,
    isAuthenticated,
    organizations,
    methods,
    cases
  };
};

function loadOrganizationList(props) {
  props.dispatch(loadNouns(ORGANIZATION));
  props.dispatch(loadNouns(CASE));
  props.dispatch(loadNouns(METHOD));
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: function(data) {
      if (data["type"] === "case") {
        let payload = Object.assign({}, data);
        delete payload["type"];
        dispatch(makeObject(CASE_TYPE, payload));
      }
    },
    loadOrganizationList: function() {
      // XXX should make sure this is lazy
      dispatch(loadNouns(ORGANIZATION));
      dispatch(loadNouns(CASE));
      dispatch(loadNouns(METHOD));
    },
    dispatch: dispatch
  };
};

class _QuickCase extends React.Component {
  render() {
    return <QuickSubmit itemType="case" {...this.props} />;
  }
}
class _QuickMethod extends React.Component {
  render() {
    return <QuickSubmit itemType="method" {...this.props} />;
  }
}

class _QuickOrganization extends React.Component {
  render() {
    return <QuickSubmit itemType="organization" {...this.props} />;
  }
}

class _QuickDataset extends React.Component {
  render() {
    return <QuickSubmit itemType="dataset" {...this.props} />;
  }
}

class _QuickSurvey extends React.Component {
  render() {
    return <QuickSubmit itemType="survey" {...this.props} />;
  }
}

// Decorate the form component
let CaseForm = connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: "quickcase", initialValues: { type: "case" } })(_QuickCase)
);
let MethodForm = connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: "quickmethod", initialValues: { type: "method" } })(
    _QuickMethod
  )
);
let OrganizationForm = connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: "quickorg", initialValues: { type: "organization" } })(
    _QuickOrganization
  )
);
let DatasetForm = connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: "quickdataset", initialValues: { type: "dataset" } })(
    _QuickDataset
  )
);
let SurveyForm = connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ form: "quicksurvey", initialValues: { type: "survey" } })(
    _QuickSurvey
  )
);

export { CaseForm, MethodForm, OrganizationForm, DatasetForm, SurveyForm };
