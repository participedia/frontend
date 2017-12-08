import React from "react";
import { FormattedMessage } from "react-intl";
import SearchLink from "../components/SearchLink";
import LinkedPropertyGroupWithHeading from "./LinkedPropertyGroupWithHeading";
import ListWithHeading from "./ListWithHeading";
import { BooleanProp } from "../components/Props";
import Tags from "./Tags";
import CiteThis from "./CiteThis";

/* Properties that are specific to methods:
// best_for
// communication_mode,
// decision_method
// facilitated
// governance_contribution
// issue_interdependency
// issue_polarization,
// issue_technical_complexity
// kind_of_influence
// method_of_interaction,
// public_interaction_method
// typical_funding_source
// typical_implementing_entity,
// typical_sponsoring_entity

/* Generic properties */
// post_date,
// published
// updated_date,
// images
// files
// videos
// tags
// featured
// original_language

export default class MethodDetails extends React.Component {
  render() {
    let thing = this.props.case; // should thing be `this.props.method`?
    let intl = this.props.intl;
    return (
      <div>
        <h2 className="d-none d-sm-block d-md-block d-lg-block d-xl-block sub-heading">
          <FormattedMessage id="data" />
        </h2>
        <Tags thing={thing} />
        {thing.issue ? (
          <div>
            <p className="sub-sub-heading">
              <FormattedMessage id="specific_topic" />
            </p>
            <div>{thing.issue}</div>
          </div>
        ) : (
          <div />
        )}

        <ListWithHeading heading="links" property="links" thing={thing} />
        <LinkedPropertyGroupWithHeading
          heading="kind_of_influence"
          property="kind_of_influence"
          thing={thing}
        />
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
        <BooleanProp
          heading="facilitated"
          label="facilitated"
          property="facilitated"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="best_for"
          property="best_for"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="decision_method"
          property="decision_method"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="governance_contribution"
          property="governance_contribution"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="issue_interdependency"
          property="issue_interdependency"
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
          heading="kind_of_influence"
          property="kind_of_influence"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="method_of_interaction"
          property="method_of_interaction"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="public_interaction_method"
          property="public_interaction_method"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="typical_funding_source"
          property="typical_funding_source"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="typical_implementing_entity"
          property="typical_implementing_entity"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          heading="typical_sponsoring_entity"
          property="typical_sponsoring_entity"
          thing={thing}
        />
        <CiteThis
          intl={intl}
          thing={thing}
        />
      </div>
    );
  }
}
