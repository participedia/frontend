import React from "react";

const LinkedPropertyGroupWithHeading = ({ heading, property, thing, intl }) =>
  thing[property] && thing[property] !== "null"
    ? <div>
        <p className="sub-sub-heading">
          {intl.formatMessage({ id: heading ? heading : "not_specified" })}
        </p>
        <div className={property}>
          {thing[property]}
        </div>
      </div>
    : <div />;

export default LinkedPropertyGroupWithHeading;
