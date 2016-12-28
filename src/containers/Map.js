import { connect } from 'react-redux'
import { search } from '../actions'
import MapVisualization from '../components/MapVisualization/MapVisualization'

const mapDispatchToProps = (dispatch) => ({
  onCountryChange: (country) => {
    dispatch(search('geo_country:' + country))
  }
})

const Map = connect(
  undefined,
  // mapStateToProps,
  mapDispatchToProps
)(MapVisualization)

export default Map
