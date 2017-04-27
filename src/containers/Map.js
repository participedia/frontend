import React, { Component } from "react";
import api from "../utils/api";
import MapVisualization from "../components/MapVisualization/MapVisualization";

export default class Map extends Component {
  state = {
    cases: [],
    organizations: []
  };
  componentWillMount() {
    api.searchMapTokens().then(results => this.setState(results));
  }

  render() {
    let { cases, organizations } = this.state;
    return <MapVisualization cases={cases} organizations={organizations} />;
  }
}
