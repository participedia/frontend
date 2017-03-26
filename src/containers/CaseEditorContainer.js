import React, { Component } from "react";
import CaseEditor from "../components/CaseEditor/CaseEditor";
import api from "../utils/api";

export default class CaseEditorContainer extends Component {

  getNouns() {
    let component = this;
    let nouns = {"CASE": "cases", "ORGANIZATION": "organizations", "METHOD": "methods"}
    Object.keys(nouns).map(
      (k, i) => 
        api.fetchNouns(k).then(function(the_nouns) {
          component.setState({[nouns[k]]: the_nouns});
        })
    )
  }

  componentWillMount() {
    let component = this;
    api.fetchCaseById(this.props.params.nodeID).then(function(the_case) {
      component.setState(the_case);
    });
    this.getNouns()
  }

  onSubmit(values, state, props, instance) {
    console.log("in onSubmit", values, state, props, instance);
    // This is where we would do the api call to save the new case, and redirect to the non-'/edit' URL
    // and on success of the API save, do the redirect:
    let pathparts = this.props.location.pathname.split("/");
    pathparts.pop();
    this.props.router.push(pathparts.join("/"));
  }

  render() {
    if (this.state) {
      // Need to make this less repetitive
      let casesArr = Object.keys(this.state.cases).map((k) => k)
      let methodsArr = Object.keys(this.state.methods).map((k) => k)
      let orgsArr = Object.keys(this.state.organizations).map((k) => k)
      return (
        <CaseEditor cases={casesArr} methods={methodsArr} organizations={orgsArr} case={this.state} onSubmit={this.onSubmit.bind(this)} />
      );
    } else {
      return <div />;
    }
  }
}
