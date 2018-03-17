import React from "react";
import { Container, Row, Col } from "reactstrap";
import AccordionTab from "./components/AccordionTab/AccordionTab";
import "./About.css";
import "./StaticPages.css";
import { FormattedMessage } from "react-intl";

class Teaching extends React.Component {

  componentWillMount(){
    this.props.handleInternal();
  }

  render() {
    return (
      <Container fluid={true} className="about static">
        <Row>
          <Col md={{ size: 6 }} className="ml-auto mr-auto">
            <h1>
              <FormattedMessage id="teaching" />
            </h1>
            <h2>
              <FormattedMessage id="teaching_subtitle" />
            </h2>
            <p>
              <FormattedMessage id="teaching_intro_1" />
            </p>
            <p className="pb-1">
              <FormattedMessage id="teaching_intro_2" />
            </p>
            <h2>
              <FormattedMessage id="resources" />
            </h2>
            <p className="pb-1">
              <FormattedMessage id="resources_intro" />
            </p>
            <div className="accordion">
              <AccordionTab titleId="course_assignments">
                <div className="content">
                  <a
                    className="d-block"
                    href="http://participedia.net/content/participedia-sample-assignment-1-write-entry-case-method-or-organization"
                  >
                    <FormattedMessage id="sample_assignment_1" />
                  </a>
                  <a
                    className="d-block"
                    href="http://participedia.net/content/sample-grading-rubric"
                  >
                    <FormattedMessage id="grading_rubric" />
                  </a>
                </div>
              </AccordionTab>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Teaching;
