import React, { Component } from "react";
// import { reduxForm } from "redux-form";
import { injectIntl, intlShape } from "react-intl";
import { Form, Text } from "react-form";
import Geosuggest from "react-geosuggest";
import "./CaseEditor.css";
import { Container, Col } from "reactstrap";
import BodyEditor from "../BodyEditor";
import ImageListEditor from "../ImageListEditor";
import "../GeoSuggest/GeoSuggest.css";
import { Related } from "../RelatedEditors";

import {
  TextPropEditor,
  BooleanPropEditor,
  NumberPropEditor,
  DatePropEditor,
  ChoicePropEditor
} from "../PropEditors";

class ItemEditor extends Component {
  render() {
    let { thing, sidebar, onSubmit } = this.props;

    if (!thing) {
      return <div />;
    }

    return (
      <Form onSubmit={onSubmit}>
        {({ submitForm }) => {
          return (
            <form onSubmit={submitForm}>
              <div className="main-contents">
                <Container className="detailed-case-component" fluid={true}>
                  <Col
                    md="3"
                    className="hidden-sm-down sidepanel hidden-sm-down"
                  >
                    {sidebar}
                  </Col>
                  <Col md="8" xs="12" className="main-area">
                    <div className="case-box">
                      <h2 className="category">
                        Case
                      </h2>
                      <h2 className="case-title">
                        {thing.title}
                      </h2>
                      <ImageListEditor thing={thing} />
                      <div className="title-edit">
                        <label htmlFor="title">Title</label>
                      </div>
                      <Text field="title" placeholder="case title" />
                      <div>
                        <label htmlFor="body_en">Body</label>
                      </div>
                      <BodyEditor value={thing.body} />
                    </div>
                    <button type="submit">Submit</button>
                  </Col>
                </Container>
              </div>
            </form>
          );
        }}
      </Form>
    );
  }
}

function CaseSidebar({ thing, intl, cases, methods, organizations }) {
  let related_cases = (
    <Related
      thing={thing}
      property="related_cases"
      value={thing.related_cases || []}
      dataSource={cases}
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
  return <ItemEditor {...props} sidebar={sidebar} />;
}

_CaseEditor.propTypes = {
  intl: intlShape.isRequired
};

// should the redux wrapper be in this comp or the container parent?

export default injectIntl(_CaseEditor);
