import React from "react";
import { FormattedMessage } from "react-intl";

import SearchLink from "../components/SearchLink";
import LinkedPropertyGroupWithHeading from "../components/LinkedPropertyGroupWithHeading";
import ListWithHeading from "../components/ListWithHeading";
import Tags from "./Tags";

export default class OrganizationDetails extends React.Component {
  render() {
    let thing = this.props.case;
    let ed = null;
    if (thing.executive_director) {
      ed = (
        <div>
          <p className="sub-heading">
            <FormattedMessage id="executive_director" />
          </p>
          <div className="sub-sub-heading">{thing.executive_director}</div>
        </div>
      );
    }
    return (
      <div>
        <p className="d-none d-sm-block d-md-block d-lg-block d-xl-block sub-heading">
          <FormattedMessage id="data" />
        </p>
        <Tags thing={thing} />
        <ListWithHeading heading="links" property="links" thing={thing} />
        {ed}

        <LinkedPropertyGroupWithHeading
          heading="sector"
          property="sector"
          thing={thing}
        />
      </div>
    );
  }
}
