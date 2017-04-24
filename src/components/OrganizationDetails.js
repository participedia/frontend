import React from "react";

import SearchLink from "../components/SearchLink";
import CountryMap from "../components/CountryMap";
import LinkedPropertyGroupWithHeading
  from "../components/LinkedPropertyGroupWithHeading";

export default class OrganizationDetails extends React.Component {
  render() {
    let thing = this.props.case;
    let intl = this.props.intl;
    let tags = <div />;
    if (thing.tags) {
      tags = thing.tags.map(tag => (
        <SearchLink intl={intl} key={tag} tag="tag" value={tag} />
      ));
    }
    let ed = null;
    if (thing.executive_director) {
      ed = (
        <div>
          <p className="sub-heading">
            {intl.formatMessage({ id: "executive_director" })}
          </p>
          <div className="sub-sub-heading">
            {thing.executive_director}
          </div>
        </div>
      );
    }
    return (
      <div>
        <CountryMap
          city={thing.location.city}
          countrycode={thing.location.country}
        />
        <p className="sub-heading">
          Keywords
        </p>
        <p className="sub-sub-heading">
          Tags:
        </p>
        <div className="tags">
          {tags}
        </div>
        {ed}

        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="sector"
          property="sector"
          thing={thing}
        />
      </div>
    );
  }
}
