import React, { Component } from "react";
import { FormattedMessage, FormattedHTMLMessage, intlShape, injectIntl } from "react-intl";
import { Form, Field } from "simple-react-form";
import BodyEditor from "./BodyEditor";
import { Container, Col } from "reactstrap";
import ImageListEditor from "./ImageListEditor";
import FileListEditor from "./FileListEditor";
import Text from "simple-react-form-material-ui/lib/text";
import Textarea from 'simple-react-form-material-ui/lib/textarea';
import Checkbox from 'simple-react-form-material-ui/lib/checkbox';
import tags_json from "../autocomplete_data/tags.json";
import "./CaseEditor.css";
import "./GeoSuggest/GeoSuggest.css";
import RelatedEditor from "./RelatedEditor";
import SearchableRelatedEditor from "./SearchableRelatedEditor";
import InfoBox from "./InfoBox";
import RaisedButton from "material-ui/RaisedButton";
import fix_related from "./fix-related.js";
import { encodeLocation } from "./geoutils";
import PublishIcon from "material-ui/svg-icons/editor/publish";
import preventDefault from "react-prevent-default";
import {
  makeLocalizedChoiceField,
  makeLocalizedMultiChoiceField,
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
    this.state = { thing, modal: false };
    this.updateBody = this.updateBody.bind(this);
  }

  updateBody(body) {
    let updatedThing = Object.assign({}, this.state.thing, {body: body});
    this.setState({thing:updatedThing});
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
        item_type="case"
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
    let process_methods = (
      <Field
        fieldName="process_methods"
        type={RelatedEditor}
        item_type="case"
        info="process_methods"
        dataSource={methods}
        dataSourceConfig={{ text: "text", value: "value" }}
        placeholder={intl.formatMessage({
          id: "process_methods_placeholder"
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
    let primary_organizer = (
      <Field
        fieldName="primary_organizer"
        type={RelatedEditor}
        item_type="case"
        info="primary_organizer"
        dataSource={organizations}
        dataSourceConfig={{ text: "text", value: "value" }}
        placeholder={intl.formatMessage({
          id: "primary_organizer_placeholder"
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
    let has_components = (
      <Field
        fieldName="has_components"
        info="has_components"
        type={RelatedEditor}
        item_type="case"
        dataSource={cases}
        dataSourceConfig={{ text: "text", value: "value" }}
        placeholder={intl.formatMessage({
          id: "has_components_placeholder"
        })}
      />
    );
    let is_component_of = (
      <Field
        fieldName="is_component_of"
        info="is_component_of"
        type={SearchableRelatedEditor}
        dataSource={cases}
        dataSourceConfig={{ text: "text", value: "value" }}
        placeholder={intl.formatMessage({
          id: "is_component_of_placeholder"
        })}
      />
    );
    let incomplete = thing.title ? false : true;
    let issues = this.state.thing.issues;
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
                <div className={isQuick ? "form-section quick" : "form-section"}>
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
                        id: "case_title_placeholder"
                      })}
                      fullWidth
                    />
                  </div>
                  {!isQuick ?
                    makeLocalizedMultiChoiceField(
                      intl,
                      "relationships",
                      "relationships",
                      "relationships",
                      true,
                      3
                    )
                  :
                  undefined  
                  }
                  {makeLocalizedMultiChoiceField(
                    intl,
                    "issues",
                    "issues",
                    "issues",
                    true,
                    3
                  )}
                  {issues ? 
                    <div>
                      {makeLocalizedMultiChoiceField(
                        intl,
                        "specific_topics",
                        "specific_topics",
                        "specific_topics",
                        true,
                        3
                      )}
                    </div>
                  : (
                    undefined
                  )}
                  <div className="field-case">
                    <h3 className="sub-heading">
                      <label htmlFor="title">
                        <FormattedMessage id="brief_description" />
                      </label>
                    </h3>
                    <p className="explanatory-text"><FormattedHTMLMessage
                      id="brief_description_explanatory"/></p>
                    <Field
                      fieldName="brief_description"
                      name="brief_description"
                      className="custom-textarea"
                      underlineShow={false}
                      maxLength="280"
                      type={Textarea}
                      placeholder={intl.formatMessage({ id: "brief_description_placeholder"})}
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
                        id="case_description_instructional"/></p>
                      <BodyEditor onEditorChange={this.updateBody} html={thing.body} />
                    </div>
                  :
                  undefined
                  }
                  <div className="field-case">
                    {makeLocalizedListField(intl, "links", "case")}
                  </div>
                  <div className="field-case">
                    {tagseditor}
                  </div>
                </div>
                {!isQuick ?
                <div className="form-section components">
                  <h2 className={isQuick ? "section-heading hidden" : "section-heading"}>
                    <FormattedMessage id="components"/>
                  </h2>
                  <p><FormattedMessage id="components_intro"/></p>
                  <div className="field-case">
                    {has_components}
                  </div>
                  <div className="field-case">
                    {is_component_of}
                  </div>
                </div>
                :
                undefined
                }
                <div className={isQuick ? "form-section quick" : "form-section"}>
                  <h2 className={isQuick ? "section-heading hidden" : "section-heading"}>
                    <FormattedMessage id="location"/>
                  </h2>
                  <div className="case-location">
                    <div className="field-case top">
                      {makeLocalizedLocationField(intl, "primary_location")}
                    </div>
                    {!isQuick ?
                      makeLocalizedChoiceField(intl, "scope_of_influence")
                    :
                      undefined  
                    }
                  </div>
                </div>
                <div className={isQuick ? "form-section quick" : "form-section"}>
                  <h2 className={isQuick ? "section-heading hidden" : "section-heading"}>
                    <FormattedMessage id="media"/>
                  </h2>
                  <div className="field-case">
                    <h3 className="sub-sub-heading">
                      <FormattedMessage id="photos" />
                    </h3>
                    <ImageListEditor property="images" thing={thing} />
                    {makeLocalizedListField(intl, "videos", "case")}
                    <h3 className="sub-sub-heading">
                      <FormattedMessage id="files" />
                    </h3>
                    <FileListEditor property="files" thing={thing} />
                  </div>
                </div>
                <div className={isQuick ? "form-section quick" : "form-section"}>
                  <h2 className={isQuick ? "section-heading hidden" : "section-heading"}>
                    <FormattedMessage id="date_duration" />
                  </h2>
                  <div className="field-case">
                    {makeLocalizedDateField(intl, "start_date")}
                    {makeLocalizedDateField(intl, "end_date")}
                    <Field
                      fieldName="ongoing"
                      name="ongoing"
                      label="ok"
                      type={Checkbox}
                      label={intl.formatMessage({
                        id: "ongoing_label"
                      })}
                      fullWidth
                    />
                    {!isQuick ?
                      makeLocalizedChoiceField(intl, "time_limited")
                      :
                      undefined
                    }
                  </div>
                </div>
                {!isQuick ?
                  <div>
                  <div className="form-section">
                    <h2 className="section-heading">
                      <FormattedMessage id="purpose_approach" />
                    </h2>
                    {makeLocalizedMultiChoiceField(
                      intl,
                      "purpose",
                      "purpose",
                      "purpose",
                      true,
                      3
                    )}
                    {makeLocalizedMultiChoiceField(
                      intl,
                      "approach",
                      "approach",
                      "approach",
                      true,
                      3
                    )}
                    {makeLocalizedChoiceField(intl, "public_spectrum")}
                  </div>
                  <div className="form-section">
                    <h2 className="section-heading">
                      <FormattedMessage id="participants" />
                    </h2>
                    {makeLocalizedNumberField(intl, "number_of_participants")}
                    {makeLocalizedChoiceField(intl, "open_limited")}
                    { thing && thing.open_limited==="limited_to_only_some_groups_or_individuals" ?
                      makeLocalizedChoiceField(intl, "recruitment_method")
                      :
                      undefined
                    }
                    { thing && thing.open_limited==="open_to_all_with_special_effort_to_recruit_some_groups_eg_community_organizing_to_recruit_lowincome_earners" || thing.open_limited==="limited_to_only_some_groups_or_individuals" ?
                      makeLocalizedChoiceField(intl, "targeted_participants")
                      :
                      undefined
                    }
                  </div>
                  <div className="form-section">
                    <h2 className="section-heading">
                      <FormattedMessage id="process" />
                    </h2>
                    {process_methods}
                    {makeLocalizedChoiceField(intl, "legality", "legality", "legality", false)}
                    {makeLocalizedChoiceField(intl, "facilitators", "facilitators", "facilitators", false)}
                    { thing && thing.facilitators==="yes" ?
                      makeLocalizedChoiceField(intl, "facilitator_training")
                      :
                      undefined
                    }
                    {makeLocalizedChoiceField(
                      intl,
                      "facetoface_online_or_both"
                    )}
                    {makeLocalizedMultiChoiceField(
                      intl,
                      "participants_interaction",
                      "participants_interaction",
                      "participants_interaction",
                      true,
                      3
                    )}
                    {makeLocalizedMultiChoiceField(
                      intl,
                      "learning_resources",
                      "learning_resources",
                      "learning_resources",
                      false
                    )}
                    {makeLocalizedMultiChoiceField(
                      intl, 
                      "decision_methods",
                      "decision_methods",
                      "decision_methods",
                      false
                    )}
                    { thing.decision_methods && thing.decision_methods.find(o => o.value === "voting") ?
                      makeLocalizedMultiChoiceField(intl, "if_voting", "if_voting", "if_voting", false)
                      :
                      undefined
                    }
                    {makeLocalizedMultiChoiceField(
                      intl, 
                      "insights_outcomes",
                      "insights_outcomes",
                      "insights_outcomes",
                      false,
                      3
                    )}
                  </div>
                  <div className="form-section">
                    <h2 className="section-heading">
                      <FormattedMessage id="organizers_supporters" />
                    </h2>
                    {primary_organizer}
                    {makeLocalizedMultiChoiceField(
                      intl,
                      "organizer_types",
                      "organizer_types",
                      "organizer_types",
                      false,
                      3
                    )}
                  </div>
                  <div className="form-section">
                    <h2 className="section-heading">
                      <FormattedMessage id="resources" />
                    </h2>
                    <div className="field-case top">
                      <h3 className="sub-heading">
                        <label htmlFor="funder">
                          <FormattedMessage id="funder_label" />
                        </label>
                      </h3>
                      <p className="explanatory-text"><FormattedHTMLMessage
                        id={intl.formatMessage({
                          id: "funder_instructional"
                        })}/>
                        <InfoBox info="funder"/>
                      </p>
                      <Field
                        fieldName="funder"
                        name="funder"
                        className="custom-field"
                        type={Text}
                        placeholder=""
                        fullWidth
                      />
                    </div>
                    {makeLocalizedMultiChoiceField(
                      intl,
                      "funder_types",
                      "funder_types",
                      "funder_types",
                      true,
                      3
                    )}
                    {makeLocalizedChoiceField(
                      intl,
                      "staff",
                      "staff",
                      "staff",
                      false
                    )}
                    {makeLocalizedChoiceField(
                      intl,
                      "volunteers",
                      "volunteers",
                      "volunteers",
                      false
                    )}
                  </div>
                  <div className="form-section">
                    <h2 className="section-heading">
                      <FormattedMessage id="impact_evidence" />
                    </h2>
                    {makeLocalizedChoiceField(
                      intl,
                      "impact_evidence",
                      "impact_evidence",
                      "impact_evidence",
                      false
                    )}
                    { thing && thing.impact_evidence==="yes" ?
                      makeLocalizedMultiChoiceField(
                        intl,
                        "changes_types",
                        "changes_types",
                        "changes_types",
                        true,
                        5,
                        true
                      )
                      :
                      undefined
                    }
                    {makeLocalizedMultiChoiceField(
                      intl,
                      "implementers_of_change",
                      "implementers_of_change",
                      "implementers_of_change",
                      false
                    )}
                    {makeLocalizedChoiceField(intl, "formal_evaluation", "formal_evaluation", "formal_evaluation", false)}
                    { thing && thing.formal_evaluation==="yes" ?
                      <div>
                        <h3 className="sub-sub-heading">
                          <FormattedMessage id="evaluation_reports" />
                        </h3>
                        <FileListEditor property="evaluation_links" thing={thing} />
                        <div className="field-case">
                          {makeLocalizedListField(intl, "evaluation_links")}
                        </div>
                      </div>
                      :
                      undefined
                    }
                  </div>
                  </div>
                :
                undefined  
                }  
              </div>
              <div>
                {isQuick ? (
                  <div>
                    {incomplete ? (
                      <div className="incomplete pt-4">
                        <FormattedMessage id={"incomplete_" + thing.type} />
                      </div>
                    ) : null}
                    <RaisedButton
                      className="publish left customButton"
                      disabled={incomplete}
                      label="Label after"
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
                    {incomplete ? (
                      <p className="pt-3 incomplete">
                        {intl.formatMessage({
                          id: "incomplete_" + thing.type
                        })}
                      </p>
                    ) : null}
                    <RaisedButton
                      className="publish left customButton"
                      disabled={incomplete}
                      label="Label after"
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

CaseEditor.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(CaseEditor);
