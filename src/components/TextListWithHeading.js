import React from "react";
import { FormattedMessage } from "react-intl";
import _ from "underscore";
import "./ListWithHeading.css";
import { deDupeThings } from "../util.js";

export default class TextListGroupWithHeading extends React.Component {
  render() {
    let { heading, property, thing } = this.props;
    if (!heading) {
      heading = property;
    }
    let value = thing[property];
    if (!value || (_.isArray(value) && !value.length)) {
      return null;
    } else if (_.isArray(value)) {
      if (property === "has_components") {
        value = deDupeThings(value);
      }
      let items = value.map(item => (
        <div key={item.value}>
          <FormattedMessage id={item.text || item.title || item} />
        </div>
      ));
      return (
        <div className="linked-property isarray">
          <p className="sub-sub-heading">
            <FormattedMessage id={heading} />
          </p>
          <div className={property + " blond"}>{items}</div>
        </div>
      );
    } else {
      return (
        <div className="linked-property">
          <p className="sub-sub-heading">
            <FormattedMessage id={heading} />
          </p>
          <div className={property + " blond"}>
            <FormattedMessage id={value.text || value.title || value} />
          </div>
        </div>
      );
    }
  }
}
