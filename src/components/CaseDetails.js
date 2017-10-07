import React from "react";
import { FormattedMessage } from "react-intl";

// import CountryMap from "./CountryMap";
import LinkedPropertyGroupWithHeading from "./LinkedPropertyGroupWithHeading";
import ListWithHeading from "./ListWithHeading";
import Tags from "./Tags";
import {
  DateProp,
  BooleanProp,
  TextProp,
  NumberProp
} from "../components/Props";

export default class CaseDetails extends React.Component {
  render() {
    let thing = this.props.case;
    return (
      <div className="details">
        <h2 className="d-none d-sm-block d-md-block d-lg-block d-xl-block sub-heading">
          <FormattedMessage id="data" />
        </h2>
        <Tags thing={thing} />
        <LinkedPropertyGroupWithHeading
          heading="issue"
          property="issue"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="specific_topic"
          property="specific_topic"
          thing={thing}
        />
        <ListWithHeading heading="links" property="links" thing={thing} />

        <LinkedPropertyGroupWithHeading
          heading="communication_mode"
          property="communication_mode"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="communication_with_audience"
          property="communication_with_audience"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="decision_method"
          property="decision_method"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="facetoface_online_or_both"
          property="facetoface_online_or_both"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="facilitated"
          property="facilitated"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="voting"
          property="voting"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="number_of_meeting_days"
          property="number_of_meeting_days"
          thing={thing}
        />

        <LinkedPropertyGroupWithHeading
          heading="targeted_participant_demographic"
          property="targeted_participant_demographic"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="kind_of_influence"
          property="kind_of_influence"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="targeted_participants_public_role"
          property="targeted_participants_public_role"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="targeted_audience"
          property="targeted_audience"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="participant_selection"
          property="participant_selection"
          thing={thing}
        />

        <LinkedPropertyGroupWithHeading
          heading="type_of_funding_entity"
          property="type_of_funding_entity"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="type_of_implementing_entity"
          property="type_of_implementing_entity"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="type_of_sponsoring_entity"
          property="type_of_sponsoring_entity"
          thing={thing}
        />
        <BooleanProp label="ongoing" property="ongoing" thing={thing} />
        <DateProp label="start_date" property="start_date" thing={thing} />
        <DateProp label="end_date" property="end_date" thing={thing} />
        <NumberProp
          label="total_number_of_participants"
          property="total_number_of_participants"
          thing={thing}
        />
        <TextProp label="staff_type" property="staff_type" thing={thing} />
        <TextProp
          label="who_else_supported_the_initiative"
          property="who_else_supported_the_initiative"
          thing={thing}
        />
      </div>
    );
  }
}
