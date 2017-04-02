import React, { Component } from "react";
import CaseEditor from "../components/CaseEditor/CaseEditor";
import api from "../utils/api";

export default class CaseEditorContainer extends Component {
  getNouns() {
    let component = this;
    let nouns = {
      CASE: "cases",
      ORGANIZATION: "organizations",
      METHOD: "methods"
    };
    Object.keys(nouns).map((k, i) =>
      api.fetchNouns(k).then(function(the_nouns) {
        component.setState({ [nouns[k]]: the_nouns });
      }));
  }

  componentWillMount() {
    let component = this;
    api.fetchCaseById(this.props.params.nodeID).then(function(the_case) {
      component.setState({ case: the_case });
    });
    this.getNouns();
  }

  onSubmit(values, state, props, instance) {
    let router = this.props.router;
    let location = this.props.location;
    api.saveCase(state).then(function(the_case) {
      let pathparts = location.pathname.split("/");
      pathparts.pop();
      router.push(pathparts.join("/"));
    });
  }

  render() {
    if (
      this.state &&
      this.state.cases &&
      this.state.methods &&
      this.state.organizations
    ) {
      // need to turn this into a loop
      let casesArr = Object.keys(this.state.cases).map(k => k);
      let methodsArr = Object.keys(this.state.methods).map(k => k);
      let orgsArr = Object.keys(this.state.organizations).map(k => k);
      return (
        <CaseEditor
          cases={casesArr}
          methods={methodsArr}
          organizations={orgsArr}
          case={this.state.case}
          onSubmit={this.onSubmit.bind(this)}
        />
      );
    } else {
      return <div />;
    }
  }
}
