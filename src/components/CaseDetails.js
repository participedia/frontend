import React from "react";
import { FormattedMessage } from "react-intl";

// import CountryMap from "./CountryMap";
import LinkedPropertyGroupWithHeading from "./LinkedPropertyGroupWithHeading";
import ListWithHeading from "./ListWithHeading";
import TextListWithHeading from "./TextListWithHeading";
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

        <ListWithHeading
          heading="relationships"
          property="relationships"
          thing={thing}
        />

         <LinkedPropertyGroupWithHeading
          heading="issues"
          property="issues"
          thing={thing}
        />

        <TextListWithHeading
          label="specific_topics"
          property="specific_topics"
          thing={thing}
        />

        <ListWithHeading heading="links" property="links" thing={thing} />

        <Tags thing={thing} />


        {/* TODO: Create format for array of {case id, title}
        <TextListWithHeading
          label="has_components"
          property="has_components"
          thing={thing}
        />
        TODO: Create format for array of {case id, title}
        <TextListWithHeading
          label="is_component_of"
          property="is_component_of"
          thing={thing}
        />

        TODO: Create format for location (structure)
        */}

        <TextProp
          label="scope_of_influence"
          property="scope_of_influence"
          thing={thing}
        />

         <ListWithHeading
          heading="files"
          property="files"
          thing={thing}
        />

        <DateProp label="start_date" property="start_date" thing={thing} />

        <DateProp label="end_date" property="end_date" thing={thing} />

        <BooleanProp label="ongoing" property="ongoing" thing={thing} />

        <TextProp
          label="time_limited"
          property="time_limited"
          thing={thing}
        />

        <TextListWithHeading
          heading="purposes"
          property="purposes"
          thing={thing}
        />

        <ListWithHeading
          heading="approaches"
          property="approaches"
          thing={thing}
        />

        <TextProp
          label="public_spectrum"
          property="public_spectrum"
          thing={thing}
        />

        <NumberProp
          label="number_of_participants"
          property="number_of_participants"
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

         <LinkedPropertyGroupWithHeading
          heading="targeted_participants"
          property="targeted_participants"
          thing={thing}
        />


        {/* TODO: Create format for array of {method id, title}
        <
          label="process_methods"
          property="process_methods"
          thing={thing}
        />

        */}

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

        <TextListWithHeading
          label="facilitator_training"
          property="facilitator_training"
          thing={thing}
        />

        <LinkedPropertyGroupWithHeading
          heading="facetoface_online_or_both"
          property="facetoface_online_or_both"
          thing={thing}
        />

        <TextListWithHeading
          heading="participants_interactions"
          property="participants_interactions"
          thing={thing}
        />

        <LinkedPropertyGroupWithHeading
          heading="learning_resource"
          property="learning_resource"
          thing={thing}
        />

        <TextListWithHeading
          heading="decision_methods"
          property="decision_methods"
          thing={thing}
        />

        <TextProp
          label="if_voting"
          property="if_voting"
          thing={thing}
        />

         <TextListWithHeading
          heading="insights_outcomes"
          property="insights_outcomes"
          thing={thing}
        />

        {/* TODO: Create format for array of {id, title}
        <TextProp
          label="primary_organizer"
          property="primary_organizer"
          thing={thing}
        />
        */}

        <TextListWithHeading
          heading="organizer_types"
          property="organizer_types"
          thing={thing}
        />

        <LinkedPropertyGroupWithHeading
          heading="funder"
          property="funder"
          thing={thing}
        />

        <TextListWithHeading
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

        <ListWithHeading
          heading="change_types"
          property="change_types"
          thing={thing}
        />

         <TextListWithHeading
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


         {/* Old
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
        <TextProp label="staff_type" property="staff_type" thing={thing} />
        <TextProp
          label="who_else_supported_the_initiative"
          property="who_else_supported_the_initiative"
          thing={thing}
        />

         */}

      </div>
    );
  }
}
