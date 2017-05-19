import React from "react";
import { Container, Row, Col } from "reactstrap";
import AccordionTab from "./components/AccordionTab/AccordionTab";
import "./About.css";
import "./StaticPages.css";
import { injectIntl } from "react-intl";

class Teaching extends React.Component {
  render() {
    return (
      <Container fluid={false} className="about static">
        <Row>
          <Col lg={{ size: 8, offset: 2 }}>
            <h1>{this.props.intl.formatMessage({ id: "teaching" })}</h1>
            <h2>{this.props.intl.formatMessage({ id: "teaching_subtitle" })}</h2>
            <p>{this.props.intl.formatMessage({ id: "teaching_intro_1" })}</p>
            <p className="pb-1">{this.props.intl.formatMessage({ id: "teaching_intro_2" })}</p>
            <h2>{this.props.intl.formatMessage({ id: "resources" })}</h2>
            <p className="pb-1">{this.props.intl.formatMessage({ id: "resources_intro" })}</p>
            <div className="accordion">
              <AccordionTab
                title={this.props.intl.formatMessage({
                  id: "course_assignments"
                })}
              >
                <div className="content">
                  <a className="d-block" href="http://participedia.net/content/participedia-sample-assignment-1-write-entry-case-method-or-organization">{this.props.intl.formatMessage({ id: "sample_assignment_1" })}</a>
                  <a className="d-block" href="http://participedia.net/content/sample-grading-rubric">{this.props.intl.formatMessage({ id: "grading_rubric" })}</a>
                </div>
              </AccordionTab>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default injectIntl(Teaching);
