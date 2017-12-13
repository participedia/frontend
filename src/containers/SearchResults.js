import React from "react";
import api from "../utils/api";
import queryString from "query-string";

import SearchResultsView from "../components/SearchResultsView/SearchResultsView";
import ExportDataDialog from "../components/ExportDataDialog";
const DEFAULT_SORTING_METHOD = "chronological";
const DEFAULT_CATEGORY = "all";
export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      query: "",
      total: 0,
      pages: 0,
      searching: true,
      selectedCategory: this.props.selectedCategory || DEFAULT_CATEGORY,
      sortingMethod: DEFAULT_SORTING_METHOD,
      selectedViewType: "grid",
      error: false,
      showExportDialog: false,
    };
  }
  componentDidMount() {
    let queryArgs = { query: "" };
    if (this.props.location.search) {
      queryArgs = queryString.parse(this.props.location.search);
    }
    this._updateSearch(queryArgs);
  }
  componentWillReceiveProps(nextProps) {
    this._updateSearch(queryString.parse(nextProps.location.search));
  }

  _updateSearch(newState) {
    let queryArgs = {
      query: this.state.query
    };
    // we need to act as if the state had been updated, but setState hasn't happened yet.
    let futureState = {};
    futureState.selectedCategory =
      newState.selectedCategory || this.state.selectedCategory;
    if (futureState.selectedCategory === "all") {
      delete futureState.selectedCategory;
    }
    futureState.query = newState.query || this.state.query;
    if (!futureState.query) {
      delete futureState.query; // query= is not the same thing as not specifying query (which is "Featured")
    }
    futureState.page = newState.page || this.state.page || 1;

    if (futureState.sortingMethod !== DEFAULT_SORTING_METHOD) {
      queryArgs["sortingMethod"] = futureState.sortingMethod;
    }
    if (futureState.selectedCategory !== DEFAULT_CATEGORY) {
      queryArgs["selectedCategory"] = futureState.selectedCategory;
    }
    let component = this;
    this.setState({ searching: true });
    api.performSearch(futureState).then(function(results) {
      if (results.results) {
        component.setState({
          data: results.results,
          total: results.total,
          pages: results.pages,
          searching: false
        });
      } else {
        if (results.error) {
          if (results.error.code)
            component.setState({
              error: results.error.code
            });
        } else {
          component.setState({
            error: results.error
          });
        }
      }
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
  openExportDialog(category) {
    this.setState({ showExportDialog: true });
  }

  render() {
    if (this.state.error) {
      console.error(this.state.error);
      return (
        <div className="error-message">
          Error doing search: ${this.state.error}
        </div>
      );
    }
    let onCategoryChange = this.onCategoryChange.bind(this);
    let onLayoutChange = this.onLayoutChange.bind(this);
    let onSortingChange = this.onSortingChange.bind(this);
    let openExportDialog = this.openExportDialog.bind(this);
    return (
      <div>
        <ExportDataDialog
			    open={this.state.showExportDialog}
			    thingtype={this.state.selectedCategory}
			  />
        <SearchResultsView
          location={this.props.location}
          selectedViewType={this.state.selectedViewType}
          selectedCategory={this.state.selectedCategory}
          sortingMethod={this.state.sortingMethod}
          data={this.state.data}
          total={this.state.total}
          pages={this.state.pages}
          searching={this.state.searching}
          query={this.state.query}
          onCategoryChange={onCategoryChange}
          onLayoutChange={onLayoutChange}
          openExportDialog={openExportDialog}
          onSortingChange={onSortingChange}
          history={this.props.history}
        />
      </div>
    );
  }
}
