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
  let newdata = data.map(function(obj) {
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
  newdata = newdata.filter(c => c.position[0] !== 0);
  return newdata;
}

class MyMap extends React.Component {
  constructor(props) {
    super(props);
    let cases = extractData(props.cases, "case");
    let organizations = extractData(props.organizations, "organization");
    this.state = {
      cases: cases,
      organizations: organizations,
      popupShowLabel: true,
      center: [-0.109970527, 51.52916347],
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
      zoom: [5],
      focus: focus,
      popupShowLabel: true
    });
  }

  _popupChange(popupShowLabel) {
    this.setState({ popupShowLabel });
  }

  render() {
    const { cases, organizations, focus, popupShowLabel } = this.state;
    let popupChange = this._popupChange.bind(this);
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
              "icon-image": "marker-15"
            }}
          >
            {caseFeatures}
          </Layer>
          <Layer
            type="symbol"
            id="orgs"
            layout={{
              "icon-image": "square-15"
            }}
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
MyMap.propTypes = {
  onCountryChange: func
};
export default MyMap;
