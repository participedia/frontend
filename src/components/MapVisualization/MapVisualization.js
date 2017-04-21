import React from "react";
import { func } from "prop-types";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

import { Map, Marker, TileLayer, GeoJSON } from "react-leaflet";

import "./MapVisualization.css";
// eslint-disable-next-line
import sleep from "leaflet-sleep";

import coordinates from "parse-dms";

// See https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-261904061 for this hack fix to a leaflet issue
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

let mapURL =
  "http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png";
mapURL =
  "http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}";
let attribution =
  "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012";
let maxZoom = 14;

class GeoJSONUpdatable extends GeoJSON {
  componentWillReceiveProps(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.leafletElement.clearLayers();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.leafletElement.addData(this.props.data);
    }
  }
}

class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.onEachFeature = this.onEachFeature.bind(this);
  }

  onEachFeature(feature, layer) {
    layer.on({
      click: function(event) {
        leaflet
          .popup()
          .setLatLng(event.latlng)
          .setContent(feature)
          .openOn(layer._map); // eslint-disable-line no-undef
        // if (component.props.onCountryChange) {
        //   component.props.onCountryChange(feature.properties.name);
        // }
      }
    });
  }

  render() {
    const position = [51.505, -0.09];
    // let data = this.state.geojson;
    let geojson = {
      type: "FeatureCollection",
      features: []
    };
    if (this.props.data && this.props.data.data) {
      console.log("DATA", this.props.data);
      console.log(this.props.data.data[0].hits);
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
        console.log("COORDS", coords);
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
      console.log(casesArray, orgsArray);
      geojson["features"] = casesArray.concat(orgsArray);
    }
    console.log("geojson", geojson);

    return (
      <div className="map-component">
        <Map
          zoom={3}
          maxZoom={maxZoom}
          center={position}
          sleep={true}
          hoverToWake={false}
          wakeMessage="Click to wake map"
          sleepOpacity={0.9}
        >
          <TileLayer url={mapURL} attribution={attribution} maxZoom={maxZoom} />
          <GeoJSONUpdatable data={geojson} />
        </Map>
      </div>
    );
  }
}

// For offline development use, replace Map component with:
// <div className='map' style={{backgroundImage: 'url(/img/pp-home-map.jpg)'}}></div>

MyMap.propTypes = {
  onCountryChange: func
};
export default MyMap;
