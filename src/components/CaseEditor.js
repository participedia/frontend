import React, { Component } from "react";
import { intlShape } from "react-intl";
import { Form, Field } from "simple-react-form";
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
  makeLocalizedChoiceField,
  makeLocalizedBooleanField,
  makeLocalizedDateField,
  makeLocalizedNumberField,
  makeLocalizedTextField,
  makeLocalizedLocationField,
  makeLocalizedListField
} from "./PropEditors";

const tags = tags_json["tags"];

const buttonStyle = {
  margin: "1em"
};

class CaseEditor extends Component {
  constructor(props) {
    super(props);
    let thing = props.thing;
    let images = thing.other_images || [];
    console.log("in constructor, thing", thing);
    if (thing.lead_image) {
      images.unshift(thing.lead_image);
    }
    thing.images = images;
    console.log("images", images);

    this.state = { thing };
  }

  componentWillReceiveProps(nextProps) {
    // We need to merge lead_image and other_images into one property
    let thing = nextProps.thing;
    console.log("in componentWillReceiveProps, thing", thing);
    let images = thing.other_images || [];
    if (thing.lead_image) {
      images.unshift(thing.lead_image);
    }
    console.log("images", images);

    thing.images = images;
    delete thing.lead_image;
    delete thing.other_images;

    this.setState({ thing });
  }

  onSubmit() {
    // We need to tweak the `images` property and split it into lead_image and other_images
    let thing = this.state.thing;
    thing.lead_image = thing.images.shift();
    thing.other_images = thing.images;
    delete thing.images;

    this.props.onSubmit(thing);
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
    let issue = this.state.thing.issue;
    return (
      <Form
        onSubmit={onSubmit}
        state={thing}
        onChange={changes => this.setState({ thing: changes })}
      >
        <div className="main-contents">
          <Container className="detailed-case-component" fluid>
            <Col md="3" className="hidden-sm-down sidepanel hidden-sm-down" />
            <Col md="8" xs="12" className="main-area">
              <div className="case-box">
                <h2 className="category">
                  {type}
                </h2>
                <h2 className="case-title">
                  {thing.title}
                </h2>
                <ImageListEditor
                  property="images"
                  auth={this.props.auth}
                  intl={intl}
                  thing={thing}
                />
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
                  fullWidth
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
                  {makeLocalizedLocationField(intl, "location")}
                </div>
                <p className="sub-heading">
                  {intl.formatMessage({ id: "tags_title" })}
                </p>
                <div className="suggest_tag">
                  {intl.formatMessage({ id: "suggest_tag" })}
                </div>
                {tagseditor}
                {makeLocalizedChoiceField(intl, "issue")}
                {issue
                  ? <div>
                      <p className="sub-sub-heading">
                        {intl.formatMessage({
                          id: "specific_topic"
                        })}:
                      </p>
                      {makeLocalizedChoiceField(intl, "specific_topic", issue)}
                    </div>
                  : undefined}
                {issue === "other" &&
                  this.state.thing.specific_topic === "other"
                  ? <b>
                      {intl.formatMessage({
                        id: "send_email_with_catgeory_additions"
                      })}
                    </b>
                  : undefined}
                {makeLocalizedListField(intl, "links")}
              </div>
              <div>
                {isQuick
                  ? <div>
                      {incomplete
                        ? <div className="incomplete">
                            {intl.formatMessage({
                              id: "incomplete_" + thing.type
                            })}
                          </div>
                        : null}
                      <RaisedButton
                        className="incomplete-warning"
                        disabled={incomplete}
                        primary
                        style={buttonStyle}
                        type="submit"
                        label={intl.formatMessage({
                          id: "submit_" + thing.type
                        })}
                      />
                      <RaisedButton
                        onClick={() => onExpand(this.state.thing)}
                        style={buttonStyle}
                        label={intl.formatMessage({ id: "do_full_version" })}
                      />
                    </div>
                  : <div>
                      <div className="related-content">
                        {makeLocalizedChoiceField(intl, "communication_mode")}
                        {makeLocalizedChoiceField(
                          intl,
                          "communication_with_audience"
                        )}
                        {makeLocalizedChoiceField(intl, "decision_method")}
                        {makeLocalizedChoiceField(
                          intl,
                          "facetoface_online_or_both"
                        )}
                        {makeLocalizedBooleanField(intl, "facilitated")}
                        {makeLocalizedChoiceField(intl, "voting")}
                        {makeLocalizedNumberField(
                          intl,
                          "number_of_meeting_days"
                        )}
                        {makeLocalizedChoiceField(
                          intl,
                          "targeted_participant_demographic"
                        )}
                        {makeLocalizedChoiceField(intl, "kind_of_influence")}
                        {makeLocalizedChoiceField(
                          intl,
                          "targeted_participants_public_role"
                        )}
                        {makeLocalizedChoiceField(intl, "targeted_audience")}
                        {makeLocalizedChoiceField(
                          intl,
                          "participant_selection"
                        )}
                        {makeLocalizedChoiceField(
                          intl,
                          "type_of_funding_entity"
                        )}
                        {makeLocalizedChoiceField(
                          intl,
                          "typical_implementing_entity"
                        )}
                        {makeLocalizedChoiceField(
                          intl,
                          "typical_sponsoring_entity"
                        )}
                        {makeLocalizedChoiceField(
                          intl,
                          "participant_selection"
                        )}
                        {}
                        {makeLocalizedBooleanField(intl, "ongoing")}
                        {makeLocalizedDateField(intl, "start_date")}
                        {makeLocalizedDateField(intl, "end_date")}
                        {makeLocalizedTextField(intl, "staff_type")}
                        {makeLocalizedTextField(
                          intl,
                          "who_else_supported_the_initiative"
                        )}
                        <div className="pb-1">
                          <p className="sub-sub-heading">
                            {intl.formatMessage({ id: "related_cases" })}
                          </p>
                          {related_cases}
                        </div>
                        <div className="pb-1">
                          <p className="sub-sub-heading">
                            {intl.formatMessage({ id: "related_methods" })}
                          </p>
                          {related_methods}
                        </div>
                        <div className="pb-1">
                          <p className="sub-sub-heading">
                            {intl.formatMessage({
                              id: "related_organizations"
                            })}
                          </p>
                          {related_organizations}
                        </div>{" "}
                      </div>
                      <RaisedButton
                        className="incomplete-warning"
                        disabled={incomplete}
                        primary
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
