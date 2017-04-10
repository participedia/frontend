import React, { Component } from "react";
import CaseEditor from "../components/CaseEditor/CaseEditor";
import api from "../utils/api";

// May make sense to revert back to redux for this work. this is duplicative.
// Merge with EditCase, which is similar but not currently being used.

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
    api.fetchCaseById(this.props.params.nodeID).then(function(thing) {
      if (thing) {
        thing.start_date = new Date(thing.start_date);
        thing.end_date = new Date(thing.end_date);
        thing.updated_date = new Date(thing.updated_date);
      }
      component.setState({ case: thing });
    });
    this.getNouns();
  }

  onSubmit(values, state, props, instance) {
    let router = this.props.router;
    let location = this.props.location;
    api.saveCase(state).then(function(thing) {
      let pathparts = location.pathname.split("/");
      pathparts.pop();
      router.push(pathparts.join("/"));
    });
  }

  render() {
    if (
      this.state &&
      this.state.case &&
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
          thing={this.state.case}
          onSubmit={this.onSubmit.bind(this)}
        />
      );
    } else {
      return <div />;
    }
  }
}
