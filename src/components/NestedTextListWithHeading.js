import React from "react";
import { FormattedMessage } from "react-intl";
import _ from "underscore";
import "./ListWithHeading.css";

export default class NestedTextListGroupWithHeading extends React.Component {
  render() {
    let { heading, property, thing } = this.props;
    let value = thing[property];

    if (!value || (_.isArray(value) && !value.length)) {
      return <div />;
    } else {

      let items = _.map(value, value.children);
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
