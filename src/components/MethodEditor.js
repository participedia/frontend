import React from "react";
import { injectIntl, intlShape } from "react-intl";
import { Field } from "simple-react-form";
import Geosuggest from "react-geosuggest";
import "./CaseEditor/CaseEditor.css";
import "./GeoSuggest/GeoSuggest.css";
import {
  SimpleRelatedCases,
  SimpleRelatedMethods,
  SimpleRelatedOrganizations
} from "./RelatedEditors";
import ItemEditor from "./ItemEditor";

function MethodSidebar({ thing, intl, cases, methods, organizations }) {
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
      </div>
    </div>
  );
}

function _MethodEditor(props) {
  let sidebar = <MethodSidebar {...props} />;
  return <ItemEditor {...props} sidebar={sidebar} />;
}

_MethodEditor.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(_MethodEditor);
