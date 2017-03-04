import React from "react";
import { connect } from "react-redux";
import Map from "./containers/Map";
import SearchResults from "./containers/SearchResults";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Map />
        <SearchResults />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cases: state.cases
  };
};

export default connect(mapStateToProps)(Home);
