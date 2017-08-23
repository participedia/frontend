import React from "react";
import { Link } from "react-router-dom";
import "./ListWithHeading.css";

export default class ListGroupWithHeading extends React.Component {
  render() {
    let { heading, property, thing, intl } = this.props;
    if (!thing[property] || thing[property].length === 0) {
      return <div />;
    }
    let items = thing[property].map(item =>
      <div>
        <Link target="_blank" key={item} to={item}>
          {item}
        </Link>
      </div>
    );
    return (
      <div>
        <p className="sub-sub-heading">
          {intl.formatMessage({ id: heading ? heading : "not_specified" })}
        </p>
        <div className={property}>
          {items}
        </div>
      </div>
    );
  }
}
