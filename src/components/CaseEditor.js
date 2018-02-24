import React, { Component } from "react";
import {
  FormattedMessage,
  FormattedHTMLMessage,
  intlShape,
  injectIntl
} from "react-intl";
import { Form, Field } from "simple-react-form";
import BodyEditor from "./BodyEditor";
import { Container, Col } from "reactstrap";
import ImageListEditor from "./ImageListEditor";
import FileListEditor from "./FileListEditor";
import Text from "simple-react-form-material-ui/lib/text";
import Textarea from "simple-react-form-material-ui/lib/textarea";
import Checkbox from "simple-react-form-material-ui/lib/checkbox";
import tags_json from "../autocomplete_data/tags.json";
import "./CaseEditor.css";
import "./GeoSuggest/GeoSuggest.css";
import RelatedEditor from "./RelatedEditor";
import SearchableRelatedEditor from "./SearchableRelatedEditor";
import InfoBox from "./InfoBox";
import RaisedButton from "material-ui/RaisedButton";
import { encodeLocation } from "./geoutils";
import PublishIcon from "material-ui/svg-icons/editor/publish";
import { toTitleCase } from "../util.js";
import {
  makeLocalizedChoiceField,
  LocalizedMultiChoiceField,
  makeLocalizedDateField,
  makeLocalizedNumberField,
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
    let thing = Object.assign({}, props.thing);
    console.log("constructor issues: %o", thing.issues);
    thing = this.ensureValues(thing);
    this.state = { thing, modal: false };
    this.updateBody = this.updateBody.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  updateBody(body) {
    this.setState((prevState, props) => ({
      thing: Object.assign({}, prevState.thing, { body: body })
    }));
  }

  structureList(list) {
    const intl = this.props.intl;
    if (list && list.length && typeof list[0] === "string") {
      return list.map(v => ({
        text: toTitleCase(intl.formatMessage({ id: v })),
        value: v
      }));
    } else {
      return list;
    }
  }

  ensureValues(thing) {
    console.log("ensure values issues: %o", thing.issues);
    thing.images = thing.images || [];
    thing.body =
      thing.body ||
      this.props.intl.formatMessage({ id: "case_description_placeholder" });
    thing.issues = thing.issues || [];
    thing.specific_topics = thing.specific_topics || [];
    thing.relationships = thing.relationships || [];
    thing.purposes = thing.purposes || [];
    thing.approaches = thing.approaches || [];
    thing.targeted_participants = thing.targeted_participants || [];
    thing.participants_interactions = thing.participants_interactions || [];
    return thing;
  }

  structureLists(thing) {
    thing.issues = this.structureList(thing.issues);
    console.log("structureLists issues: %o", thing.issues);
    thing.specific_topics = this.structureList(thing.specific_topics);
    thing.relationships = this.structureList(thing.relationships);
    thing.purposes = this.structureList(thing.purposes);
    thing.approaches = this.structureList(thing.approaches);
    thing.targeted_participants = this.structureList(
      thing.targeted_participants
    );
    thing.participants_interactions = this.structureList(
      thing.participants_interactions
    );
    return thing;
  }

  componentWillReceiveProps(nextProps) {
    const intl = nextProps.intl;
    let thing = nextProps.thing;
    console.log("componentWillReceiveProps thing: %o", thing);
    if (!thing.body) {
      thing.body = intl.formatMessage({
        id: "case_description_placeholder"
      });
    }
    if (
      thing.number_of_meeting_days === null ||
      thing.number_of_meeting_days === "null"
    ) {
      thing.number_of_meeting_days = 0;
    }
    thing = this.structureLists(thing);
    this.setState({ thing });
  }

  onChange(key, value) {
    console.log("CaseEditor.onChange(%s, %o)", key, value);
    this.setState((prevState, props) => (prevState.thing[key] = value));
  }

  onSubmit() {
    let thing = this.state.thing;
    console.log("onSubmit thing: %s", JSON.stringify(thing));
    this.props.onSubmit(thing);
  }

  render() {
    let { cases, methods, organizations, isQuick, onExpand, intl } = this.props;
    // let thing = Object.assign({}, this.props.thing, this.state.thing);
    console.log("Case Editor render issues: %o", this.state.thing.issues);
    if (this.state.thing.issues === undefined) {
      return <div />;
    }
    let thing = this.structureLists(Object.assign({}, this.state.thing));
    if (!thing.location) {
      thing.location = "";
    }
    if (typeof thing.location !== typeof "") {
      thing.location = encodeLocation(thing.location);
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
                <div
                  className={isQuick ? "form-section quick" : "form-section"}
                >
                  <div className="field-case top">
                    <h2
                      className={isQuick ? "sub-heading hidden" : "sub-heading"}
                    >
                      <FormattedMessage id="overview" />
                    </h2>
                    <h3 className="sub-heading">
                      <label htmlFor="title">
                        <FormattedMessage id={thing.type + "_title_label"} />
                      </label>
                    </h3>
                    <p className="explanatory-text">
                      <FormattedHTMLMessage
                        id={thing.type + "_title_explanatory"}
                      />
                    </p>
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
                  {!isQuick ? (
                    <LocalizedMultiChoiceField
                      intl={intl}
                      property="relationships"
                      rankable={true}
                      limit={3}
                    />
                  ) : (
                    undefined
                  )}
                  <LocalizedMultiChoiceField
                    intl={intl}
                    property="issues"
                    value={thing.issues}
                    rankable={true}
                    limit={3}
                    onChange={this.onChange}
                  />
                  {thing.issues.length ? (
                    <div>
                      <LocalizedMultiChoiceField
                        intl={intl}
                        property="specific_topics"
                        value={thing.specific_topics}
                        rankable={true}
                        limit={3}
                        onChange={this.onChange}
                      />
                    </div>
                  ) : (
                    undefined
                  )}
                  <div className="field-case">
                    <h3 className="sub-heading">
                      <label htmlFor="title">
                        <FormattedMessage id="description" />
                      </label>
                    </h3>
                    <p className="explanatory-text">
                      <FormattedHTMLMessage id="description_explanatory" />
                    </p>
                    <Field
                      fieldName="description"
                      name="description"
                      className="custom-textarea"
                      underlineShow={false}
                      maxLength="280"
                      type={Textarea}
                      placeholder={intl.formatMessage({
                        id: "description_placeholder"
                      })}
                      fullWidth
                    />
                  </div>
                  {!isQuick ? (
                    <div className="field-case">
                      <h3 className="sub-heading" htmlFor="body_en">
                        {intl.formatMessage({
                          id: thing.type + "_body_title"
                        })}
                      </h3>
                      <p className="explanatory-text">
                        <FormattedHTMLMessage id="case_description_instructional" />
                      </p>
                      <BodyEditor
                        onEditorChange={this.updateBody}
                        html={thing.body}
                      />
                    </div>
                  ) : (
                    undefined
                  )}
                  <div className="field-case">
                    {makeLocalizedListField(intl, "links", "case")}
                  </div>
                  <div className="field-case">{tagseditor}</div>
                </div>
                {!isQuick ? (
                  <div className="form-section components">
                    <h2
                      className={
                        isQuick ? "section-heading hidden" : "section-heading"
                      }
                    >
                      <FormattedMessage id="components" />
                    </h2>
                    <p>
                      <FormattedMessage id="components_intro" />
                    </p>
                    <div className="field-case">{has_components}</div>
                    <div className="field-case">{is_component_of}</div>
                  </div>
                ) : (
                  undefined
                )}
                <div
                  className={isQuick ? "form-section quick" : "form-section"}
                >
                  <h2
                    className={
                      isQuick ? "section-heading hidden" : "section-heading"
                    }
                  >
                    <FormattedMessage id="location" />
                  </h2>
                  <div className="case-location">
                    <div className="field-case top">
                      {makeLocalizedLocationField(intl, "location", "location")}
                    </div>
                    {!isQuick
                      ? makeLocalizedChoiceField(intl, "scope_of_influence")
                      : undefined}
                  </div>
                </div>
                <div
                  className={isQuick ? "form-section quick" : "form-section"}
                >
                  <h2
                    className={
                      isQuick ? "section-heading hidden" : "section-heading"
                    }
                  >
                    <FormattedMessage id="media" />
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
                <div
                  className={isQuick ? "form-section quick" : "form-section"}
                >
                  <h2
                    className={
                      isQuick ? "section-heading hidden" : "section-heading"
                    }
                  >
                    <FormattedMessage id="date_duration" />
                  </h2>
                  <div className="field-case">
                    {makeLocalizedDateField(intl, "start_date")}
                    {makeLocalizedDateField(intl, "end_date")}
                    <Field
                      fieldName="ongoing"
                      name="ongoing"
                      type={Checkbox}
                      label={intl.formatMessage({
                        id: "ongoing_label"
                      })}
                      fullWidth
                    />
                    {!isQuick
                      ? makeLocalizedChoiceField(intl, "time_limited")
                      : undefined}
                  </div>
                </div>
                {!isQuick ? (
                  <div>
                    <div className="form-section">
                      <h2 className="section-heading">
                        <FormattedMessage id="purpose_approach" />
                      </h2>
                      <LocalizedMultiChoiceField
                        intl={intl}
                        property="purposes"
                        value={thing.purposes}
                        rankable={true}
                        limit={3}
                        onChange={this.onChange}
                      />
                      <LocalizedMultiChoiceField
                        intl={intl}
                        property="approaches"
                        value={thing.approaches}
                        rankable={true}
                        limit={3}
                        onChange={this.onChange}
                      />
                      {makeLocalizedChoiceField(intl, "public_spectrum")}
                    </div>
                    <div className="form-section">
                      <h2 className="section-heading">
                        <FormattedMessage id="participants" />
                      </h2>
                      {makeLocalizedNumberField(intl, "number_of_participants")}
                      {makeLocalizedChoiceField(intl, "open_limited")}
                      {thing &&
                      thing.open_limited ===
                        "limited_to_only_some_groups_or_individuals"
                        ? makeLocalizedChoiceField(intl, "recruitment_method")
                        : undefined}
                      {(thing &&
                        thing.open_limited ===
                          "open_to_all_with_special_effort_to_recruit_some_groups_eg_community_organizing_to_recruit_lowincome_earners") ||
                      thing.open_limited ===
                        "limited_to_only_some_groups_or_individuals" ? (
                        <LocalizedMultiChoiceField
                          intl={intl}
                          property="targeted_participants"
                          value={thing.targeted_participants}
                          rankable={false}
                          limit={3}
                          onChange={this.onChange}
                        />
                      ) : (
                        undefined
                      )}
                    </div>
                    <div className="form-section">
                      <h2 className="section-heading">
                        <FormattedMessage id="process" />
                      </h2>
                      {process_methods}
                      {makeLocalizedChoiceField(intl, "legality", false)}
                      {makeLocalizedChoiceField(intl, "facilitators", false)}
                      {thing && thing.facilitators === "yes"
                        ? makeLocalizedChoiceField(intl, "facilitator_training")
                        : undefined}
                      {makeLocalizedChoiceField(
                        intl,
                        "facetoface_online_or_both"
                      )}
                      <LocalizedMultiChoiceField
                        intl={intl}
                        property="participants_interaction"
                        value={thing.participants_interactions}
                        rankable={true}
                        limit={3}
                        onChange={this.onChange}
                      />
                      <LocalizedMultiChoiceField
                        intl={intl}
                        property="learning_resources"
                        value={thing.learning_resources}
                        rankable={false}
                        onChange={this.onChange}
                      />
                      <LocalizedMultiChoiceField
                        intl={intl}
                        property="decision_methods"
                        value={thing.decision_methods}
                        rankable={false}
                        onChange={this.onChange}
                      />
                      {thing.decision_methods &&
                      thing.decision_methods.find(o => o.value === "voting") ? (
                        <LocalizedMultiChoiceField
                          intl={intl}
                          property="if_voting"
                          value={thing.if_voting}
                          rankable={false}
                          onChange={this.onChange}
                        />
                      ) : (
                        undefined
                      )}
                      <LocalizedMultiChoiceField
                        intl={intl}
                        property="insights_outcomes"
                        value={thing.insights_outcomes}
                        rankable={false}
                        limit={3}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-section">
                      <h2 className="section-heading">
                        <FormattedMessage id="organizers_supporters" />
                      </h2>
                      {primary_organizer}
                      <LocalizedMultiChoiceField
                        intl={intl}
                        property="organizer_types"
                        value={thing.organizer_types}
                        rankable={false}
                        limit={3}
                        onChange={this.onChange}
                      />
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
                        <p className="explanatory-text">
                          <FormattedHTMLMessage id="funder_instructional" />
                          <InfoBox info="funder" />
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
                      <LocalizedMultiChoiceField
                        intl={intl}
                        property="funder_types"
                        value={thing.funder_types}
                        rankable={true}
                        limit={3}
                        onChange={this.onChange}
                      />
                      {makeLocalizedChoiceField(intl, "staff", false)}
                      {makeLocalizedChoiceField(intl, "volunteers", false)}
                    </div>
                    <div className="form-section">
                      <h2 className="section-heading">
                        <FormattedMessage id="impact_evidence" />
                      </h2>
                      {makeLocalizedChoiceField(intl, "impact_evidence", false)}
                      {thing && thing.impact_evidence === "yes" ? (
                        <LocalizedMultiChoiceField
                          intl={intl}
                          property="changes_types"
                          value={thing.changes_types}
                          rankable={true}
                          limit={5}
                          info={true}
                          onChange={this.onChange}
                        />
                      ) : (
                        undefined
                      )}
                      <LocalizedMultiChoiceField
                        intl={intl}
                        property="implementers_of_change"
                        value={thing.changes_types}
                        rankable={false}
                        onChange={this.onChange}
                      />
                      {makeLocalizedChoiceField(
                        intl,
                        "formal_evaluation",
                        false
                      )}
                      {thing && thing.formal_evaluation === "yes" ? (
                        <div>
                          <h3 className="sub-sub-heading">
                            <FormattedMessage id="evaluation_reports" />
                          </h3>
                          <FileListEditor
                            property="evaluation_links"
                            thing={thing}
                          />
                          <div className="field-case">
                            {makeLocalizedListField(intl, "evaluation_links")}
                          </div>
                        </div>
                      ) : (
                        undefined
                      )}
                    </div>
                  </div>
                ) : (
                  undefined
                )}
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
