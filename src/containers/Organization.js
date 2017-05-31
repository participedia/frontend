import React from "react";
import { injectIntl, intlShape } from "react-intl";
import api from "../utils/api";
import OrganizationDetails from "../components/MethodDetails";
import ItemFetcher from "./ItemFetcher";

export class Organization extends React.Component {
  toggleFeatured(thing, featured) {
    console.log("setting featured for ", thing, " to ", featured);
    // XXX needs API to exist.
  }
  render() {
    return (
      <ItemFetcher
        api={api.fetchOrgById}
        auth={this.props.auth}
        id={Number(this.props.match.params.nodeID)}
        details={OrganizationDetails}
        toggleFeatured={this.toggleFeatured.bind(this)}
        {...this.props}
      />
    );
  }
}

Organization.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Organization);
