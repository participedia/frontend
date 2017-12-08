import React, { Component } from "react";
import api from "../utils/api";
import coordinates from "parse-dms";
import defaultMapStyles from "./mapstyle.js";
import queryString from "query-string";

const defaultMarkerLayout = {
  "text-line-height": 1,
  "text-padding": 0,
  "text-anchor": "bottom",
  "text-allow-overlap": true,
  "text-field": String.fromCharCode("0xe55f"), // see https://github.com/mapbox/mapbox-gl-js/issues/3605#issuecomment-296486123 for the why.
  "icon-optional": true,
  "text-font": ["Material Icons Regular"], // ["FontAwesome Regular"] is also available
  "text-size": 18
};

// Quiet Jest down (Unnecessary as soon as we upgrade to react-apps 0.10)
if (process.env.NODE_ENV === "test") {
  require.ensure = (deps, cb) => cb(require);
}

function extractData(data) {
  if (!data) {
    return [];
  }
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
      type: obj.type,
      featured: obj.featured,
      searchmatched: obj.searchmatched,
      position: coords,
      url: `/${obj.type}/${obj.id}`,
      title: obj.title,
      images: obj.images
    };
  });
  newdata = newdata.filter(c => c.position[0] !== 0);
  return newdata;
}

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.updateItemsState = this.updateItemsState.bind(this);

    this.state = {
      cases: [],
      organizations: [],
      MapVisualization: null
    };
  }

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
    this.updateItemsState(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.updateItemsState(newProps);
  }

  updateItemsState(props) {
    let component = this;
    let queryParams = queryString.parse(props.location.search);
    queryParams["resultType"] = "map";
    api.performSearch(queryParams)
      .then(json => json.results).then(function(results) {
      let items = extractData(results);
      component.setState({
        items: items
      });
    });
  }

  render() {
    let { items } = this.state;
    let styles = this.props.styles || defaultMapStyles;
    let markerLayout = this.props.markerLayout || defaultMarkerLayout;
    let center = this.props.center;

    if (this.state.MapVisualization) {
      return (
        <this.state.MapVisualization
          items={items}
          styles={styles}
          markerLayout={markerLayout}
          center={center}
        />
      );
    } else {
      return <div />;
    }
  }
}
