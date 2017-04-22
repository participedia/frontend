import React from "react";
import { Link } from "react-router-dom";
import { func } from "prop-types";
import ReactMapboxGl, {
  Layer,
  Feature,
  Popup,
  ZoomControl
} from "react-mapbox-gl";

import "./MapVisualization.css";
import coordinates from "parse-dms";
import styles from "./mapstyle.js";
const accessToken =
  "pk.eyJ1IjoiZGF2aWRhc2NoZXIiLCJhIjoiY2oxc3Nhd3l0MDBtajMybXY5azVla2x0MCJ9.ssn3RPzttpNQASihikNBmA";

function extractData(data, type) {
  console.log("in extractData", data);
  data = data.filter(
    c =>
      c.location &&
      c.location.latitude &&
      c.location.longitude &&
      c.location.latitude !== "undefined" &&
      c.location.latitude !== undefined &&
      c.location.longitude !== "undefined" &&
      c.location.longitude !== undefined
  );
  data = data.map(function(obj) {
    let coords = coordinates(
      obj.location.latitude + " " + obj.location.longitude
    );
    coords = [coords["lon"], coords["lat"]];
    return {
      id: obj.id,
      type: type,
      position: coords,
      url: `/${type}/${obj.id}`,
      title: obj.title
    };
  });
  data = data.filter(c => c.position[0] !== 0);
  return data;
}

class MyMap extends React.Component {
  state = {
    popupShowLabel: true,
    cases: [],
    orgs: [],
    center: [-0.109970527, 51.52916347],
    zoom: [2]
  };

  componentWillReceiveProps(newProps) {
    let cases = [];
    let orgs = [];
    if (newProps.data && newProps.data.data) {
      newProps.data.data.forEach(function(dataset) {
        if (dataset.type === "case") {
          cases = extractData(dataset.hits, "case");
        } else if (dataset.type === "organization") {
          orgs = extractData(dataset.hits, "organization");
        }
      });
      this.setState({ cases: cases, orgs: orgs });
    }
  }

  _onToggleHover(cursor, { map }) {
    map.getCanvas().style.cursor = cursor;
  }

  _markerClick(focus) {
    this.setState({
      center: focus.position,
      zoom: [5],
      focus
    });
  }

  _popupChange(popupShowLabel) {
    this.setState({ popupShowLabel });
  }

  render() {
    const { cases, orgs, focus, popupShowLabel } = this.state;
    let markerClick = this._markerClick.bind(this);

    return (
      <div className="map-component">
        <ReactMapboxGl
          style={"mapbox://styles/mapbox/light-v9"}
          center={this.state.center}
          zoom={this.state.zoom}
          minZoom={1}
          maxZoom={15}
          containerStyle={styles.container}
          accessToken={accessToken}
        >

          <ZoomControl zoomDiff={1} />
          <Layer
            type="symbol"
            id="cases"
            layout={{
              "icon-image": "marker-15",
              "icon-allow-overlap": true
            }}
          >
            {cases &&
              cases.map(function(st, index) {
                return (
                  <Feature
                    key={st.id}
                    onClick={() => markerClick(st)}
                    coordinates={st.position}
                  />
                );
              })}
          </Layer>
          <Layer
            type="symbol"
            id="orgs"
            layout={{
              "icon-image": "square-15",
              "icon-allow-overlap": true
            }}
          >
            {orgs &&
              orgs.map(function(st, index) {
                return (
                  <Feature
                    key={st.id}
                    onClick={() => markerClick(st)}
                    coordinates={st.position}
                  />
                );
              })}
          </Layer>

          {focus &&
            <Popup
              key={focus.id}
              offset={[0, -50]}
              coordinates={focus.position}
              style={styles.popup}
            >
              <div>
                <span
                  style={{
                    ...styles.popup,
                    display: popupShowLabel ? "block" : "none"
                  }}
                >
                  <span
                    style={{
                      ...styles.type
                    }}
                  >
                    {focus.type}
                  </span><Link to={focus.url}> {focus.title}</Link>
                </span>
                <div onClick={this._popupChange.bind(this, !popupShowLabel)}>
                  {popupShowLabel ? "Hide" : "Show"}
                </div>
              </div>
            </Popup>}
        </ReactMapboxGl>
      </div>
    );
  }
}
MyMap.propTypes = {
  onCountryChange: func
};
export default MyMap;
