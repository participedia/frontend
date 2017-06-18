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
    let thing = props.thing;
    let images = thing.other_images || [];
    if (thing.lead_image) {
      images.unshift(thing.lead_image);
    }
    thing.images = images;
    this.state = { thing: props.thing };
  }

  componentWillReceiveProps(nextProps) {
    let thing = nextProps.thing;
    let images = thing.other_images || [];
    if (thing.lead_image) {
      images.unshift(thing.lead_image);
    }

    thing.images = images;
    delete thing.lead_image;
    delete thing.other_images;
    this.setState({ thing });
  }

  onSubmit() {
    let thing = this.state.thing;
    if (thing.images && thing.images.length > 0) {
      thing.lead_image = thing.images.shift();
      if (thing.lead_image && thing.lead_image.url) {
        thing.lead_image = { url: thing.lead_image.url };
      }
      thing.other_images = thing.images.map(img => ({
        url: img.url
      }));
      delete thing.images;
    }
    this.props.onSubmit(thing);
  }
  render() {
    let { cases, methods, organizations, isQuick, onExpand, intl } = this.props;
    let thing = this.state.thing;
    let type = thing.type;
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

    let issue = this.state.thing.issue;
    let incomplete =
      (thing.title ? false : true) || (thing.body ? false : true);
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
                {makeLocalizedListField(intl, "links")}
                <p className="sub-heading">
                  {intl.formatMessage({ id: "tags_title" })}
                </p>
                <div className="suggest_tag">
                  {intl.formatMessage({ id: "suggest_tag" })}
                </div>
                {tagseditor}
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
                        label={intl.formatMessage({ id: "do_full_version" })}
                      />
                    </div>
                  : <div>
                      {makeLocalizedChoiceField(intl, "issue")}
                      {issue
                        ? <div>
                            {makeLocalizedChoiceField(
                              intl,
                              "specific_topic",
                              issue,
                              "specific_topic"
                            )}
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
                      {makeLocalizedChoiceField(intl, "kind_of_influence")}
                      {makeLocalizedChoiceField(intl, "communication_mode")}
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
                      {makeLocalizedChoiceField(
                        intl,
                        "governance_contribution"
                      )}
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
                      <p className="sub-heading">
                        Related Content
                      </p>
                      <div className="related-content">
                        <div className="sub-sub-heading">
                          {intl.formatMessage({ id: "related_cases" })}
                        </div>
                        {related_cases}
                        <div className="sub-sub-heading">
                          {intl.formatMessage({ id: "related_methods" })}
                        </div>
                        {related_methods}
                        <div className="sub-sub-heading">
                          {intl.formatMessage({ id: "related_organizations" })}
                        </div>
                        {related_organizations}
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

MethodEditor.propTypes = {
  intl: intlShape.isRequired
};

export default MethodEditor;
