import { connect } from "react-redux";
import {
  switchCategory,
  setSortOrderAndSearch,
  setLayoutOrder
} from "../actions";
import SearchResultsView
  from "../components/SearchResultsView/SearchResultsView";

const mapStateToProps = state => {
  let props = {
    data: state.cases.data || [],
    query: state.cases.query || "",
    searching: state.cases.searching || false,
    sortingMethod: state.ui.sort || "chronological",
    selectedCategory: state.ui.category || "All",
    selectedViewType: state.ui.layout || "grid"
  };
  return props;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCategoryChange(newCategory) {
    dispatch(
      switchCategory(newCategory, this.props.query, this.props.sortingMethod)
    );
  },
  onSortingChange(query, sortingCategory, sort) {
    dispatch(setSortOrderAndSearch(query, sortingCategory, sort));
  },
  onLayoutChange(sort) {
    dispatch(setLayoutOrder(sort));
  },
  startDownload() {}
});

const SearchResults = connect(mapStateToProps, mapDispatchToProps)(
  SearchResultsView
);

export default SearchResults;
