import React, { Component } from "react"; // eslint-disable-line no-unused-vars

function dict2list(obj) {
  return Object.getOwnPropertyNames(obj).map(function(e) {
    return { text: e, value: obj[e] };
  });
}

// This function takes a component...
function withNouns(WrappedComponent, selectData) {
  // ...and returns another component...
  return class WithNouns extends React.Component {
    constructor(props) {
      super(props);
      this.props.dispatch(loadNouns(ORGANIZATION));
      this.props.dispatch(loadNouns(CASE));
      this.props.dispatch(loadNouns(METHOD));
    }

    render() {
      let organizations = dict2list(this.state.nouns.organization);
      let methods = dict2list(this.state.nouns.method);
      let cases = dict2list(this.state.nouns.case);

      return (
        <WrappedComponent
          cases={cases}
          methods={methods}
          organizations={organizations}
          {...this.props}
        />
      );
    }
  };
}

export default withNouns;
