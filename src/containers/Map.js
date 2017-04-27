import React, { Component } from "react";
import api from "../utils/api";
import MapVisualization from "../components/MapVisualization/MapVisualization";

export default class Map extends Component {
  state = {
    cases: [],
    organizations: []
  };
  componentWillMount() {
    api
      .searchMapTokens()
      .then(
        results => console.log("results", results) && this.setState(results)
      );
  }

  // shouldComponentUpdate(newProps) {
  //   console.log(this.props, newProps);
  //   return false;
  // }

  render() {
    console.log("re-rendering map");
    let { cases, organizations } = this.state;
    return <MapVisualization cases={cases} organizations={organizations} />;
  }
}
