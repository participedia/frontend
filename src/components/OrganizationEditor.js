import React, { Component } from "react";
import { FormattedMessage, FormattedHTMLMessage, injectIntl, intlShape } from "react-intl";
import { Form, Field } from "simple-react-form";
import BodyEditor from "./BodyEditor";
import { Container, Col } from "reactstrap";
import ImageListEditor from "./ImageListEditor";
import Text from "simple-react-form-material-ui/lib/text";
import Textarea from 'simple-react-form-material-ui/lib/textarea';
import "./CaseEditor.css";
import "./GeoSuggest/GeoSuggest.css";
import RelatedEditor from "./RelatedEditor";
import RaisedButton from "material-ui/RaisedButton";
import tags_json from "../autocomplete_data/tags.json";
import PublishIcon from "material-ui/svg-icons/editor/publish";
import {
  makeLocalizedChoiceField,
  makeLocalizedTextField,
  makeLocalizedLocationField,
  makeLocalizedListField
} from "./PropEditors";
import fix_related from "./fix-related.js";
import { encodeLocation } from "./geoutils";

const buttonStyle = {
  margin: "1em"
};

const tags = tags_json["tags"];

class OrganizationEditor extends Component {
  constructor(props) {
    super(props);
    let thing = props.thing;
    if (!thing.images) {
      thing.images = [];
    }
    if (!props.thing.body) {
      thing.body = props.intl.formatMessage({
        id: "org_description_placeholder"
      });
    }
    this.state = { thing };
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
                <div className="form-section">
                  <h2 className={isQuick ? "section-heading hidden" : "section-heading"}>
                    <FormattedMessage id="overview"/>
                  </h2>
                  <div className="field-case top">
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
                      className="custom-field org-title"
                      type={Text}
                      placeholder={intl.formatMessage({
                        id: thing.type + "_title_placeholder"
                      })}
                      fullWidth
                    />
                    {makeLocalizedListField(intl, "links", "org")}
                    <h3 className="sub-heading">
                      <label htmlFor="title">
                        <FormattedMessage id="brief_description" />
                      </label>
                    </h3>
                    <p className="explanatory-text"><FormattedHTMLMessage
                      id="brief_description_org_explanatory"/></p>
                    <Field
                      fieldName="brief_description"
                      name="brief_description"
                      className="custom-textarea"
                      underlineShow={false}
                      maxLength="280"
                      type={Textarea}
                      placeholder={intl.formatMessage({ id: "brief_description_org_placeholder"})}
                      fullWidth
                    />
                    <div className="field-case">
                      <h3 className="sub-heading" htmlFor="body_en">
                        {intl.formatMessage({ id: thing.type + "_body_title" })}
                      </h3>
                      <p className="explanatory-text"><FormattedHTMLMessage
                        id="org_description_instructional"/></p>
                      <BodyEditor
                        onEditorChange={this.updateBody}
                        html={thing.body}
                      />
                    </div>
                    {makeLocalizedLocationField(intl, "location")}
                  </div>
                </div>
                <div className={isQuick ? "form-section quick" : "form-section"}>
                  <h2 className={isQuick ? "section-heading hidden" : "section-heading"}>
                    <FormattedMessage id="media" />
                  </h2>
                  <div className="field-case">
                    <h3 className="sub-sub-heading">
                      <FormattedMessage id="photos" />
                    </h3>
                    <ImageListEditor property="images" thing={thing} />
                    {makeLocalizedListField(intl, "videos", "org")}
                  </div>
                </div>
                {!isQuick ?
                <div className="form-section">
                  <h2 className="section-heading">
                    <FormattedMessage id="classification" />
                  </h2>
                  {makeLocalizedChoiceField(intl, "sector")}
                </div>
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

OrganizationEditor.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(OrganizationEditor);
