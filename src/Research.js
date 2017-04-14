import React from "react"; // eslint-disable-line no-unused-vars
import { Container, Row, Col } from "reactstrap";
import AccordionTab from "./components/AccordionTab/AccordionTab";
import "./About.css";
import { injectIntl, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

class Research extends React.Component {
  render() {
    const methodologyLink = (
      <Link to="/somepage">
        {this.props.intl.formatMessage({ id: "participedia_project" })}
      </Link>
    );
    const participantSurvey = (
      <Link to="/somepage">
        {this.props.intl.formatMessage({ id: "participant_survey" })}
      </Link>
    );
    const observerSurvey = (
      <Link to="/somepage">
        {this.props.intl.formatMessage({ id: "observer_survey" })}
      </Link>
    );

    return (
      <Container fluid={false} className="about more-orange">
        <Row>
          <Col lg={{ size: 10, offset: 1 }}>
            <h1>{this.props.intl.formatMessage({ id: "research" })}</h1>
            <h2>{this.props.intl.formatMessage({ id: "research_intro" })}</h2>
            <div className="accordion">
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "methodology" })}
              >
                <div className="content">
                  <p className="text">
                    {this.props.intl.formatMessage({
                      id: "methodology_intro_1"
                    })}
                    <br />
                    <br />
                    <FormattedMessage
                      id="methodology_intro_2"
                      values={{ methodologyLink }}
                    />
                  </p>
                </div>
              </AccordionTab>
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "data_repository" })}
              >
                <div className="content">
                  <p className="text">
                    {this.props.intl.formatMessage({
                      id: "data_repository_intro"
                    })}
                  </p>
                  <div className="sub-content">
                    <p className="name">
                      {this.props.intl.formatMessage({
                        id: "data_repository_1_name"
                      })}
                    </p>
                    <p className="department">
                      {this.props.intl.formatMessage({
                        id: "data_repository_1_dept"
                      })}
                    </p>
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "surveys" })}
              >
                <div className="content">
                  <p className="text">
                    {this.props.intl.formatMessage({ id: "surveys_text_1" })}
                  </p>
                  <p className="text">
                    <FormattedMessage
                      id="surveys_text_2"
                      values={{ participantSurvey }}
                    />
                  </p>
                  <p className="text">
                    <FormattedMessage
                      id="surveys_text_3"
                      values={{ observerSurvey }}
                    />
                  </p>
                </div>
              </AccordionTab>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default injectIntl(Research);
