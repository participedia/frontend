import React, { Component } from "react";
import { intlShape } from "react-intl";
import { Form, Field } from "simple-react-form";
import Geosuggest from "react-geosuggest";
import LazyBodyEditor from "./LazyBodyEditor";
import { Container, Col } from "reactstrap";
import ImageListEditor from "./ImageListEditor";
import Text from "simple-react-form-material-ui/lib/text";
import tags_json from "../autocomplete_data/tags.json";
import "./CaseEditor.css";
import "./GeoSuggest/GeoSuggest.css";
import RelatedEditor from "./RelatedEditor";
import RaisedButton from "material-ui/RaisedButton";

import {
  TextPropEditor,
  BooleanPropEditor,
  NumberPropEditor,
  DatePropEditor,
  ChoicePropEditor
} from "./PropEditors";

const tags = tags_json["tags"];

const buttonStyle = {
  margin: "1em"
};

class CaseEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { thing: props.thing };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ thing: nextProps.thing });
  }

  onSubmit() {
    this.props.onSubmit(this.state.thing);
  }
  render() {
    let { cases, methods, organizations, isQuick, onExpand, intl } = this.props;
    let thing = this.state.thing;
    let type = thing.type;

    if (!this.state.thing) {
      return <div />;
    }
    let onSubmit = this.onSubmit.bind(this);
    let tagseditor = (
      <Field
        fieldName="tags"
        type={RelatedEditor}
        maxSearchResults={30}
        dataSource={tags}
        intl={intl}
      />
    );
    let related_cases = (
      <Field
        fieldName="related_cases"
        type={RelatedEditor}
        dataSource={cases}
        dataSourceConfig={{ text: "text", value: "value" }}
        intl={intl}
      />
    );
    let related_methods = (
      <Field
        fieldName="related_methods"
        type={RelatedEditor}
        dataSource={methods}
        dataSourceConfig={{ text: "text", value: "value" }}
        intl={intl}
      />
    );
    let related_organizations = (
      <Field
        fieldName="related_organizations"
        type={RelatedEditor}
        dataSource={organizations}
        dataSourceConfig={{ text: "text", value: "value" }}
        intl={intl}
      />
    );

    let incomplete =
      (thing.title ? false : true) || (thing.body ? false : true);
    return (
      <Form
        onSubmit={onSubmit}
        state={thing}
        onChange={changes => this.setState({ thing: changes })}
      >
        <div className="main-contents">
          <Container className="detailed-case-component" fluid={true}>
            <Col md="3" className="hidden-sm-down sidepanel hidden-sm-down" />
            <Col md="8" xs="12" className="main-area">
              <div className="case-box">
                <h2 className="category">
                  {type}
                </h2>
                <h2 className="case-title">
                  {thing.title}
                </h2>
                <ImageListEditor auth={this.props.auth} thing={thing} />
                <div className="title-edit">
                  <label htmlFor="title">
                    {intl.formatMessage({ id: thing.type + "_title_label" })}
                  </label>
                </div>
                <Field
                  fieldName="title"
                  name="title"
                  type={Text}
                  placeholder={intl.formatMessage({
                    id: thing.type + "_title_placeholder"
                  })}
                  fullWidth={true}
                />
                <div>
                  <label htmlFor="body_en">
                    {intl.formatMessage({ id: thing.type + "_body_title" })}
                  </label>
                </div>
                <Field fieldName="body" type={LazyBodyEditor} />
                <div className="case-location">
                  <p className="sub-heading">
                    {intl.formatMessage({
                      id: "country_picker"
                    })}
                  </p>
                  <Geosuggest
                    placeholder={intl.formatMessage({
                      id: "location_placeholder"
                    })}
                  />
                </div>
                <p className="sub-heading">
                  {intl.formatMessage({ id: "tags_title" })}
                </p>
                <div className="suggest_tag">
                  {intl.formatMessage({ id: "suggest_tag" })}
                </div>
                {tagseditor}
                <ChoicePropEditor
                  intl={intl}
                  label="issue"
                  property="issue"
                  thing={thing}
                />
              </div>
              <div>
                {isQuick
                  ? <div>
                      <RaisedButton
                        className="incomplete-warning"
                        disabled={incomplete}
                        primary={true}
                        style={buttonStyle}
                        type="submit"
                        label={intl.formatMessage({
                          id: "submit_" + thing.type
                        })}
                      />
                      {incomplete
                        ? <span className="incomplete">
                            {intl.formatMessage({
                              id: "incomplete_" + thing.type
                            })}
                          </span>
                        : null}
                      <RaisedButton
                        onClick={() => onExpand(this.state.thing)}
                        style={buttonStyle}
                        label={intl.formatMessage({ id: "do_full_version" })}
                      />
                    </div>
                  : <div>
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
                            {intl.formatMessage({ id: "related_cases" })}
                          </h5>
                          {related_cases}
                        </div>
                        <div className="pb-1">
                          <h5>
                            {intl.formatMessage({ id: "related_methods" })}
                          </h5>
                          {related_methods}
                        </div>
                        <div className="pb-1">
                          <h5>
                            {intl.formatMessage({
                              id: "related_organizations"
                            })}
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
                      <RaisedButton
                        className="incomplete-warning"
                        disabled={incomplete}
                        primary={true}
                        style={buttonStyle}
                        type="submit"
                        label={intl.formatMessage({
                          id: "submit_" + thing.type
                        })}
                      />
                      {incomplete
                        ? <span className="incomplete">
                            {intl.formatMessage({
                              id: "incomplete_" + thing.type
                            })}
                          </span>
                        : null}
                    </div>}
              </div>

            </Col>
          </Container>
        </div>
      </Form>
    );
  }
}

CaseEditor.propTypes = {
  intl: intlShape.isRequired
};

export default CaseEditor;
