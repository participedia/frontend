import React from "react";
import { FormattedMessage } from "react-intl";

const LinkedPropertyGroupWithHeading = ({ heading, property, thing, intl }) =>
  thing[property] && thing[property] !== "null" ? (
    <div className="linked-property">
      <p className="sub-sub-heading">
        <FormattedMessage id={heading ? heading : "not_specified"} />
      </p>
      <div className={property + " blond"}><FormattedMessage id={thing[property]}/></div>
    </div>
  ) : (
    <div />
  );

export default LinkedPropertyGroupWithHeading;
