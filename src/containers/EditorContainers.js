import React, { Component } from "react";
import CaseEditor from "../components/CaseEditor";
import MethodEditor from "../components/MethodEditor";
import OrganizationEditor from "../components/OrganizationEditor";
import api from "../utils/api";
import myhistory from "../utils/history";
import ErrorDialog from "../components/ErrorDialog";
import Raven from "raven-js";

function dict2list(obj) {
  return Object.getOwnPropertyNames(obj).map(function(e) {
    return { text: e, value: obj[e] };
  });
}

class EditorContainer extends Component {
  constructor(props) {
    super(props);
    let isQuick = true;
    this.state = {
      isQuick: isQuick,
      errorMessage: null,
      thing: { type: this.props.type }
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

  componentWillMount(){
    if (this.props.handleInternal) {
      this.props.handleInternal();
    }
  }

  componentDidMount() {
    let component = this;
    if (!this.props.new) {
      if (this.props.type === "case") {
        api.fetchCaseById(this.props.match.params.nodeID).then(function(thing) {
          if (thing) {
            if (thing.start_date !== null) {
              thing.start_date = new Date(thing.start_date);
            }
            if (thing.end_date !== null) {
              thing.end_date = new Date(thing.end_date);
            }
            if (thing.updated_date !== null) {
              thing.updated_date = new Date(thing.updated_date);
            }
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
    let saveFunc;
    if (this.props.new) {
      saveFunc = api.saveNewThing;
    } else {
      saveFunc = api.saveThing;
    }
    let comp = this;

    saveFunc(thing.type, thing)
      .then(function(thing) {
        // console.log("after saveFunc, thing:", thing);
        myhistory.push(`../../${thing.type}/${thing.id}`); // XXX move to Link
      })
      .catch(function(exception) {
        comp.setState({ errorMessage: JSON.stringify(exception) });
        console.log("Got exception saving a thing", exception);
      });
  }

  onExpand(thing) {
    this.setState({ thing, isQuick: false });
  }

  clearError() {
    this.setState({ errorMessage: null });
  }

  render() {
    if (
      !(
        this.state &&
        this.state.cases &&
        this.state.methods &&
        this.state.organizations
      )
    ) {
      return <div />;
    }
    if (this.state.errorMessage) {
      Raven.captureMessage(this.state.errorMessage, {
        level: "error"
      });
      return (
        <ErrorDialog
          onDismissError={this.clearError.bind(this)}
          errorMessage={this.state.errorMessage}
        />
      );
    }
    let cases = dict2list(this.state.cases);
    let methods = dict2list(this.state.methods);
    let organizations = dict2list(this.state.organizations);
    let isNew = this.props.new || false;
    let isQuick = this.state.isQuick;
    let thing = this.state.thing;
    if (this.props.type === "case") {
      return (
        <CaseEditor
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
      return <div>This should not show up</div>;
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
  <EditorContainer type="case" new {...props} />
);
export const NewMethodContainer = props => (
  <EditorContainer type="method" new {...props} />
);
export const NewOrganizationContainer = props => (
  <EditorContainer type="organization" new {...props} />
);
