import React from "react";
import Map from "./containers/Map";
import SearchResults from "./containers/SearchResults";
import {
  injectIntl
} from "react-intl";
import "./Home.css";

class Home extends React.Component {

  shouldComponentUpdate(newProps) {
    console.log(this.props, newProps);
    return false;
  }

  render() {
    return ( <
      div className = "home" >
      <
      Map / >
      <
      SearchResults { ...this.props
      }
      /> <
      /div>
    );
  }
}

export default injectIntl(Home);
