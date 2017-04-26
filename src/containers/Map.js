import React, { Component } from "react";
import api from "../utils/api";
import MapVisualization from "../components/MapVisualization/MapVisualization";

export default class Map extends Component {
  state = {
    cases: [],
    orgs: []
  };
  componentWillMount() {
    api.searchMapTokens().then(results => this.setState(results));
  }

  render() {
    let { cases, orgs } = this.state;
    return <MapVisualization cases={cases} organizations={orgs} />;
  }
}
