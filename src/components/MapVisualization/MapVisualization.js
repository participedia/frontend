import React from 'react'
import { Map, TileLayer } from 'react-leaflet'
import geojson from '../../world-countries.json'
import Choropleth from 'react-leaflet-choropleth'
import './MapVisualization.css'
import api from '../../utils/api'
import caseMarkerIcon from '../../img/case-marker-icon.png'
import methodMarkerIcon from '../../img/method-marker-icon.png'
import orgMarkerIcon from '../../img/organization-marker-icon.png'
import mapArrowIcon from '../../img/pp-map-arrow-icon.png'

import 'leaflet/dist/leaflet.css'

const style = {
  fillColor: 'rgba(0,0,0,0)',
  color: 'rgba(124,0,0,0)',
  weight: 1,
  opacity: 0,
  fillOpacity: 0.6
}

let mapURL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
let attribution = 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
let maxZoom = 5

let scale = ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026']

//  http://colorbrewer2.org/ for scales
class MyMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {countryCounts: {}}
    this.numCasesPerCountry = this.numCasesPerCountry.bind(this)
    this.labelPerCountry = this.labelPerCountry.bind(this)
    this.isCountryListed = this.isCountryListed.bind(this)
    this.onEachFeature = this.onEachFeature.bind(this)
  }

  numCasesPerCountry (feature) {
    let countryName = feature.properties.name
    let count = this.state.countryCounts[countryName.toLowerCase()]
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
      <div className='map-component'>
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
        <div className='map-information'>
          <div className='info-container'>
            <div className='legend'>
              <div className='marker'><img src={caseMarkerIcon} alt='' /><p>Case</p></div>
              <div className='marker'><img src={methodMarkerIcon} alt='' /><p>Method</p></div>
              <div className='marker'><img src={orgMarkerIcon} alt='' /><p>Organization</p></div>
            </div>
            <div className='details'>
              <div className='col'>
                <p>Case</p>
                <p>Participatory Budgeting<br />(Tower Hamlets, London, UK)</p>
              </div>
              <div className='col'>
                <p>Last edit:<br />Scott Fletcher 05/14/2016 - 14:29</p>
              </div>
              <div className='col'>
                <p>19 Bedford Place,<br />London WC1B 5JA, U.K.</p>
              </div>
              <div className='arrow-col'>
                <img src={mapArrowIcon} alt='' />
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
export default MyMap
