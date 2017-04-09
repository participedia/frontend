import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { injectIntl, intlShape } from "react-intl";
import { Form, Text } from "react-form";
import Geosuggest from "react-geosuggest";
import "./CaseEditor.css";
import { Container, Col } from "reactstrap";
import BodyEditor from "../BodyEditor";
import ImageListEditor from "../ImageListEditor";
import "../GeoSuggest/GeoSuggest.css";
import {
  RelatedCases,
  RelatedMethods,
  RelatedOrganizations
} from "../RelatedEditors";

class _CaseEditor extends Component {
  render() {
    const thing = this.props.case;
    const { onSubmit, cases, methods, organizations, intl } = this.props;

    if (!thing) {
      return <div />;
    }

    return (
      <Form onSubmit={onSubmit} defaultValues={thing}>
        {({ submitForm }) => {
          return (
            <form onSubmit={submitForm}>
              <div className="main-contents">
                <Container className="detailed-case-component" fluid={true}>
                  <Col
                    md="3"
                    className="hidden-sm-down sidepanel hidden-sm-down"
                  >
                    <div className="case-location">
                      <p className="sub-heading">
                        {this.props.intl.formatMessage({
                          id: "country_picker"
                        })}
                      </p>
                      <Geosuggest />
                    </div>
                    <p className="sub-heading">
                      Keywords
                    </p>
                    keyword picker
                    <p className="sub-heading">
                      Related Content
                    </p>
                    <div className="related-content">
                      <div className="pb-1">
                        <h5>
                          {this.props.intl.formatMessage({ id: "cases" })}
                        </h5>
                        <RelatedCases cases={cases} intl={intl} />
                      </div>
                      <div className="pb-1">
                        <h5>
                          {this.props.intl.formatMessage({ id: "methods" })}
                        </h5>
                        <RelatedMethods methods={methods} intl={intl} />
                      </div>
                      <div className="pb-1">
                        <h5>
                          {this.props.intl.formatMessage({
                            id: "organizations"
                          })}
                        </h5>
                        <RelatedOrganizations
                          organizations={organizations}
                          intl={intl}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md="8" xs="12" className="main-area">
                    <div className="case-box">
                      <h2 className="category">
                        Case
                      </h2>
                      <h2 className="case-title">
                        {thing.title}
                      </h2>
                      <ImageListEditor thing={thing} />
                      <div className="title-edit">
                        <label htmlFor="title">Title</label>
                      </div>
                      <Text field="title" placeholder="case title" />
                      <div>
                        <label htmlFor="body_en">Body</label>
                      </div>
                      <BodyEditor value={thing.body} />
                    </div>
                    <button type="submit">Submit</button>
                  </Col>
                </Container>
              </div>
            </form>
          );
        }}
      </Form>
    );
  }
}

_CaseEditor.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(reduxForm({ form: "case" })(_CaseEditor));
