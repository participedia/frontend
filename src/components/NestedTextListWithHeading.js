import React from "react";
import { FormattedMessage } from "react-intl";
import _ from "underscore";
import "./ListWithHeading.css";
import { TextProp } from "../components/Props";

export default class NestedTextListGroupWithHeading extends React.Component {
  render() {
    let { heading, property, thing } = this.props;
    let value = thing[property];

    return (
      <div className="linked-property isarray">
        <p className="sub-sub-heading">
          <FormattedMessage id={property} />
        </p>
        <div className={property + " blond"}>
          <TextProp label="city" property="city" thing={thing} />
          <TextProp label="province" property="province" thing={thing} />
          <TextProp label="country" property="country" thing={thing} />
        </div>
      </div>
    );
  }
}
