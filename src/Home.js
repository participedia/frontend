import React from "react";
import { Switch, Route } from "react-router";
import Map from "./containers/Map";
import SearchResults from "./containers/SearchResults";
import { injectIntl } from "react-intl";
import "./Home.css";
import MediaQuery from "react-responsive";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <MediaQuery query="(min-device-width: 992px)">
          <Map />
        </MediaQuery>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <SearchResults {...this.props} />}
          />
          <Route
            exact
            path="/search"
            component={() => <SearchResults {...this.props} />}
          />
          <Route
            path="/cases"
            component={() =>
              <SearchResults selectedCategory="Cases" {...this.props} />}
          />
          <Route
            path="/methods"
            component={() =>
              <SearchResults selectedCategory="Methods" {...this.props} />}
          />
          <Route
            path="/organizations"
            component={() =>
              <SearchResults
                selectedCategory="Organizations"
                {...this.props}
              />}
          />
        </Switch>

      </div>
    );
  }
}

export default injectIntl(Home);
