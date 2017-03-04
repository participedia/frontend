import React, { Component, PropTypes } from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import ItemForm from "../ItemForm/ItemForm";
import { reduxForm } from "redux-form";
import { loadNouns, ORGANIZATION, CASE, METHOD } from "../../actions";

class QuickSubmit extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loadOrganizationList: PropTypes.func.isRequired
  };
  handleSubmit = values => {
    // Do something with the form values
    console.log("values", values);
  };

  componentDidMount() {
    loadOrganizationList(this.props);
  }

  render() {
    return <ItemForm {...this.props} onSubmit={this.handleSubmit} />;
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: function(data) {},
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

let redform = reduxForm({ form: "quicksubmit" });

// Decorate the form component
let CaseForm = connect(mapStateToProps, mapDispatchToProps)(
  redform(_QuickCase)
);
let MethodForm = connect(mapStateToProps, mapDispatchToProps)(
  redform(_QuickMethod)
);
let OrganizationForm = connect(mapStateToProps, mapDispatchToProps)(
  redform(_QuickOrganization)
);
let DatasetForm = connect(mapStateToProps, mapDispatchToProps)(
  redform(_QuickDataset)
);
let SurveyForm = connect(mapStateToProps, mapDispatchToProps)(
  redform(_QuickSurvey)
);

export { CaseForm, MethodForm, OrganizationForm, DatasetForm, SurveyForm };
