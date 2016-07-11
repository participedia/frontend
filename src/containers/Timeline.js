import { connect } from 'react-redux'
import { search } from '../actions'
import MapVisualization from '../components/MapVisualization'

const mapDispatchToProps = (dispatch) => ({
  onCountryChange: (country) => {
    try {
      dispatch(search('Country:' + country))
    } catch (e) {
      console.log(e)
    }
  }
})

const Map = connect(
  undefined,
  mapDispatchToProps
)(MapVisualization)

export default Map
