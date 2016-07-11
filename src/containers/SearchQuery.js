import { connect } from 'react-redux'
import { search } from '../actions'
import SearchQueryField from '../components/SearchQueryField'

const mapStateToProps = (state) => {
  return {
    query: state.cases.query || '',
    searching: state.cases.searching || false,
    sortingMethod: state.ui.sort || 'chronological',
    selectedCategory: state.ui.category || 'All',
    selectedViewType: state.ui.layout || 'grid'
  }
}

const mapDispatchToProps = (dispatch) => ({
  onPerformQuery: (query, selectedCategory, sortingMethod) => {
    try {
      let action = search(query, selectedCategory, sortingMethod)
      dispatch(action)
    } catch (e) {
      console.log('error in onPerformQuery', e)
    }
  }
})

const SearchQuery = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchQueryField)

export default SearchQuery
