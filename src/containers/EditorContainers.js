import React, { Component } from "react";
import CaseEditor from "../components/CaseEditor/CaseEditor";
import MethodEditor from "../components/MethodEditor";
import OrganizationEditor from "../components/OrganizationEditor";
import api from "../utils/api";

// May make sense to revert back to redux for this work. this is duplicative.
// Merge with EditCase, which is similar but not currently being used.

function dict2list(obj) {
  return Object.getOwnPropertyNames(obj).map(function(e) {
    return { text: e, value: obj[e] };
  });
}

class EditorContainer extends Component {
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
      })
    );
  }

  componentWillMount() {
    let component = this;
    if (this.props.type === "case") {
      api.fetchCaseById(this.props.match.params.nodeID).then(function(thing) {
        if (thing) {
          thing.start_date = new Date(thing.start_date);
          thing.end_date = new Date(thing.end_date);
          thing.updated_date = new Date(thing.updated_date);
        }
        component.setState({ thing });
      });
    } else if (this.props.type === "method") {
      api.fetchMethodById(this.props.match.params.nodeID).then(function(thing) {
        component.setState({ thing });
      });
    } else if (this.props.type === "organization") {
      api.fetchOrgById(this.props.match.params.nodeID).then(function(thing) {
        component.setState({ thing });
      });
    }
    this.getNouns();
  }

  onSubmit(thing) {
    let router = this.props.router;
    let location = this.props.location;
    let saveFunc;
    if (this.props.type === "case") {
      saveFunc = api.saveCase;
    } else if (this.props.type === "method") {
      saveFunc = api.saveMethod;
    } else if (this.props.type === "organization") {
      saveFunc = api.saveOrg;
    } else {
      console.error("got unknown type in onSubmit");
    }

    saveFunc(thing).then(function(thing) {
      let pathparts = location.pathname.split("/");
      pathparts.pop();
      router.push(pathparts.join("/"));
    });
  }

  render() {
    if (
      this.state &&
      this.state.thing &&
      this.state.cases &&
      this.state.methods &&
      this.state.organizations
    ) {
      let cases = dict2list(this.state.cases);
      let methods = dict2list(this.state.methods);
      let organizations = dict2list(this.state.organizations);
      if (this.props.type === "case") {
        return (
          <CaseEditor
            cases={cases}
            methods={methods}
            organizations={organizations}
            thing={this.state.thing}
            onSubmit={this.onSubmit.bind(this)}
          />
        );
      } else if (this.props.type === "method") {
        return (
          <MethodEditor
            cases={cases}
            methods={methods}
            organizations={organizations}
            thing={this.state.thing}
            onSubmit={this.onSubmit.bind(this)}
          />
        );
      } else if (this.props.type === "organization") {
        return (
          <OrganizationEditor
            cases={cases}
            methods={methods}
            organizations={organizations}
            thing={this.state.thing}
            onSubmit={this.onSubmit.bind(this)}
          />
        );
      } else {
        return <div>This shouldn't show up</div>;
      }
    } else {
      return <div />;
    }
  }
}

export const CaseEditorContainer = props => (
  <EditorContainer type="case" {...props} />
);
export const MethodEditorContainer = props => (
  <EditorContainer type="method" {...props} />
);
export const OrganizationEditorContainer = props => (
  <EditorContainer type="organization" {...props} />
);
