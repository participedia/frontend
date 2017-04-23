import React from "react";
import api from "../utils/api";
import myhistory from "../utils/history";
import queryString from "query-string";

import SearchResultsView
  from "../components/SearchResultsView/SearchResultsView";
const DEFAULT_SORTING_METHOD = "chronological";
const DEFAULT_CATEGORY = "All";
export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      searching: true,
      selectedCategory: DEFAULT_CATEGORY,
      sortingMethod: DEFAULT_SORTING_METHOD,
      selectedViewType: "grid"
    };
  }
  componentDidMount() {
    let queryArgs = { q: "" };
    if (myhistory.location.search) {
      queryArgs = queryString.parse(myhistory.location.search);
      this.setState(queryArgs);
    }
    this._updateSearch({});
  }
  _updateSearch(newState) {
    let queryArgs = {
      q: this.state.query
    };
    // we need to act as if the state had been updated, but setState hasn't happened yet.
    let futureState = {};
    Object.assign(futureState, this.state, newState);

    if (futureState.sortingMethod !== DEFAULT_SORTING_METHOD) {
      queryArgs["sortingMethod"] = futureState.sortingMethod;
    }
    if (futureState.selectedCategory !== DEFAULT_CATEGORY) {
      queryArgs["selectedCategory"] = futureState.selectedCategory;
    }
    console.log(newState, futureState, this.state, queryArgs);
    let component = this;
    api.performSearch(queryArgs).then(function(results) {
      component.setState({ data: results.results, searching: false });
    });
    this.setState(newState);
  }
  onSortingChange(method) {
    this._updateSearch({ sortingMethod: method });
  }
  onLayoutChange(layout) {
    this.setState({ selectedViewType: layout });
  }
  onCategoryChange(category) {
    this._updateSearch({ selectedCategory: category });
  }
  startDownload() {}

  render() {
    let onCategoryChange = this.onCategoryChange.bind(this);
    let onLayoutChange = this.onLayoutChange.bind(this);
    let onSortingChange = this.onSortingChange.bind(this);
    let startDownload = this.startDownload.bind(this);
    if (this.state.data) {
      return (
        <SearchResultsView
          selectedViewType={this.state.selectedViewType}
          selectedCategory={this.state.selectedCategory}
          sortingMethod={this.state.sortingMethod}
          data={this.state.data}
          query={this.state.query}
          onCategoryChange={onCategoryChange}
          onLayoutChange={onLayoutChange}
          startDownload={startDownload}
          onSortingChange={onSortingChange}
        />
      );
    } else {
      return <div>Searching...</div>;
    }
  }
}
