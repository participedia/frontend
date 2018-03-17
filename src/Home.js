import React from "react";
import { Switch, Route } from "react-router";
import Map from "./containers/Map";
import SearchResults from "./containers/SearchResults";
import { injectIntl } from "react-intl";
import "./Home.css";
import MediaQuery from "react-responsive";

class Home extends React.Component {
  componentWillMount(){
    this.props.handleHome();
  }
  render() {
    return (
      <div className="home">
        <MediaQuery query="(min-device-width: 992px)">
          {/* The next line is so that the Map has the route props */}
          <Route path="/" component={Map} />
        </MediaQuery>
        <Switch>
          <Route exact path="/" render={routeProps => <SearchResults {...routeProps} addSteps={this.props.addSteps} />} />
          <Route exact path="/search" component={SearchResults} />
          <Route
            path="/cases"
            component={() => (
              <SearchResults selectedCategory="Cases" {...this.props} />
            )}
          />
          <Route
            path="/methods"
            component={() => (
              <SearchResults selectedCategory="Methods" {...this.props} />
            )}
          />
          <Route
            path="/organizations"
            component={() => (
              <SearchResults selectedCategory="Organizations" {...this.props} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default injectIntl(Home);
