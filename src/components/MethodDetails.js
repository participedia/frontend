import React from "react";
import SearchLink from "../components/SearchLink";
import LinkedPropertyGroupWithHeading from "./LinkedPropertyGroupWithHeading";
import ListWithHeading from "./ListWithHeading";
import { BooleanProp } from "../components/Props";

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
// lead_image
// other_images,
// files
// videos
// tags
// featured
// original_language

export default class MethodDetails extends React.Component {
  render() {
    let thing = this.props.case;
    let intl = this.props.intl;
    let tags = <div />;
    if (thing.tags) {
      tags = thing.tags.map(tag =>
        <SearchLink intl={intl} key={tag} tag="tag" value={tag} />
      );
    }
    return (
      <div>
        <p className="sub-heading">
          {intl.formatMessage({ id: "data" })}
        </p>
        <p className="sub-sub-heading">
          {intl.formatMessage({ id: "tags_title" })}
        </p>
        <div className="tags">
          {tags}
        </div>
        {thing.issue
          ? <div>
              <p className="sub-sub-heading">
                {intl.formatMessage({ id: "specific_topic" })}
              </p>
              <div className="tags">
                {thing.issue}
              </div>
            </div>
          : <div />}

        <ListWithHeading
          intl={intl}
          heading="links"
          property="links"
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
        <BooleanProp
          intl={intl}
          heading="facilitated"
          label="facilitated"
          property="facilitated"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="best_for"
          property="best_for"
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
          heading="governance_contribution"
          property="governance_contribution"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="issue_interdependency"
          property="issue_interdependency"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="issue_polarization"
          property="issue_polarization"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="issue_technical_complexity"
          property="issue_technical_complexity"
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
          heading="method_of_interaction"
          property="method_of_interaction"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="public_interaction_method"
          property="public_interaction_method"
          thing={thing}
        />
        <LinkedPropertyGroupWithHeading
          intl={intl}
          heading="typical_funding_source"
          property="typical_funding_source"
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
      </div>
    );
  }
}
