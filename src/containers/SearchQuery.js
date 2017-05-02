import React from "react";
import myhistory from "../utils/history";
import SearchQueryField from "../components/SearchQueryField/SearchQueryField";
import queryString from "query-string";

export default class SearchQuery extends React.Component {
  render() {
    let params = queryString.parse(myhistory.location.search);
    let searchTerm;
    if (params.query) {
      searchTerm = params.query;
    } else {
      searchTerm = "";
    }
    return (
      <SearchQueryField
        query={searchTerm}
        onPerformQuery={this.onPerformQuery.bind(this)}
      />
    );
  }
  onPerformQuery(query, selectedCategory, sortingMethod) {
    myhistory.push(`/search?query=${query}`);
  }
}
