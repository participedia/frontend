import React from "react";

import SearchLink from "../components/SearchLink";
import CountryMap from "../components/CountryMap";
import LinkedPropertyGroupWithHeading from "../components/LinkedPropertyGroupWithHeading";
import ListWithHeading from "../components/ListWithHeading";

export default class OrganizationDetails extends React.Component {
  render() {
    let thing = this.props.case;
    let intl = this.props.intl;
    let tags = <div />;
    if (thing.tags) {
      tags = thing.tags.map(tag =>
        <SearchLink intl={intl} key={tag} tag="tag" value={tag} />
      );
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
        <p className="d-none d-sm-block d-md-block d-lg-block d-xl-block sub-heading">
          {intl.formatMessage({ id: "data" })}
        </p>
        <p className="sub-sub-heading">
          {intl.formatMessage({ id: "tags_title" })}
        </p>
        <div className="tags">
          {tags}
        </div>
        <ListWithHeading
          intl={intl}
          heading="links"
          property="links"
          thing={thing}
        />
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
