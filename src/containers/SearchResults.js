import { connect } from 'react-redux'
import { switchCategory, setSortOrderAndSearch, setLayoutOrder } from '../actions'
import SearchResultsView from '../components/SearchResultsView'

const mapStateToProps = (state) => {
  return {
    caseData: state.cases.caseData || [],
    query: state.cases.query || '',
    searching: state.cases.searching || false,
    sortingMethod: state.ui.sort || 'chronological',
    selectedCategory: state.ui.category || 'All',
    selectedViewType: state.ui.layout || 'grid'

  }
}

const mapDispatchToProps = (dispatch) => ({
  onCategoryChange (category) {
    dispatch(switchCategory(category))
  },
  onSortingChange (query, sortingCategory, sort) {
    dispatch(setSortOrderAndSearch(query, sortingCategory, sort))
  },
  onLayoutChange (sort) {
    dispatch(setLayoutOrder(sort))
  },
  startDownload () {
  }
})

const SearchResults = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsView)

export default SearchResults
