import React from "react";
import { FormattedMessage } from "react-intl";
import _ from "underscore";
import "./ListWithHeading.css";

export default class NestedTextListGroupWithHeading extends React.Component {
  render() {
    let { heading, property, thing } = this.props;
    let value = thing[property];

    if (!value || (_.isArray(value) && !value.length)) {
      return null;
    } else {
      const items = Object.keys(value).map(key => {
        if (!value[key]) return null;

        // don't display the name key for the location property
        if (property === "location" && key === "name") return null;

        return <div key={value[key]}>{value[key]}</div>;
      }).filter(item => item !== null);

      return (
        <div className="linked-property isarray">
          <p className="sub-sub-heading">
            <FormattedMessage id={property} />
          </p>
          <div className={property + " blond"}>{items}</div>
        </div>
      );
    }
  }
}
