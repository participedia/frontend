import React from 'react'
import { Map, TileLayer } from 'react-leaflet'
import geojson from '../world-countries.json'
import Choropleth from 'react-leaflet-choropleth'
import styles from './MapVisualization.css'
import CSSModules from 'react-css-modules'
import api from '../utils/api'

// This is important to make sure that the leaflet.css is included in the document
// the !! syntax is to avoid CSS-module class rewriting.
/* eslint-disable no-unused-vars */
import leafletStylesIgnored from '!!style-loader!css-loader!leaflet/dist/leaflet.css'
/* eslint-enable no-unused-vars */

const style = {
  fillColor: 'rgba(0,0,0,0)',
  color: 'rgba(124,0,0,0)',
  weight: 1,
  opacity: 0,
  fillOpacity: 0.6
}

// watercolor:  'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png'
// 'Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> &mdash; Map data &copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>'

// let mapURL = 'http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}'
// let	attribution = 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'

let mapURL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
let attribution = 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
let maxZoom = 5

let scale = ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026']

//  http://colorbrewer2.org/ for scales
class MyMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {countryCounts: {'France': 10}}
    this.numCasesPerCountry = this.numCasesPerCountry.bind(this)
    this.labelPerCountry = this.labelPerCountry.bind(this)
    this.isCountryListed = this.isCountryListed.bind(this)
    this.onEachFeature = this.onEachFeature.bind(this)
  }

  numCasesPerCountry (feature) {
    let countryName = feature.properties.name
    let count = this.state.countryCounts[countryName]
    if (count) {
      return count
    } else {
      return 0
    }
  }

  labelPerCountry (feature) {
    let countryName = feature.properties.name
    let count = this.numCasesPerCountry(feature)
    if (count > 1) {
      return countryName + ' ' + count + ' cases'
    } else if (count === 1) {
      return countryName + ' ' + count + ' case'
    } else {
      return countryName + ', no cases yet'
    }
  }

  isCountryListed (feature) {
    return this.numCasesPerCountry(feature)
  }

  componentDidMount () {
    api.countsByCountry().then(function success (countryCounts) {
      this.setState({countryCounts: countryCounts})
    }.bind(this))
  }

  onEachFeature (feature, layer) {
    let labelPerCountry = this.labelPerCountry
    let component = this
    layer.on({
      click: function (event) {
        L.popup() // eslint-disable-line no-undef
          .setLatLng(event.latlng)
          .setContent(labelPerCountry(feature))
          .openOn(layer._map)
        /* do a per-country search */
        if (component.props.onCountryChange) {
          component.props.onCountryChange(feature.properties.name)
        }
      }
    })
  }

  render () {
    const position = [51.505, -0.09]
    return (
      <div styleName='map-component'>
        <Map zoom={3} center={position}>
          <TileLayer
            url={mapURL}
            attribution={attribution}
            maxZoom={maxZoom}
          />
          <Choropleth
            data={geojson}
            valueProperty={this.numCasesPerCountry}
            scale={scale}
            visible={this.isCountryListed}
            onEachFeature={this.onEachFeature}
            steps={5}
            mode='e'
            style={style}
          />
        </Map>
        <div styleName='map-information'>
          <div styleName='info-container'>
            <div styleName='legend'>
              <div styleName='marker'><img src='/img/case-marker-icon.png' alt='' /><p>Case</p></div>
              <div styleName='marker'><img src='/img/method-marker-icon.png' alt='' /><p>Method</p></div>
              <div styleName='marker'><img src='/img/organization-marker-icon.png' alt='' /><p>Organization</p></div>
            </div>
            <div styleName='details'>
              <div styleName='col'>
                <p>Case</p>
                <p>Participatory Budgeting<br />(Tower Hamlets, London, UK)</p>
              </div>
              <div styleName='col'>
                <p>Last edit:<br />Scott Fletcher 05/14/2016 - 14:29</p>
              </div>
              <div styleName='col'>
                <p>19 Bedford Place,<br />London WC1B 5JA, U.K.</p>
              </div>
              <div styleName='arrow-col'>
                <img src='/img/pp-map-arrow-icon.png' alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// For offline development use, replace Map component with:
// <div className='map' style={{backgroundImage: 'url(/img/pp-home-map.jpg)'}}></div>

MyMap.propTypes = {
  onCountryChange: React.PropTypes.func
}
export default CSSModules(MyMap, styles)
