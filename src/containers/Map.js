import React, { Component } from "react";
import api from "../utils/api";
import coordinates from "parse-dms";
function extractData(data, type) {
  let newdata = data.map(function(obj) {
    let coords;
    if (obj.location && obj.location.latitude && obj.location.longitude) {
      coords = coordinates(
        obj.location.latitude + " " + obj.location.longitude
      );
      coords = [coords["lon"], coords["lat"]];
    } else {
      coords = [0, 0];
    }
    return {
      id: obj.id,
      type: type,
      position: coords,
      url: `/${type}/${obj.id}`,
      title: obj.title
    };
  });
  newdata = newdata.filter(c => c.position[0] !== 0);
  return newdata;
}

export default class Map extends Component {
  state = {
    cases: [],
    organizations: [],
    MapVisualization: null
  };
  componentDidMount() {
    // There is probably a cleaner way to do this, but it seems to work
    let component = this;
    require.ensure(
      ["../components/MapVisualization/MapVisualization"],
      function(require) {
        let MapVisualization = require("../components/MapVisualization/MapVisualization")
          .default;
        component.setState({
          MapVisualization
        });
      }
    );
  }
  componentWillMount() {
    let component = this;
    api.searchMapTokens().then(function(results) {
      let cases = extractData(results.cases, "case");
      let organizations = extractData(results.orgs, "organization");
      component.setState({
        cases: cases,
        organizations: organizations
      });
    });
  }

  render() {
    let { cases, organizations } = this.state;
    if (this.state.MapVisualization) {
      return (
        <this.state.MapVisualization
          cases={cases}
          organizations={organizations}
        />
      );
    } else {
      return <div />;
    }
  }
}
