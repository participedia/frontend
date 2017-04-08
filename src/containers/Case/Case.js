import React from "react";
import { connect } from "react-redux";
import { injectIntl, intlShape } from "react-intl";
import api from "../../utils/api";
import CountryMap from "../../components/CountryMap";
import SearchLink from "../../components/SearchLink";
import ItemDetails from "../../components/ItemDetails/ItemDetails";

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
    let issue = thing.issue;
    let audience = (
      <SearchLink
        intl={intl}
        tag="communication_with_audience"
        value={thing.communication_with_audience}
      />
    );
    let tags = <div />;
    if (thing.tags) {
      tags = thing.tags.map(tag => (
        <SearchLink intl={intl} key={tag} tag="tag" value={tag} />
      ));
    }
    let communication_mode = (
      <SearchLink
        intl={intl}
        tag="communication_mode"
        value={thing.communication_mode}
      />
    );
    let decision_method = (
      <SearchLink
        intl={intl}
        tag="decision_method"
        value={thing.decision_method}
      />
    );
    let facetoface = thing.facetoface_online_or_both;
    if (!facetoface) {
      facetoface = "facetoface_not_specified";
    } else {
      facetoface = "facetoface_" + facetoface;
    }
    facetoface = intl.formatMessage({ id: facetoface });
    facetoface = (
      <SearchLink
        intl={intl}
        tag="facetoface_online_or_both"
        value={facetoface}
      />
    );

    let facilitated = String(thing.facilitated);
    if (facilitated === "null") facilitated = "not_specified";
    if (facilitated) facilitated = facilitated.toLowerCase();
    if (facilitated)
      facilitated = intl.formatMessage({
        id: facilitated
      });
    facilitated = (
      <SearchLink intl={intl} tag="facilitated" value={facilitated} />
    );

    let voting = intl.formatMessage({ id: thing.voting });
    voting = <SearchLink intl={intl} tag="voting" value={voting} />;

    let numberDays = thing.number_of_meeting_days;
    numberDays = (
      <SearchLink intl={intl} tag="number_of_meeting_days" value={numberDays} />
    );
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
        <p className="sub-sub-heading">
          Specific Topic:
        </p>
        <div className="tags">
          {issue}
        </div>
        <p className="sub-sub-heading">
          Communication Mode:
        </p>
        <div className="tags">
          {communication_mode}
        </div>
        <p className="sub-sub-heading">
          Communication with audience:
        </p>
        <div className="tags">
          {audience}
        </div>
        <p className="sub-sub-heading">
          Decision Method:
        </p>
        <div className="tags">
          {decision_method}
        </div>
        <p className="sub-sub-heading">
          Face to face, online, or both:
        </p>
        <div className="tags">
          {facetoface}
        </div>
        <p className="sub-sub-heading">
          Facilitated:
        </p>
        <div className="tags">
          {facilitated}
        </div>
        <p className="sub-sub-heading">
          Voting:
        </p>
        <div className="tags">
          {voting}
        </div>
        <p className="sub-sub-heading">
          Number of meeting Days:
        </p>
        <div className="tags">
          {numberDays}
        </div>
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
