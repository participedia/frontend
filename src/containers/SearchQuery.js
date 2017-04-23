import { connect } from "react-redux";
import myhistory from "../utils/history";
import SearchQueryField from "../components/SearchQueryField/SearchQueryField";
import queryString from "query-string";

const mapStateToProps = (state, { location }) => {
  let query = "";
  if (myhistory.location.search) {
    query = queryString.parse(myhistory.location.search)["query"];
  }
  // if (location && location.queryObj) {
  //   let queryObj = location.query;
  //   query = Object.keys(queryObj)
  //     .map(function(a) {
  //       return a + ":" + JSON.stringify(queryObj[a]);
  //     })
  //     .join(",");
  // }

  return {
    query: query,
    searching: state.cases.searching || false,
    sortingMethod: state.ui.sort || "chronological",
    selectedCategory: state.ui.category || "All",
    selectedViewType: state.ui.layout || "grid"
  };
};

const mapDispatchToProps = dispatch => ({
  onPerformQuery: (query, selectedCategory, sortingMethod) => {
    console.log("in onPerformQuery", query);
    myhistory.push(`/search?q=${query}`);
  }
});

const SearchQuery = connect(mapStateToProps, mapDispatchToProps)(
  SearchQueryField
);

export default SearchQuery;
