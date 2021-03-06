import React from "react";
import { FormattedMessage } from "react-intl";

import LinkedPropertyGroupWithHeading from "./LinkedPropertyGroupWithHeading";
import ListWithHeading from "./ListWithHeading";
import TextListWithHeading from "./TextListWithHeading";
import NestedTextListWithHeading from "./NestedTextListWithHeading";
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

        <ListWithHeading
          heading="relationships"
          property="relationships"
          thing={thing}
        />

        <TextListWithHeading property="issues" thing={thing} />

        <TextListWithHeading property="specific_topics" thing={thing} />

        <ListWithHeading heading="links" property="links" thing={thing} />

        <TextListWithHeading
          heading="This case is a component of"
          property="is_component_of"
          thing={thing}
        />

        <TextListWithHeading
          heading="This case has these components"
          property="has_components"
          thing={thing}
        />

        <NestedTextListWithHeading
          heading="location"
          property="location"
          thing={thing}
        />

        <TextProp
          label="scope_of_influence"
          property="scope_of_influence"
          thing={thing}
        />

        <ListWithHeading heading="files" property="files" thing={thing} />

        <DateProp label="start_date" property="start_date" thing={thing} />

        <DateProp label="end_date" property="end_date" thing={thing} />

        <BooleanProp label="ongoing" property="ongoing" thing={thing} />

        <TextProp label="time_limited" property="time_limited" thing={thing} />

        <TextListWithHeading property="purposes" thing={thing} />

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

        <TextProp label="open_limited" property="open_limited" thing={thing} />

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

        <TextListWithHeading property="process_methods" thing={thing} />

        <TextProp label="legality" property="legality" thing={thing} />

        <TextProp label="facilitators" property="facilitators" thing={thing} />

        <TextListWithHeading property="facilitator_training" thing={thing} />

        <LinkedPropertyGroupWithHeading
          heading="facetoface_online_or_both"
          property="facetoface_online_or_both"
          thing={thing}
        />

        <TextListWithHeading
          property="participants_interactions"
          thing={thing}
        />

        <LinkedPropertyGroupWithHeading
          heading="learning_resource"
          property="learning_resource"
          thing={thing}
        />

        <TextListWithHeading property="decision_methods" thing={thing} />

        <TextListWithHeading property="if_voting" thing={thing} />

        <TextListWithHeading property="insights_outcomes" thing={thing} />

        {/* TODO: Create format for array of {id, title} */}

        <TextListWithHeading property="primary_organizers" thing={thing} />

        <TextListWithHeading property="organizer_types" thing={thing} />

        <LinkedPropertyGroupWithHeading
          heading="funder"
          property="funder"
          thing={thing}
        />

        <TextListWithHeading property="funder_types" thing={thing} />

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
      </div>
    );
  }
}
