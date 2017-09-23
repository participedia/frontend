import React from "react";
import { object } from "prop-types";
import { injectIntl } from "react-intl";
import api from "../utils/api";
import CaseDetails from "../components/CaseDetails";
import ItemFetcher from "./ItemFetcher";

export class Case extends React.Component {
  toggleFeatured(thing, featured) {
    thing.featured = featured;
    api.saveThing(thing.type, thing);
  }
  toggleHidden(thing, hidden) {
    thing.hidden = hidden;
    api.saveThing(thing.type, thing);
  }
  render() {
    return (
      <ItemFetcher
        api={api.fetchCaseById}
        id={Number(this.props.match.params.nodeID)}
        details={CaseDetails}
        toggleFeatured={this.toggleFeatured.bind(this)}
        toggleHidden={this.toggleHidden.bind(this)}
        {...this.props}
      />
    );
  }
}
Case.propTypes = {
  location: object
};

export default injectIntl(Case);
