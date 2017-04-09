import React from "react";
import { connect } from "react-redux";
import { injectIntl, intlShape } from "react-intl";
import api from "../utils/api";
import CountryMap from "../components/CountryMap";
import SearchLink from "../components/SearchLink";
import ItemDetails from "../components/ItemDetails/ItemDetails";
import LinkedPropertyGroupWithHeading
  from "../components/LinkedPropertyGroupWithHeading";

function mapStateToProps({ auth }) {
  const { isAuthenticated } = auth;

  return {
    isAuthenticated
  };
}

class CaseDetails extends React.Component {
  render() {
    let thing = this.props.case;
    let intl = this.props.intl;
    let tags = <div />;
    if (thing.tags) {
      tags = thing.tags.map(tag => (
        <SearchLink intl={intl} key={tag} tag="tag" value={tag} />
      ));
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
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="specific_topic"
          property="issue"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="communication_mode"
          property="communication_mode"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="communication_with_audience"
          property="communication_with_audience"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="decision_method"
          property="decision_method"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="facetoface_online_or_both"
          property="facetoface_online_or_both"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="facilitated"
          property="facilitated"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="voting"
          property="voting"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="number_of_meeting_days"
          property="number_of_meeting_days"
          thing={thing}
        />
      </div>
    );
  }
}

export class Case extends React.Component {
  render() {
    let id = this.props.params.nodeID;
    let intl = this.props.intl;
    let isAuthenticated = this.props.isAuthenticated;
    return (
      <ItemDetails
        api={api.fetchCaseById}
        isAuthenticated={isAuthenticated}
        id={id}
        intl={intl}
        details={CaseDetails}
      />
    );
  }
}
Case.propTypes = {
  intl: intlShape.isRequired
};

export default connect(mapStateToProps)(injectIntl(Case));
