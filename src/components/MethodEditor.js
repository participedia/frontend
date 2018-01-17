import React, { Component } from "react";
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from "react-intl";
import { Form, Field } from "simple-react-form";
import BodyEditor from "./BodyEditor";
import { Container, Col } from "reactstrap";
import ImageListEditor from "./ImageListEditor";
import Text from "simple-react-form-material-ui/lib/text";
import Textarea from 'simple-react-form-material-ui/lib/textarea';
import Checkbox from 'simple-react-form-material-ui/lib/checkbox';
import tags_json from "../autocomplete_data/tags.json";

import "./CaseEditor.css";
import "./GeoSuggest/GeoSuggest.css";
import RelatedEditor from "./RelatedEditor";
import RaisedButton from "material-ui/RaisedButton";
import PublishIcon from "material-ui/svg-icons/editor/publish";
import {
  makeLocalizedChoiceField,
  makeLocalizedBooleanField,
  makeLocalizedNumberField,
  makeLocalizedListField
} from "./PropEditors";
import fix_related from "./fix-related.js";

const tags = tags_json["tags"];

const buttonStyle = {
  margin: "1em"
};

class MethodEditor extends Component {
  constructor(props) {
    super(props);
    if (!props.thing.images) {
      props.thing.images = [];
    }
    if (!props.thing.body) {
      props.thing.body = props.intl.formatMessage({
        id: "method_description_placeholder"
      });
    }
    this.state = { thing: props.thing };
    this.updateBody = this.updateBody.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let thing = nextProps.thing;
    this.setState({ thing });
  }

  updateBody(body) {
    let updatedThing = Object.assign({}, this.state.thing, { body: body });
    this.setState({ thing: updatedThing });
  }

  onSubmit() {
    // is this now a do-nothing method?
    let thing = this.state.thing;
    this.props.onSubmit(thing);
  }
  render() {
    let { cases, methods, organizations, isQuick, onExpand, intl } = this.props;
    let thing = this.state.thing;
    thing.related_cases = fix_related(thing.related_cases);
    thing.related_methods = fix_related(thing.related_methods);
    thing.related_organizations = fix_related(thing.related_organizations);

    if (!this.state.thing) {
      return <div />;
    }
    let onSubmit = this.onSubmit.bind(this);
    let tagseditor = (
      <Field
        fieldName="tags"
        type={RelatedEditor}
        item_type="method"
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
        placeholder={intl.formatMessage({
          id: "related_cases_placeholder"
        })}
      />
    );
    let related_methods = (
      <Field
        fieldName="related_methods"
        type={RelatedEditor}
        dataSource={methods}
        dataSourceConfig={{ text: "text", value: "value" }}
        placeholder={intl.formatMessage({
          id: "related_methods_placeholder"
        })}
      />
    );
    let related_organizations = (
      <Field
        fieldName="related_organizations"
        type={RelatedEditor}
        dataSource={organizations}
        dataSourceConfig={{ text: "text", value: "value" }}
        placeholder={intl.formatMessage({
          id: "related_organizations_placeholder"
        })}
      />
    );
    let issue = this.state.thing.general_issues;
    let incomplete = thing.title ? false : true;
    let doFullVersion = this.props.new
      ? "do_full_version"
      : "edit_full_version";
    let quickSubmitText = "publish";
    let fullSubmitText = "publish";
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
                <div className="field-case top">
                  <h2 className={isQuick ? "sub-heading hidden" : "sub-heading"}>
                    <FormattedMessage id="overview"/>
                  </h2>
                  <h3 className="sub-heading">
                    <label htmlFor="title">
                      <FormattedMessage id={thing.type + "_title_label"} />
                    </label>
                  </h3>
                  <p className="explanatory-text"><FormattedHTMLMessage
                    id={intl.formatMessage({
                      id: thing.type + "_title_explanatory"
                    })}/></p>
                  <Field
                    fieldName="title"
                    name="title"
                    className="custom-field"
                    type={Text}
                    placeholder={intl.formatMessage({
                      id: "method_title_placeholder"
                    })}
                    fullWidth
                  />
                </div>
                <div className="field-case">
                  <h3 className="sub-heading">
                    <label htmlFor="title">
                      <FormattedMessage id="brief_description" />
                    </label>
                  </h3>
                  <p className="explanatory-text"><FormattedHTMLMessage
                    id="method_brief_description_explanatory"/></p>
                  <Field
                    fieldName="brief_description"
                    name="brief_description"
                    className="custom-textarea"
                    underlineShow={false}
                    maxLength="280"
                    type={Textarea}
                    placeholder={intl.formatMessage({ id: "method_brief_description_placeholder"})}
                    fullWidth
                  />
                </div>
                {!isQuick ?
                  <div className="field-case">
                    <h3 className="sub-heading" htmlFor="body_en">
                      {intl.formatMessage({
                        id: thing.type + "_body_title"
                      })}
                    </h3>
                    <p className="explanatory-text"><FormattedHTMLMessage
                      id="method_description_instructional"/></p>
                    <BodyEditor onEditorChange={this.updateBody} html={thing.body} />
                  </div>
                :
                undefined
                }
                <div className="field-case">
                  {makeLocalizedListField(intl, "links", "method")}
                </div>
                <div className="field-case">
                  {tagseditor}
                </div>
                <div className="field-case media">
                  <h2 className="sub-heading">
                    <FormattedMessage id="media" />
                  </h2>
                  <h3 className="sub-sub-heading">
                    <FormattedMessage id="photos" />
                  </h3>
                  <ImageListEditor property="images" thing={thing} />
                  {makeLocalizedListField(intl, "videos", "method")}
                </div>
                {!isQuick ? ( 
                  <div>
                    <div className="form-section">
                      <h2 className="section-heading">
                        <FormattedMessage id="basic_info" />
                      </h2>
                      {makeLocalizedNumberField(intl, "minimum_participants")}
                      {makeLocalizedNumberField(intl, "maximum_participants")}
                      {makeLocalizedNumberField(intl, "minimum_duration")}
                      {makeLocalizedNumberField(intl, "maximum_duration")}
                      {makeLocalizedNumberField(intl, "minimum_cost")}
                      {makeLocalizedNumberField(intl, "maximum_cost")}
                      <Field
                        fieldName="facilitated"
                        name="facilitated"
                        label="ok"
                        type={Checkbox}
                        label={intl.formatMessage({
                          id: "facilitated_label"
                        })}
                        fullWidth
                      />
                    </div>
                    <div className="form-section">
                      <h2 className="section-heading">
                        <FormattedMessage id="classification" />
                      </h2>
                      {makeLocalizedChoiceField(intl, "kind_of_influence")}
                      {makeLocalizedChoiceField(intl, "participant_selection")}
                      {makeLocalizedChoiceField(intl, "communication_mode")}
                    </div>
                  </div>
                  ) 
                  : 
                  undefined
                }
              </div>
              <div>
                {isQuick ? (
                  <div>
                    {incomplete ? (
                      <div className="pt-3 incomplete">
                        {intl.formatMessage({
                          id: "incomplete_" + thing.type
                        })}
                      </div>
                    ) : null}
                    <RaisedButton
                      className="publish left customButton"
                      disabled={incomplete}
                      labelPosition="after"
                      icon={<PublishIcon />}
                      secondary
                      style={buttonStyle}
                      type="submit"
                      label={intl.formatMessage({
                        id: quickSubmitText
                      })}
                    />
                    <RaisedButton
                      onClick={() => onExpand(this.state.thing)}
                      className="customButton full-submit"
                      style={buttonStyle}
                      primary
                      label={intl.formatMessage({ id: doFullVersion })}
                    />
                  </div>
                ) : (
                  <div>
                    {makeLocalizedChoiceField(
                      intl,
                      "general_issues",
                      "issue",
                      "general_issues"
                    )}
                    {issue ? (
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
                    
                    
                    {makeLocalizedChoiceField(
                      intl,
                      "communication_with_audience"
                    )}
                    {makeLocalizedChoiceField(
                      intl,
                      "facetoface_online_or_both"
                    )}
                    {makeLocalizedBooleanField(intl, "facilitated")}
                    {makeLocalizedChoiceField(intl, "best_for")}
                    {makeLocalizedChoiceField(intl, "decision_method")}
                    {makeLocalizedChoiceField(intl, "governance_contribution")}
                    {makeLocalizedChoiceField(intl, "issue_interdependency")}
                    {makeLocalizedChoiceField(intl, "issue_polarization")}
                    {makeLocalizedChoiceField(
                      intl,
                      "issue_technical_complexity"
                    )}
                    {makeLocalizedChoiceField(
                      intl,
                      "public_interaction_method"
                    )}
                    {makeLocalizedChoiceField(intl, "method_of_interaction")}
                    {makeLocalizedChoiceField(intl, "typical_funding_source")}
                    {makeLocalizedChoiceField(
                      intl,
                      "typical_implementing_entity"
                    )}
                    {makeLocalizedChoiceField(
                      intl,
                      "typical_sponsoring_entity"
                    )}
                    <div className="field-case last related">
                      <h2 className="sub-heading">
                        <FormattedMessage id="related_content" />
                      </h2>
                      <div className="related-content">
                        <h3 className="sub-sub-heading">
                          <FormattedMessage id="related_cases" />
                        </h3>
                        {related_cases}
                        <h3 className="sub-sub-heading mt-3">
                          <FormattedMessage id="related_methods" />
                        </h3>
                        {related_methods}
                        <h3 className="sub-sub-heading mt-3">
                          <FormattedMessage id="related_organizations" />
                        </h3>
                        {related_organizations}
                      </div>
                    </div>
                    {incomplete ? (
                      <p className="incomplete">
                        {intl.formatMessage({
                          id: "incomplete_" + thing.type
                        })}
                      </p>
                    ) : null}
                    <RaisedButton
                      className="publish left customButton"
                      disabled={incomplete}
                      labelPosition="after"
                      icon={<PublishIcon />}
                      secondary
                      style={buttonStyle}
                      type="submit"
                      label={intl.formatMessage({
                        id: fullSubmitText
                      })}
                    />
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

export default injectIntl(MethodEditor);
