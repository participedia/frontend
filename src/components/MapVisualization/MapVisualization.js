import React from "react";
import { Link } from "react-router-dom";
import { func } from "prop-types";
import { Map, Layer, Feature, Popup, ZoomControl } from "react-mapbox-gl";
import store from "store";

import "./MapVisualization.css";
const accessToken =
  "pk.eyJ1IjoiZGF2aWRhc2NoZXIiLCJhIjoiY2l2dTBlc2swMDAzcjJ0bW4xdTJ1ZGZhZSJ9.uxbzY-xlJ1FJ7lu95S_9cw";
const styleURL = "mapbox://styles/davidascher/cj1u1ogkc00242sll48w3zzt8";

const itemMarkerPaint = {
  "text-translate-anchor": "viewport",
  "text-color": "#000"
};

const itemSearchMarkerPaint = {
  "text-translate-anchor": "viewport",
  "text-color": "#EC1414"
};

class MapVisualization extends React.Component {
  constructor(props) {
    super(props);
    let component = this;
    if (store.get("geolocated_once") == null) {
      // For fun, we offer to center the map on where the viewer is.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;
          component.setState({
            center: [lng, lat],
            zoom: [6]
          });
          store.set("geolocated_once", "true");
        });
      }
    }

    this.state = {
      popupShowLabel: true,
      center: props.center || [15, 1],
      zoom: [0],
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
    const { focus, popupShowLabel } = this.state;
    const { items, styles } = this.props;
    if (!items) return <div />;
    let popupChange = this._popupChange.bind(this);
    let clearPopup = this._clearPopup.bind(this);
    const itemSearchFeatures = items
      .filter(st => st.searchmatched)
      .map((st, index) => (
        <Feature
          key={st.id}
          onClick={this._markerClick.bind(this, st)}
          coordinates={st.position}
        />
      ));
    const itemFeatures = items
      .filter(st => !st.searchmatched)
      .map((st, index) => (
        <Feature
          key={st.id}
          onClick={this._markerClick.bind(this, st)}
          coordinates={st.position}
          paint={itemMarkerPaint}
        />
      ));
    const markerLayout = Object.assign({}, this.props.markerLayout, {
      // "text-field": String.fromCharCode("0xe55f")
    });
    const searchMarkerLayout = Object.assign({}, this.props.markerLayout, {
      // "text-field": String.fromCharCode("0xe0C8")
    });

    return (
      <div className="map-component">
        <Map
          // the following isn't a normal `style` prop, can be a URL.
          style={styleURL} // eslint-disable-line react/style-prop-object
          center={this.state.center}
          scrollZoom={false}
          touchZoomRotate
          zoom={this.state.zoom}
          minZoom={1}
          maxZoom={15}
          onClick={clearPopup}
          containerStyle={styles.container}
          accessToken={accessToken}
        >
          <ZoomControl zoomDiff={1} />
          {itemFeatures ? (
            <Layer type="symbol" layout={markerLayout} paint={itemMarkerPaint}>
              {itemFeatures}
            </Layer>
          ) : (
            <div />
          )}
          {itemSearchFeatures ? (
            <Layer
              type="symbol"
              id="items"
              layout={searchMarkerLayout}
              paint={itemSearchMarkerPaint}
            >
              {itemSearchFeatures}
            </Layer>
          ) : (
            <div />
          )}
          {focus && (
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
                  </span>
                  <Link to={focus.url}> {focus.title}</Link>
                </span>
                <div onClick={() => popupChange(!popupShowLabel)}>
                  {popupShowLabel ? "Hide" : "Show"}
                </div>
              </div>
            </Popup>
          )}
        </Map>
      </div>
    );
  }
}
MapVisualization.propTypes = {
  onCountryChange: func
};
export default MapVisualization;
