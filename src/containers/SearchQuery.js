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
    const searchFilterTypes = ["case", "organization", "method"];

    // if current url contains one of these filter types
    // ie: /case/123
    // then use filter url
    // ie: case => /cases?query=${query}

    // if not then use home/search url /?query=query

    let searchFilter = "";
    searchFilterTypes.forEach(type => {
      if (window.location.pathname.indexOf(type) === 1) {
        searchFilter = type + "s";
      }
    });
    this.props.history.push(`/${searchFilter}?query=${query}`);
  }
}
