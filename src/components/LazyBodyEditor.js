import React, { Component } from "react";
// this is just to avoid bundling quill on routes that don't need it.

export default class LazyBodyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { BodyEditor: false };
  }
  componentDidMount() {
    // There is probably a cleaner way to do this, but it seems to work
    let component = this;
    require.ensure(["./BodyEditor"], function(require) {
      let BodyEditor = require("./BodyEditor").default;
      component.setState({
        BodyEditor
      });
    });
  }
  render() {
    let BodyEditor = this.state.BodyEditor;
    if (BodyEditor) {
      return <BodyEditor {...this.props} />;
    } else {
      return <div />;
    }
  }
}
