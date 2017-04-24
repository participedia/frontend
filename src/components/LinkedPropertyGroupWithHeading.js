import React from "react";
import SearchLink from "./SearchLink";

const LinkedPropertyGroupWithHeading = ({ heading, property, thing, intl }) =>
  (thing[property]
    ? <div>
        <p className="sub-sub-heading">
          {intl.formatMessage({ id: heading ? heading : "not_specified" })}
        </p>
        <div className={property}>
          <SearchLink intl={intl} tag={property} value={thing[property]} />
        </div>
      </div>
    : <div />);

export default LinkedPropertyGroupWithHeading;
