import React, { Component } from "react";
import { intlShape } from "react-intl";
import { Form, Field } from "simple-react-form";
import Geosuggest from "react-geosuggest";
import LazyBodyEditor from "./LazyBodyEditor";
import { Container, Col } from "reactstrap";
import ImageListEditor from "./ImageListEditor";
import Text from "simple-react-form-material-ui/lib/text";
import "./CaseEditor.css";
import "./GeoSuggest/GeoSuggest.css";
import {
  SimpleRelatedCases,
  SimpleRelatedMethods,
  SimpleRelatedOrganizations,
  Tags
} from "./RelatedEditors";
import RaisedButton from "material-ui/RaisedButton";
import tags_json from "../autocomplete_data/tags.json";

const buttonStyle = {
  margin: "1em"
};

const tags = tags_json["tags"];

class OrganizationEditor extends Component {
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
        name="tags"
        thing={thing}
        type={Tags}
        property="tags"
        value={thing.tags || []}
        dataSource={tags}
        intl={intl}
      />
    );
    let related_cases = (
      <Field
        fieldName="related_cases"
        name="related_cases"
        thing={thing}
        type={SimpleRelatedCases}
        property="related_cases"
        value={thing.related_cases || []}
        dataSource={cases}
        intl={intl}
      />
    );
    let related_methods = (
      <Field
        fieldName="related_methods"
        name="related_methods"
        thing={thing}
        type={SimpleRelatedMethods}
        property="related_methods"
        value={thing.related_methods || []}
        dataSource={methods}
        intl={intl}
      />
    );
    let related_organizations = (
      <Field
        fieldName="related_organizations"
        name="related_organizations"
        thing={thing}
        type={SimpleRelatedOrganizations}
        property="related_organizations"
        value={thing.related_organizations || []}
        dataSource={organizations}
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
                <div className="case-location">
                  <p className="sub-heading">
                    {intl.formatMessage({
                      id: "country_picker"
                    })}
                  </p>
                  <Geosuggest />
                  <p className="sub-heading">
                    {intl.formatMessage({ id: "tags_title" })}
                  </p>
                  <div className="suggest_tag">
                    {intl.formatMessage({ id: "suggest_tag" })}
                  </div>
                  {tagseditor}
                </div>
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
                        Keywords
                      </p>
                      keyword picker
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

OrganizationEditor.propTypes = {
  intl: intlShape.isRequired
};

export default OrganizationEditor;
