import React from "react";
import { injectIntl, intlShape } from "react-intl";
import { Field } from "simple-react-form";
import Geosuggest from "react-geosuggest";
import "./CaseEditor.css";
import "../GeoSuggest/GeoSuggest.css";
import {
  SimpleRelatedCases,
  SimpleRelatedMethods,
  SimpleRelatedOrganizations
} from "../RelatedEditors";
import ItemEditor from "../ItemEditor";

import {
  TextPropEditor,
  BooleanPropEditor,
  NumberPropEditor,
  DatePropEditor,
  ChoicePropEditor
} from "../PropEditors";

function CaseSidebar({ thing, intl, cases, methods, organizations }) {
  let related_cases = (
    <Field
      fieldName="related_cases"
      name="related_cases"
      thing={thing}
      type={SimpleRelatedCases}
      property="related_cases"
      value={thing.related_cases || []}
      dataSource={cases}
      intl={intl}
    />
  );
  let related_methods = (
    <Field
      fieldName="related_methods"
      name="related_methods"
      thing={thing}
      type={SimpleRelatedMethods}
      property="related_methods"
      value={thing.related_methods || []}
      dataSource={methods}
      intl={intl}
    />
  );
  let related_organizations = (
    <Field
      fieldName="related_organizations"
      name="related_organizations"
      thing={thing}
      type={SimpleRelatedOrganizations}
      property="related_organizations"
      value={thing.related_organizations || []}
      dataSource={organizations}
      intl={intl}
    />
  );

  return (
    <div>
      <div className="case-location">
        <p className="sub-heading">
          {intl.formatMessage({
            id: "country_picker"
          })}
        </p>
        <Geosuggest />
      </div>
      <p className="sub-heading">
        Keywords
      </p>
      keyword picker
      <p className="sub-heading">
        Related Content
      </p>
      <div className="related-content">
        <div className="pb-1">
          <h5>
            {intl.formatMessage({ id: "cases" })}
          </h5>
          {related_cases}
        </div>
        <div className="pb-1">
          <h5>
            {intl.formatMessage({ id: "methods" })}
          </h5>
          {related_methods}
        </div>
        <div className="pb-1">
          <h5>
            {intl.formatMessage({ id: "organizations" })}
          </h5>
          {related_organizations}
        </div>
        <ChoicePropEditor
          intl={intl}
          label="specific_topic"
          property="specific_topic"
          thing={thing}
        />
        <ChoicePropEditor
          intl={intl}
          label="issue"
          property="issue"
          thing={thing}
        />
        <ChoicePropEditor
          intl={intl}
          label="communication_mode"
          property="communication_mode"
          thing={thing}
        />
        <ChoicePropEditor
          intl={intl}
          label="communication_with_audience"
          property="communication_with_audience"
          thing={thing}
        />
        <ChoicePropEditor
          intl={intl}
          label="decision_method"
          property="decision_method"
          thing={thing}
        />
        <ChoicePropEditor
          intl={intl}
          label="facetoface_online_or_both"
          property="facetoface_online_or_both"
          thing={thing}
        />
        <BooleanPropEditor
          intl={intl}
          label="facilitated"
          property="facilitated"
          thing={thing}
        />
        <ChoicePropEditor
          intl={intl}
          label="voting"
          property="voting"
          thing={thing}
        />
        <NumberPropEditor
          intl={intl}
          label="number_of_meeting_days"
          property="number_of_meeting_days"
          thing={thing}
        />
        <ChoicePropEditor
          intl={intl}
          label="targeted_participant_demographic"
          property="targeted_participant_demographic"
          thing={thing}
        />
        <ChoicePropEditor
          intl={intl}
          label="kind_of_influence"
          property="kind_of_influence"
          thing={thing}
        />
        <ChoicePropEditor
          intl={intl}
          label="targeted_participants_public_role"
          property="targeted_participants_public_role"
          thing={thing}
        />
        <ChoicePropEditor
          intl={intl}
          label="targeted_audience"
          property="targeted_audience"
          thing={thing}
        />
        <ChoicePropEditor
          intl={intl}
          label="participant_selection"
          property="participant_selection"
          thing={thing}
        />
        <ChoicePropEditor
          intl={intl}
          label="type_of_funding_entity"
          property="type_of_funding_entity"
          thing={thing}
        />
        <ChoicePropEditor
          intl={intl}
          label="typical_implementing_entity"
          property="typical_implementing_entity"
          thing={thing}
        />
        <ChoicePropEditor
          intl={intl}
          label="typical_sponsoring_entity"
          property="typical_sponsoring_entity"
          thing={thing}
        />
        <BooleanPropEditor
          intl={intl}
          label="ongoing"
          property="ongoing"
          thing={thing}
        />
        <DatePropEditor
          intl={intl}
          label="start_date"
          property="start_date"
          thing={thing}
        />
        <DatePropEditor
          intl={intl}
          label="end_date"
          property="end_date"
          thing={thing}
        />
        <DatePropEditor
          intl={intl}
          label="updated_date"
          property="updated_date"
          thing={thing}
        />
        <NumberPropEditor
          intl={intl}
          label="total_number_of_participants"
          property="total_number_of_participants"
          thing={thing}
        />
        <TextPropEditor
          intl={intl}
          label="staff_type"
          property="staff_type"
          thing={thing}
        />
        <TextPropEditor
          intl={intl}
          label="who_else_supported_the_initiative"
          property="who_else_supported_the_initiative"
          thing={thing}
        />

      </div>
    </div>
  );
}

function _CaseEditor(props) {
  let sidebar = <CaseSidebar {...props} />;
  return <ItemEditor {...props} thing={props.thing} sidebar={sidebar} />;
}

_CaseEditor.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(_CaseEditor);
