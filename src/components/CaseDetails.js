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
      <div>
        <h2 className="d-none d-sm-block d-md-block d-lg-block d-xl-block line-heading">
          <FormattedMessage id="data" />
        </h2>
        <Tags thing={thing} />

        <LinkedPropertyGroupWithHeading
          heading="issue"
          property="issue"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          label="specific_topic"
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

        <TextProp
          label="scope_of_influence"
          property="scope_of_influence"
          thing={thing}
        />

        <ListWithHeading
          heading="images"
          property="images"
          thing={thing}
        />

        <ListWithHeading
          heading="videos"
          property="videos"
          thing={thing}
        />

        <TextProp
          label="time_limited"
          property="time_limited"
          thing={thing}
        />

        <TextProp
          label="time_limited"
          property="time_limited"
          thing={thing}
        />

         <LinkedPropertyGroupWithHeading
          heading="purposes"
          property="purposes"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="approaches"
          property="approaches"
          thing={thing}
        />
        <TextProp
          label="public_spectrum"
          property="public_spectrum"
          thing={thing}
        />
        <TextProp
          label="open_limited"
          property="open_limited"
          thing={thing}
        />
        <TextProp
          label="recruitment_method"
          property="recruitment_method"
          thing={thing}
        />
        <TextProp
          label="recruitment_method"
          property="recruitment_method"
          thing={thing}
        />
        <TextProp
          label="legality"
          property="legality"
          thing={thing}
        />

        <TextProp
          label="facilitators"
          property="facilitators"
          thing={thing}
        />

        <TextProp
          label="facilitator_training"
          property="facilitator_training"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="participants_interactions"
          property="participants_interactions"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="online_learning_resource"
          property="online_learning_resource"
          thing={thing}
        />
        <TextProp
          label="if_voting"
          property="if_voting"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="insights_outcomes"
          property="insights_outcomes"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="organizer_types"
          property="organizer_types"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="funders"
          property="funders"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="funder_types"
          property="funder_types"
          thing={thing}
        />
        <BooleanProp label="staff" property="staff" thing={thing} />
        <BooleanProp label="volunteers" property="volunteers" thing={thing} />
        <TextProp
          label="impact_evidence"
          property="impact_evidence"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="change_types"
          property="change_types"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="implementers_of_change"
          property="implementers_of_change"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="formal_evaluation"
          property="formal_evaluation"
          thing={thing}
        />
        <ListWithHeading
          heading="evaluation_reports"
          property="evaluation_reports"
          thing={thing}
        />
        <ListWithHeading
          heading="evaluation_links"
          property="evaluation_links"
          thing={thing}
        />

        <LinkedPropertyGroupWithHeading
          label="tags"
          property="tags"
          thing={thing}
        />

      </div>
    );
  }
}
