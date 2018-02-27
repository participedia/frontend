import React from "react";
import { FormattedMessage } from "react-intl";
import _ from "underscore";

export default class TextListGroupWithHeading extends React.Component {
  render() {
    let { heading, property, thing } = this.props;
    let value = thing[property];
    if (!value || (_.isArray(value) && !value.length)) {
      return <div />;
    } else if (_.isArray(thing[property])) {
      let items = thing[property].map(item => (
        <div key={item.value}>
          <FormattedMessage id={item.value || item} />
        </div>
      ));
      return (
        <div>
          <p className="sub-sub-heading">
            <FormattedMessage id={property} />
          </p>
          <div className={property}>{items}</div>
        </div>
      );
    } else {
      return (
        <div>
          <p className="sub-sub-heading">
            <FormattedMessage id={property ? property : "not_specified"} />
          </p>
          <div className={property + " blond"}>
            <FormattedMessage id={value} />
          </div>
        </div>
      );
    }
  }
}
