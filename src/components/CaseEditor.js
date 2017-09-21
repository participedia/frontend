import React, { Component } from "react";
import { FormattedMessage, intlShape, injectIntl } from "react-intl";
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
import fix_related from "./fix-related.js";
import { encodeLocation } from "./geoutils";
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
    if (!thing.images) {
      thing.images = [];
    }
    if (!thing.body) {
      thing.body = props.intl.formatMessage({
        id: "case_description_placeholder"
      });
    }
    this.state = { thing };
  }

  componentWillReceiveProps(nextProps) {
    let thing = nextProps.thing;
    if (!thing.body) {
      thing.body = nextProps.intl.formatMessage({
        id: "case_description_placeholder"
      });
    }
    if (
      thing.number_of_meeting_days === null ||
      thing.number_of_meeting_days === "null"
    ) {
      thing.number_of_meeting_days = 0;
    }
    this.setState({ thing });
  }

  onSubmit() {
    let thing = this.state.thing;
    this.props.onSubmit(thing);
  }
  render() {
    let { cases, methods, organizations, isQuick, onExpand, intl } = this.props;
    let thing = this.state.thing;
    thing.related_cases = fix_related(thing.related_cases);
    thing.related_methods = fix_related(thing.related_methods);
    thing.related_organizations = fix_related(thing.related_organizations);
    if (!thing.location) {
      thing.location = "";
    }
    if (typeof thing.location !== typeof "") {
      thing.location = encodeLocation(thing.location);
    }

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
        placeholder={intl.formatMessage({
          id: "tags_placeholder"
        })}
      />
    );
    let related_cases = (
      <Field
        fieldName="related_cases"
        type={RelatedEditor}
        dataSource={cases}
        dataSourceConfig={{ text: "text", value: "value" }}
      />
    );
    let related_methods = (
      <Field
        fieldName="related_methods"
        type={RelatedEditor}
        dataSource={methods}
        dataSourceConfig={{ text: "text", value: "value" }}
      />
    );
    let related_organizations = (
      <Field
        fieldName="related_organizations"
        type={RelatedEditor}
        dataSource={organizations}
        dataSourceConfig={{ text: "text", value: "value" }}
      />
    );
    let incomplete = thing.title ? false : true;
    let issue = this.state.thing.issue;
    let doFullVersion = this.props.new
      ? "do_full_version"
      : "edit_full_version";
    let quickSubmitText = this.props.new ? "quick_submit_case" : "save";
    return (
      <Form
        onSubmit={onSubmit}
        state={thing}
        onChange={changes => this.setState({ thing: changes })}
      >
        <div className="main-contents">
          <Container className="detailed-case-component" fluid>
            <Col
              md="3"
              className="d-none d-sm-block d-md-block d-lg-block d-xl-block sidepanel"
            />
            <Col md="6" className="ml-auto mr-auto">
              <div className="case-box">
                <div className="sub-heading top title-edit">
                  <label htmlFor="title">
                    <FormattedMessage id={thing.type + "_title_label"} />
                  </label>
                </div>
                <Field
                  fieldName="title"
                  name="title"
                  className="custom-field"
                  type={Text}
                  placeholder={intl.formatMessage({
                    id: thing.type + "_title_placeholder"
                  })}
                  fullWidth
                />
                {makeLocalizedChoiceField(
                  intl,
                  "issue",
                  "issue",
                  "general_issues"
                )}
                {issue && !isQuick ? (
                  <div>
                    {makeLocalizedChoiceField(
                      intl,
                      "specific_topic",
                      issue,
                      "specific_topic"
                    )}
                  </div>
                ) : (
                  undefined
                )}
                {issue === "other" &&
                this.state.thing.specific_topic === "other" ? (
                  <b>
                    {intl.formatMessage({
                      id: "send_email_with_catgeory_additions"
                    })}
                  </b>
                ) : (
                  undefined
                )}
                <div className="case-location">
                  {makeLocalizedLocationField(intl, "location")}
                  <p className="sub-heading">
                    <FormattedMessage id="date" />
                  </p>
                  {makeLocalizedDateField(intl, "start_date")}
                  {makeLocalizedDateField(intl, "end_date")}
                  <p className="sub-heading">
                    <FormattedMessage id="links" />
                  </p>
                  {makeLocalizedListField(intl, "links")}
                </div>
                <p className="sub-heading">
                  <FormattedMessage id="media" />
                </p>
                <ImageListEditor
                  property="images"
                  auth={this.props.auth}
                  thing={thing}
                />
                {makeLocalizedListField(intl, "videos")}
                <p className="sub-heading">
                  <FormattedMessage id="tags_title" />
                </p>
                <div className="tags-field">{tagseditor}</div>
              </div>
              <div>
                {isQuick ? (
                  <div>
                    {incomplete ? (
                      <div className="incomplete">
                        <FormattedMessage id={"incomplete_" + thing.type} />
                      </div>
                    ) : null}
                    <RaisedButton
                      className={
                        this.props.new
                          ? "new quick incomplete-warning"
                          : "quick incomplete-warning"
                      }
                      disabled={incomplete}
                      primary
                      style={buttonStyle}
                      type="submit"
                      label={intl.formatMessage({
                        id: quickSubmitText
                      })}
                    />
                    <RaisedButton
                      onClick={() => onExpand(this.state.thing)}
                      className="full-submit"
                      style={buttonStyle}
                      label={intl.formatMessage({ id: doFullVersion })}
                    />
                  </div>
                ) : (
                  <div>
                    <div>
                      <label className="sub-heading" htmlFor="body_en">
                        {intl.formatMessage({
                          id: thing.type + "_body_title"
                        })}
                      </label>
                    </div>
                    <Field fieldName="body" type={LazyBodyEditor} />
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
                      {makeLocalizedNumberField(intl, "number_of_meeting_days")}
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
                      {makeLocalizedChoiceField(intl, "participant_selection")}
                      {makeLocalizedChoiceField(intl, "type_of_funding_entity")}
                      {makeLocalizedChoiceField(
                        intl,
                        "typical_implementing_entity"
                      )}
                      {makeLocalizedChoiceField(
                        intl,
                        "typical_sponsoring_entity"
                      )}
                      {}
                      {makeLocalizedBooleanField(intl, "ongoing")}
                      {makeLocalizedTextField(intl, "staff_type")}
                      {makeLocalizedTextField(
                        intl,
                        "who_else_supported_the_initiative"
                      )}
                      <div className="pb-1">
                        <p className="sub-heading">
                          <FormattedMessage id="related_cases" />
                        </p>
                        {related_cases}
                      </div>
                      <div className="pb-1">
                        <p className="sub-heading">
                          <FormattedMessage id="related_methods" />
                        </p>
                        {related_methods}
                      </div>
                      <div className="pb-1">
                        <p className="sub-heading">
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
                    {incomplete ? (
                      <span className="incomplete">
                        {intl.formatMessage({
                          id: "incomplete_" + thing.type
                        })}
                      </span>
                    ) : null}
                  </div>
                )}
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

export default injectIntl(CaseEditor);
