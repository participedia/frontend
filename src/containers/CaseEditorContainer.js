import React, { Component } from "react";
import CaseEditor from "../components/CaseEditor/CaseEditor";
import api from "../utils/api";

export default class CaseEditorContainer extends Component {
  componentWillMount() {
    let component = this;
    api.fetchCaseById(this.props.params.nodeID).then(function(the_case) {
      component.setState(the_case);
    });
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
      return (
        <CaseEditor case={this.state} onSubmit={this.onSubmit.bind(this)} />
      );
    } else {
      return <div />;
    }
  }
}
