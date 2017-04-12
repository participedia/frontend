import React from "react";
import { connect } from "react-redux";
import { injectIntl, intlShape } from "react-intl";
import api from "../utils/api";
import CountryMap from "../components/CountryMap";
import ItemDetails from "../components/ItemDetails/ItemDetails";
import LinkedPropertyGroupWithHeading
  from "../components/LinkedPropertyGroupWithHeading";
import Tags from "../components/Tags";
import {
  DateProp,
  BooleanProp,
  TextProp,
  NumberProp
} from "../components/Props";

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
    return (
      <div>
        <CountryMap
          city={thing.location.city}
          countrycode={thing.location.country}
        />
        <p className="sub-heading">
          Keywords
        </p>
        <Tags thing={thing} intl={intl} />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="specific_topic"
          property="specific_topic"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="issue"
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

        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="targeted_participant_demographic"
          property="targeted_participant_demographic"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="kind_of_influence"
          property="kind_of_influence"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="targeted_participants_public_role"
          property="targeted_participants_public_role"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="targeted_audience"
          property="targeted_audience"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="participant_selection"
          property="participant_selection"
          thing={thing}
        />

        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="type_of_funding_entity"
          property="type_of_funding_entity"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="typical_implementing_entity"
          property="typical_implementing_entity"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="typical_sponsoring_entity"
          property="typical_sponsoring_entity"
          thing={thing}
        />
        <BooleanProp
          intl={intl}
          label="ongoing"
          property="ongoing"
          thing={thing}
        />
        <DateProp
          intl={intl}
          label="start_date"
          property="start_date"
          thing={thing}
        />
        <DateProp
          intl={intl}
          label="end_date"
          property="end_date"
          thing={thing}
        />
        <DateProp
          intl={intl}
          label="updated_date"
          property="updated_date"
          thing={thing}
        />
        <NumberProp
          intl={intl}
          label="total_number_of_participants"
          property="total_number_of_participants"
          thing={thing}
        />
        <TextProp
          intl={intl}
          label="staff_type"
          property="staff_type"
          thing={thing}
        />
        <TextProp
          intl={intl}
          label="who_else_supported_the_initiative"
          property="who_else_supported_the_initiative"
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
