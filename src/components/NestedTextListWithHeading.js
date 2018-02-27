import React from "react";
import { FormattedMessage } from "react-intl";
import _ from "underscore";
import "./ListWithHeading.css";

export default class NestedTextListGroupWithHeading extends React.Component {
  render() {
    let { heading, property, thing } = this.props;
    let value = thing[property];
    let spawn = value.spawn

    if (!value || (_.isArray(value) && !value.length)) {
      console.log("!value NestedTextList %s: %o", property, value);
      return <div />;
    } else {
      console.log("is Array NestedTextList %s: %o", property, value);

      let items = _.map(value, value.children);
      console.log("Nested Items %s: %o",property, items);
      let nests  = items.map(item => (
        <div key={item.value}>
          {item}
        </div>
      ));
      return (
        <div className="linked-property isarray">
          <p className="sub-sub-heading">
            <FormattedMessage id={property} />
          </p>
          <div className={property + " blond"}>{nests}</div>
        </div>
      );
    }
  }
}
