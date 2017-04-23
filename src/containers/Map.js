import React, { Component } from "react";
import api from "../utils/api";
import MapVisualization from "../components/MapVisualization/MapVisualization";

export default class Map extends Component {
  componentWillMount() {
    api.searchMapTokens().then(results => this.setState(results));
  }
  render() {
    if (!this.state) return <div />;
    return (
      <MapVisualization
        cases={this.state.cases}
        organizations={this.state.orgs}
      />
    );
  }
}
