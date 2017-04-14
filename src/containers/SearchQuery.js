import { connect } from "react-redux";
import { search } from "../actions";
import SearchQueryField from "../components/SearchQueryField/SearchQueryField";

const mapStateToProps = (state, { location }) => {
  let query = "";
  if (location && location.queryObj) {
    let queryObj = location.query;
    query = Object.keys(queryObj)
      .map(function(a) {
        return a + ":" + JSON.stringify(queryObj[a]);
      })
      .join(",");
  }

  return {
    query: state.cases.query || query,
    searching: state.cases.searching || false,
    sortingMethod: state.ui.sort || "chronological",
    selectedCategory: state.ui.category || "All",
    selectedViewType: state.ui.layout || "grid"
  };
};

const mapDispatchToProps = dispatch => ({
  onPerformQuery: (query, selectedCategory, sortingMethod) => {
    try {
      let action = search(query, selectedCategory, sortingMethod);
      dispatch(action);
    } catch (e) {
      console.log("error in onPerformQuery", e);
    }
  }
});

const SearchQuery = connect(mapStateToProps, mapDispatchToProps)(
  SearchQueryField
);

export default SearchQuery;
