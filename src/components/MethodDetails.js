import React from "react";
import { FormattedMessage } from "react-intl";
import LinkedPropertyGroupWithHeading from "./LinkedPropertyGroupWithHeading";
import ListWithHeading from "./ListWithHeading";
import TextListWithHeading from "./TextListWithHeading";
import { BooleanProp, TextProp } from "../components/Props";

export default class MethodDetails extends React.Component {
  render() {
    let thing = this.props.case; // should thing be `this.props.method`?
    return (
      <div>
        <h2 className="d-none d-sm-block d-md-block d-lg-block d-xl-block sub-heading">
          <FormattedMessage id="data" />
        </h2>

        <ListWithHeading heading="links" property="links" thing={thing} />

        <BooleanProp
          heading="facilitated"
          label="facilitated"
          property="facilitated"
          thing={thing}
        />

        <TextListWithHeading property="typical_purposes" thing={thing} />

        <TextProp
          label="participant_selection"
          property="participant_selection"
          thing={thing}
        />

        <TextProp
          label="recruitment_method"
          property="recruitment_method"
          thing={thing}
        />

        <ListWithHeading
          heading="interaction_modes"
          property="interaction_modes"
          thing={thing}
        />

        <LinkedPropertyGroupWithHeading
          heading="communication_outcomes"
          property="communication_outcomes"
          thing={thing}
        />

        <LinkedPropertyGroupWithHeading
          heading="decision_method"
          property="decision_method"
          thing={thing}
        />

        <LinkedPropertyGroupWithHeading
          heading="geographical_scope"
          property="geographical_scope"
          thing={thing}
        />

        <LinkedPropertyGroupWithHeading
          heading="issue_polarization"
          property="issue_polarization"
          thing={thing}
        />

        <LinkedPropertyGroupWithHeading
          heading="issue_technical_complexity"
          property="issue_technical_complexity"
          thing={thing}
        />

        <LinkedPropertyGroupWithHeading
          heading="issue_interdependency"
          property="issue_interdependency"
          thing={thing}
        />
      </div>
    );
  }
}
