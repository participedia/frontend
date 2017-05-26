import React from "react";
import { Route } from "react-router";

const ExperimentIndex = () => (
  <ul>
    <li>
      TBD
    </li>
  </ul>
);

export default class Experiments extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/experiments" render={ExperimentIndex} />
      </div>
    );
  }
}
