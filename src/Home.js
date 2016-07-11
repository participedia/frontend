import React from 'react'
import { connect } from 'react-redux'
import Map from './containers/Map'
import SearchResults from './containers/SearchResults'
import FloatingActionButton from 'material-ui/FloatingActionButton'

class Home extends React.Component {

  render () {
    return (
      <div>
        <Map />
        <SearchResults />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cases: state.cases
  }
}

const mapDispatchToProps = (dispatch) => ({
})

export default Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
