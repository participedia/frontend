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

  onSubmit(form) {
    console.log("in onSubmit", form);
  }

  render() {
    if (this.state) {
      return <CaseEditor case={this.state} onSubmit={this.onSubmit} />;
    } else {
      return <div />;
    }
  }
}
