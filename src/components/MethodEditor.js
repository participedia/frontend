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
  makeLocalizedBooleanField
} from "./PropEditors";

const tags = tags_json["tags"];

const buttonStyle = {
  margin: "1em"
};

class MethodEditor extends Component {
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
                        label={intl.formatMessage({ id: "do_full_version" })}
                      />
                    </div>
                  : <div>
                      <p className="sub-heading">
                        {intl.formatMessage({ id: "tags_title" })}
                      </p>
                      <div className="suggest_tag">
                        {intl.formatMessage({ id: "suggest_tag" })}
                      </div>
                      {tagseditor}
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
                      {makeLocalizedChoiceField(intl, "kind_of_influence")}
                      {makeLocalizedChoiceField(intl, "specific_topic")}
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
                      {makeLocalizedChoiceField(intl, "kind_of_influence")}
                      {makeLocalizedChoiceField(intl, "method_of_interaction")}
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

MethodEditor.propTypes = {
  intl: intlShape.isRequired
};

export default MethodEditor;
