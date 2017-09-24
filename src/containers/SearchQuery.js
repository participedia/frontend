import React from "react";
import SearchQueryField from "../components/SearchQueryField/SearchQueryField";
import queryString from "query-string";

export default class SearchQuery extends React.Component {
  constructor(props) {
    super(props);
    let params = queryString.parse(this.props.location.search);
    this.state = { params };
  }

  componentWillReceiveProps(nextProps) {
    let params = queryString.parse(this.props.location.search);
    this.setState({ params });
  }

  render() {
    let searchTerm;
    let params = queryString.parse(this.props.location.search);
    // const params = this.state.params;
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
    this.props.history.push(`/search?query=${query}`);
  }
}
