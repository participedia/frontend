import React from "react";
import "./ListWithHeading.css";

export default class ListGroupWithHeading extends React.Component {
  render() {
    let { heading, property, thing, intl } = this.props;
    if (!thing[property] || thing[property].length === 0) {
      return <div />;
    }
    let items = thing[property].map(item =>
      <div>
        { (!/^https?:\/\//i.test(item)) ?
        <a target="_blank" key={item} href={'http://' + item}>
          {item}
        </a>
        :
        <a target="_blank" key={item} href={item}>
          {item}
        </a>
        }
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
