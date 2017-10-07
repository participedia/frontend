import React from "react";
import { FormattedMessage } from "react-intl";

const LinkedPropertyGroupWithHeading = ({ heading, property, thing, intl }) =>
  thing[property] && thing[property] !== "null" ? (
    <div>
      <p className="sub-sub-heading">
        <FormattedMessage id={heading ? heading : "not_specified"} />
      </p>
      <div className={property}><FormattedMessage id={thing[property]}/></div>
    </div>
  ) : (
    <div />
  );

export default LinkedPropertyGroupWithHeading;
