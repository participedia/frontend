import React from "react";
import { FormattedMessage } from "react-intl";
import _ from "underscore";
import "./ListWithHeading.css";

export default class TextListGroupWithHeading extends React.Component {
  render() {
    let { heading, property, thing } = this.props;
    let value = thing[property];
    if (!value || (_.isArray(value) && !value.length)) {
      console.log("!value TextList %s: %o", property, value);
      return <div />;
    } else if (_.isArray(thing[property])) {
      console.log("is Array TextList %s: %o", property, value.children);
      let items = thing[property].map(item => (
        <div key={item.value}>
          <FormattedMessage id={item.value || item} />
        </div>
      ));
      return (
        <div className="linked-property isarray">
          <p className="sub-sub-heading">
            <FormattedMessage id={property} />
          </p>
          <div className={property + " blond"}>{items}</div>
        </div>
      );
    } else {
      console.log("Else TextList %s: %o", property, value);
      return (
        <div className="linked-property">
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
