import React from "react";

export default class ListGroupWithHeading extends React.Component {
  render() {
    let { heading, property, thing, intl } = this.props;
    if (!thing[property]) {
      return <div />;
    }
    let items = thing[property].map(item =>
      <div key={item} className="link">{item}</div>
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
