import React from "react";
import { FormattedMessage } from "react-intl";
import "./ListWithHeading.css";

export default class ListGroupWithHeading extends React.Component {
  render() {
    let { heading, property, thing } = this.props;
    if (!thing[property] || thing[property].length === 0 || thing[property][0] === "" ) {
      return <div />;
    }
    let items = thing[property].map(item => (
      <div key={item}>
        {!/^https?:\/\//i.test(item) ? (
          <FormattedMessage id={item} />
        ) : (
          <a target="_blank" href={item}>
            {item}
          </a>
        )}
      </div>
    ));
    return (
      <div>
        <p className="sub-sub-heading">
          <FormattedMessage id={heading ? heading : "not_specified"} />
        </p>
        <div className={property}>{items}</div>
      </div>
    );
  }
}
