import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";

import ChoroplethExp from "../experiments/ChoroplethExp";
// import { Madrid } from "../../experiments/Madrid";

const ExperimentIndex = () => (
  <ul>
    <li>
      <Link to={"/experiments/choropleth"}>
        <p>World map with density of cases</p>
      </Link>
    </li>
    <li>
      <Link to={"/experiments/madrid"}>
        <p>Bubble visualizaiton prototype</p>
      </Link>
    </li>
  </ul>
);

export default class Experiments extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/experiments" render={ExperimentIndex} />
        <Route exact path="/experiments/choropleth" component={ChoroplethExp} />
      </div>
    );
  }
}
