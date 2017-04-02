import React from "react";
import api from "../utils/api";
import SearchResults from "./SearchResults";

export default class Bookmarked extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }
  componentDidMount(props) {
    api.getBookmarkedItems().then(data => this.setState({ data }));
  }
  render() {
    if (this.state.data) {
      return <SearchResults data={this.state.data} />;
    } else {
      return <div />;
    }
  }
}
