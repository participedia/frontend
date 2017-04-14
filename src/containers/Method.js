import React from "react";
import { connect } from "react-redux";
import { injectIntl, intlShape } from "react-intl";
import api from "../utils/api";
import SearchLink from "../components/SearchLink";
import LinkedPropertyGroupWithHeading
  from "../components/LinkedPropertyGroupWithHeading";
import ItemDetails from "../components/ItemDetails/ItemDetails";

function mapStateToProps({ auth }) {
  const { isAuthenticated } = auth;

  return {
    isAuthenticated
  };
}

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

class MethodDetails extends React.Component {
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
          heading="kind_of_influence"
          property="kind_of_influence"
          thing={thing}
        />
        <p className="sub-sub-heading">
          Specific Topic:
        </p>
        <div className="tags">
          {thing.issue}
        </div>
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
          heading="method_of_interaction"
          property="method_of_interaction"
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

export class Method extends React.Component {
  render() {
    let id = this.props.params.nodeID;
    let intl = this.props.intl;
    let isAuthenticated = this.props.isAuthenticated;
    return (
      <ItemDetails
        api={api.fetchMethodById}
        isAuthenticated={isAuthenticated}
        id={id}
        location={location}
        intl={intl}
        details={MethodDetails}
      />
    );
  }
}

Method.propTypes = {
  intl: intlShape.isRequired
};

export default connect(mapStateToProps)(injectIntl(Method));
