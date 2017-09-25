import React, { Component } from "react";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import { Form, Field } from "simple-react-form";
import LazyBodyEditor from "./LazyBodyEditor";
import { Container, Col } from "reactstrap";
import ImageListEditor from "./ImageListEditor";
import Text from "simple-react-form-material-ui/lib/text";
import "./CaseEditor.css";
import "./GeoSuggest/GeoSuggest.css";
import RelatedEditor from "./RelatedEditor";
import RaisedButton from "material-ui/RaisedButton";
import tags_json from "../autocomplete_data/tags.json";
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
    this.state = { thing };
  }

  componentWillReceiveProps(nextProps) {
    let thing = nextProps.thing;
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
                    {intl.formatMessage({ id: thing.type + "_title_label" })}
                  </label>
                </div>
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
                <div className="case-location">
                  {makeLocalizedLocationField(intl, "location")}
                  <p className="sub-heading">
                    {intl.formatMessage({ id: "links" })}
                  </p>
                  {makeLocalizedListField(intl, "links")}
                </div>
                <p className="sub-heading">
                  <FormattedMessage id="media" />
                </p>
                <p className="sub-sub-heading">
                  <FormattedMessage id="photos" />
                </p>
                <ImageListEditor property="images" thing={thing} />
                <p className="sub-sub-heading">
                  <FormattedMessage id="videos" />
                </p>
                {makeLocalizedListField(intl, "videos")}
                <p className="sub-heading">
                  {intl.formatMessage({ id: "tags_title" })}
                </p>
                <div className="tags-field">{tagseditor}</div>
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
                      style={buttonStyle}
                      className="full-submit"
                      label={intl.formatMessage({ id: doFullVersion })}
                    />
                  </div>
                ) : (
                  <div>
                    <div>
                      {makeLocalizedTextField(intl, "executive_director")}
                      {makeLocalizedChoiceField(intl, "sector")}
                      {makeLocalizedChoiceField(intl, "specific_topic")}
                      <label className="sub-heading" htmlFor="body_en">
                        {intl.formatMessage({ id: thing.type + "_body_title" })}
                      </label>
                    </div>
                    <Field fieldName="body" type={LazyBodyEditor} />
                    <p className="sub-heading">Related Content</p>
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
                    {incomplete ? (
                      <p className="incomplete">
                        {intl.formatMessage({
                          id: "incomplete_" + thing.type
                        })}
                      </p>
                    ) : null}
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
