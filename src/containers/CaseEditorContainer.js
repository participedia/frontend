import React, { Component } from "react";
import CaseEditor from "../components/CaseEditor/CaseEditor";
import api from "../utils/api";

export default class CaseEditorContainer extends Component {
  componentWillMount() {
    let component = this;
    console.log("PARAMS", this.props.params.nodeID);
    api.fetchCaseById(this.props.params.nodeID).then(function(the_case) {
      console.log("the_case", the_case);
      component.setState({ data: the_case, htmlBody: the_case.body });
    });
  }

  render() {
    if (this.state && this.state.data) {
      return <CaseEditor case={this.state} />;
    } else {
      return <div />;
    }
  }
}
