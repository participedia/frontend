import React from "react";
import { bool, object } from "prop-types";
import { injectIntl, intlShape } from "react-intl";
import api from "../utils/api";
import CaseDetails from "../components/CaseDetails";
import ItemFetcher from "./ItemFetcher";

export class Case extends React.Component {
  toggleFeatured(thing, featured) {
    api.saveThing(thing.type, thing);
  }
  render() {
    return (
      <ItemFetcher
        api={api.fetchCaseById}
        auth={this.props.auth}
        id={Number(this.props.match.params.nodeID)}
        details={CaseDetails}
        toggleFeatured={this.toggleFeatured.bind(this)}
        {...this.props}
      />
    );
  }
}
Case.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: bool,
  location: object
};

export default injectIntl(Case);
