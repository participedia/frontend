import React from "react";
import Map from "../containers/Map";

const fullscreenMapStyle = {
  container: {
    height: "100vh",
    width: "100vw"
  },
  button: {
    cursor: "pointer"
  },
  stationDescription: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "16px 0px",
    textAlign: "center",
    backgroundColor: "white"
  },
  popup: {},
  btnWrapper: {
    position: "absolute",
    textAlign: "center",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%"
  },
  btnStationOpen: {
    marginBottom: 140
  },
  btn: {
    backgroundColor: "rgb(71, 144, 229)",
    color: "white",
    marginBottom: "20px",
    padding: "10px 20px",
    borderRadius: 4,
    border: "1px solid #5867BC",
    outline: "none"
  },
  type: {
    textTransform: "uppercase"
  }
};

const fullscreenMarkerLayout = {
  "text-line-height": 1,
  "text-padding": 0,
  "text-anchor": "bottom",
  "text-allow-overlap": true,
  "text-field": String.fromCharCode("0xe0C8"), // see https://github.com/mapbox/mapbox-gl-js/issues/3605#issuecomment-296486123 for the why.
  "icon-optional": true,
  "text-font": ["Material Icons Regular"], // ["FontAwesome Regular"] is also available
  "text-size": 18
};

export default class Fullscreen extends React.Component {
  render() {
    return (
      <Map
        styles={fullscreenMapStyle}
        markerLayout={fullscreenMarkerLayout}
        center={[0, 0]}
      />
    );
  }
}
