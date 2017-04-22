import React from "react";
import { func } from "prop-types";
import ReactMapboxGl, { GeoJSONLayer, ZoomControl } from "react-mapbox-gl";

import "./MapVisualization.css";
import coordinates from "parse-dms";
import styles from "./mapstyle.js";
const accessToken =
  "pk.eyJ1IjoiZGF2aWRhc2NoZXIiLCJhIjoiY2oxc3Nhd3l0MDBtajMybXY5azVla2x0MCJ9.ssn3RPzttpNQASihikNBmA";

class MyMap extends React.Component {
  constructor(props) {
    super(props);
    // this.onEachFeature = this.onEachFeature.bind(this);
  }

  // onEachFeature(feature, layer) {
  //   layer.on({
  //     click: function(event) {
  //       leaflet
  //         .popup()
  //         .setLatLng(event.latlng)
  //         .setContent(feature)
  //         .openOn(layer._map); // eslint-disable-line no-undef
  //       // if (component.props.onCountryChange) {
  //       //   component.props.onCountryChange(feature.properties.name);
  //       // }
  //     }
  //   });
  // }

  render() {
    let geojson = {
      type: "FeatureCollection",
      features: []
    };
    if (this.props.data && this.props.data.data) {
      let cases = this.props.data.data[0].hits;
      cases = cases.filter(
        c =>
          c.location &&
          c.location.latitude &&
          c.location.longitude &&
          c.location.latitude !== "undefined" &&
          c.location.latitude !== undefined &&
          c.location.longitude !== "undefined" &&
          c.location.longitude !== undefined
      );
      let casesArray = cases.map(function(obj) {
        console.log(obj.location);

        let coords = coordinates(
          obj.location.latitude + " " + obj.location.longitude
        );
        coords = [coords["lon"], coords["lat"]];
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: coords
          },
          properties: {
            type: "case",
            label: obj.title
          }
        };
      });
      casesArray = casesArray.filter(c => c.geometry.coordinates[0] !== 0);
      let orgs = this.props.data.data[2].hits;
      orgs = orgs.filter(
        c => c.location && c.location.latitude && c.location.longitude
      );
      let orgsArray = orgs.map(function(obj) {
        let coords = coordinates(
          obj.location.latitude + " " + obj.location.longitude
        );
        coords = [coords["lon"], coords["lat"]];
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: coords
          },
          properties: {
            type: "organization",
            label: obj.title
          }
        };
      });
      geojson["features"] = casesArray.concat(orgsArray);
    }
    return (
      <div className="map-component">
        <ReactMapboxGl
          style={"mapbox://styles/mapbox/light-v9"}
          zoom={[1]}
          minZoom={1}
          maxZoom={15}
          containerStyle={styles.container}
          accessToken={accessToken}
        >

          <ZoomControl zoomDiff={1} />
          <GeoJSONLayer
            data={geojson}
            symbolLayout={{
              "icon-image": "suitcase-15"
            }}
          />
        </ReactMapboxGl>
      </div>
    );
  }
}
MyMap.propTypes = {
  onCountryChange: func
};
export default MyMap;
