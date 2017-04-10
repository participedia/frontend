import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ItemForm from "../ItemForm/ItemForm";
import { reduxForm } from "redux-form";
import {
  loadNouns,
  ORGANIZATION,
  CASE,
  METHOD,
  makeObject,
  CASE_TYPE,
  METHOD_TYPE,
  ORGANIZATION_TYPE
} from "../../actions";

class QuickSubmit extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    itemType: PropTypes.string.isRequired
  };

  componentDidMount() {
    loadAllTheNouns(this.props);
  }

  render() {
    return <ItemForm {...this.props} />;
  }
}

function loadAllTheNouns(props) {
  props.dispatch(loadNouns(ORGANIZATION));
  props.dispatch(loadNouns(CASE));
  props.dispatch(loadNouns(METHOD));
}

function dict2list(obj) {
  return Object.getOwnPropertyNames(obj).map(function(e) {
    return { text: e, value: obj[e] };
  });
}

const mapStateToProps = state => {
  const { auth } = state;
  const { isAuthenticated } = auth;

  return {
    quicksubmit: state.form.quicksubmit,
    isAuthenticated,
    organizations: dict2list(state.nouns.organization),
    methods: dict2list(state.nouns.method),
    cases: dict2list(state.nouns.case)
  };
};

function extract_ids(list_of_dicts) {
  if (!list_of_dicts) {
    return [];
  }
  return list_of_dicts.map(m => m["value"]);
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: function(data) {
      let thingType = data["type"];
      if (
        thingType === CASE_TYPE ||
        thingType === METHOD_TYPE ||
        thingType === ORGANIZATION_TYPE
      ) {
        let payload = Object.assign({}, data);
        delete payload["type"];
        payload["related_cases"] = extract_ids(payload["related_cases"]);
        payload["related_methods"] = extract_ids(payload["related_methods"]);
        payload["related_organizations"] = extract_ids(
          payload["related_organizations"]
        );
        dispatch(makeObject(thingType, payload));
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
