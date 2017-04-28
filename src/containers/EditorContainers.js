import React, { Component } from "react";
import CaseEditor from "../components/CaseEditor/CaseEditor";
import MethodEditor from "../components/MethodEditor";
import OrganizationEditor from "../components/OrganizationEditor";
import api from "../utils/api";
import myhistory from "../utils/history";

function dict2list(obj) {
  return Object.getOwnPropertyNames(obj).map(function(e) {
    return { text: e, value: obj[e] };
  });
}

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    let isQuick = props.new;
    this.state = {
      isQuick: isQuick,
      thing: null
    };
  }
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

  componentDidMount() {
    let component = this;
    if (!this.props.new) {
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
        api
          .fetchMethodById(this.props.match.params.nodeID)
          .then(function(thing) {
            component.setState({ thing });
          });
      } else if (this.props.type === "organization") {
        api.fetchOrgById(this.props.match.params.nodeID).then(function(thing) {
          component.setState({ thing });
        });
      }
    }
    this.getNouns();
  }

  onSubmit(thing) {
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
      myhistory.push(pathparts.join("/"));
    });
  }

  onExpand() {
    this.setState({ isQuick: false });
  }

  render() {
    if (
      !(this.state &&
        this.state.cases &&
        this.state.methods &&
        this.state.organizations)
    ) {
      return <div />;
    }
    let intl = this.props.intl;
    let cases = dict2list(this.state.cases);
    let methods = dict2list(this.state.methods);
    let organizations = dict2list(this.state.organizations);
    let isNew = this.props.new || false;
    let isQuick = this.state.isQuick;
    let thing = this.state.thing;
    if (isNew) {
      thing = {
        title: "",
        body: ""
      };
      if (this.props.type === "case") {
      }
    }
    if (this.props.type === "case") {
      return (
        <CaseEditor
          intl={intl}
          cases={cases}
          methods={methods}
          organizations={organizations}
          new={isNew}
          isQuick={isQuick}
          thing={thing}
          onExpand={this.onExpand.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
        />
      );
    } else if (this.props.type === "method") {
      return (
        <MethodEditor
          intl={intl}
          cases={cases}
          methods={methods}
          organizations={organizations}
          new={isNew}
          isQuick={isQuick}
          thing={thing}
          onExpand={this.onExpand.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
        />
      );
    } else if (this.props.type === "organization") {
      return (
        <OrganizationEditor
          intl={intl}
          cases={cases}
          methods={methods}
          organizations={organizations}
          new={isNew}
          isQuick={isQuick}
          thing={thing}
          onExpand={this.onExpand.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
        />
      );
    } else {
      return <div>This shouldn't show up</div>;
    }
  }
}

export const CaseEditorContainer = props => (
  <EditorContainer type="case" new={false} {...props} />
);
export const MethodEditorContainer = props => (
  <EditorContainer type="method" new={false} {...props} />
);
export const OrganizationEditorContainer = props => (
  <EditorContainer type="organization" new={false} {...props} />
);

export const NewCaseContainer = props => (
  <EditorContainer type="case" new={true} {...props} />
);
export const NewMethodContainer = props => (
  <EditorContainer type="method" new={true} {...props} />
);
export const NewOrganizationContainer = props => (
  <EditorContainer type="organization" new={true} {...props} />
);
