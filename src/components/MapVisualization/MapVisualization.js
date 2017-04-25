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
  "pk.eyJ1IjoiZGF2aWRhc2NoZXIiLCJhIjoiY2l2dTBlc2swMDAzcjJ0bW4xdTJ1ZGZhZSJ9.uxbzY-xlJ1FJ7lu95S_9cw";
const styleURL = "mapbox://styles/davidascher/cj1u1ogkc00242sll48w3zzt8";

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

const caseMarkerLayout = {
  "text-line-height": 1,
  "text-padding": 0,
  "text-anchor": "bottom",
  "text-allow-overlap": false,
  "text-field": String.fromCharCode("0xe55f"), // see https://github.com/mapbox/mapbox-gl-js/issues/3605#issuecomment-296486123 for the why.
  "icon-optional": true,
  "text-font": ["Material Icons Regular"], // ["FontAwesome Regular"] is also available
  "text-size": 18
};

const orgMarkerLayout = caseMarkerLayout;

const caseMarkerPaint = {
  "text-translate-anchor": "viewport",
  "text-color": "#ce8b88"
};

const orgMarkerPaint = {
  "text-translate-anchor": "viewport",
  "text-color": "#8897ce"
};

class MapVisualization extends React.Component {
  constructor(props) {
    super(props);
    let cases = extractData(props.cases, "case");
    let organizations = extractData(props.organizations, "organization");
    let component = this;
    // For fun, we offer to center the map on where the viewer is.
    navigator.geolocation.getCurrentPosition(function(position) {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      component.setState({
        center: [lng, lat],
        zoom: [5]
      });
    });

    this.state = {
      cases: cases,
      organizations: organizations,
      popupShowLabel: true,
      center: [-9.9215833, -15.4099109],
      zoom: [2],
      focus: null
    };
  }

  _onToggleHover(cursor, { map }) {
    map.getCanvas().style.cursor = cursor;
  }

  _markerClick(focus) {
    this.setState({
      center: focus.position,
      focus: focus,
      popupShowLabel: true
    });
  }

  _popupChange(popupShowLabel) {
    this.setState({ popupShowLabel });
  }
  _clearPopup() {
    this.setState({ popupShowLabel: false });
  }

  render() {
    const { cases, organizations, focus, popupShowLabel } = this.state;
    let popupChange = this._popupChange.bind(this);
    let clearPopup = this._clearPopup.bind(this);
    const caseFeatures = cases.map((st, index) => (
      <Feature
        key={st.id}
        onClick={this._markerClick.bind(this, st)}
        coordinates={st.position}
      />
    ));
    const orgFeatures = organizations.map((st, index) => (
      <Feature
        key={st.id}
        onClick={this._markerClick.bind(this, st)}
        coordinates={st.position}
      />
    ));

    return (
      <div className="map-component">
        <ReactMapboxGl
          style={styleURL}
          center={this.state.center}
          scrollZoom={false}
          touchZoomRotate={true}
          zoom={this.state.zoom}
          minZoom={1}
          maxZoom={15}
          onClick={clearPopup}
          containerStyle={styles.container}
          accessToken={accessToken}
        >

          <ZoomControl zoomDiff={1} />
          <Layer
            type="symbol"
            id="cases"
            layout={caseMarkerLayout}
            paint={caseMarkerPaint}
          >
            {caseFeatures}
          </Layer>
          <Layer
            type="symbol"
            id="orgs"
            layout={orgMarkerLayout}
            paint={orgMarkerPaint}
          >
            {orgFeatures}
          </Layer>

          {focus &&
            <Popup
              key={focus.id}
              offset={[0, -50]}
              coordinates={focus.position}
              style={{
                ...styles.popup,
                display: popupShowLabel ? "block" : "none"
              }}
            >
              <div>
                <span
                  style={{
                    ...styles.popup
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
                <div onClick={() => popupChange(!popupShowLabel)}>
                  {popupShowLabel ? "Hide" : "Show"}
                </div>
              </div>
            </Popup>}
        </ReactMapboxGl>
      </div>
    );
  }
}
MapVisualization.propTypes = {
  onCountryChange: func
};
export default MapVisualization;
