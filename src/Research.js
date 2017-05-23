import React from "react"; // eslint-disable-line no-unused-vars
import { Container, Row, Col } from "reactstrap";
import AccordionTab from "./components/AccordionTab/AccordionTab";
import "./About.css";
import "./StaticPages.css";
import { injectIntl, FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

class Research extends React.Component {
  render() {
    const methodologyLink = (
      <Link to="/somepage">
        {this.props.intl.formatMessage({ id: "participedia_project" })}
      </Link>
    );
    // const participantSurvey = (
    //   <Link to="/somepage">
    //     {this.props.intl.formatMessage({ id: "participant_survey" })}
    //   </Link>
    // );
    // const observerSurvey = (
    //   <Link to="/somepage">
    //     {this.props.intl.formatMessage({ id: "observer_survey" })}
    //   </Link>
    // );

    return (
      <Container fluid={false} className="about static">
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
                  <p className="text pb-1">
                    {this.props.intl.formatMessage({
                      id: "data_repository_intro"
                    })}
                  </p>
                  <a href="http://participedia.net/en/content/brazilian-participatory-budgeting-census">
                    {this.props.intl.formatMessage({
                      id: "data_repository_link"
                    })}
                  </a>
                </div>
              </AccordionTab>
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "surveys" })}
              >
                <div className="content">
                  <p className="pb-1 text">
                    {this.props.intl.formatMessage({ id: "surveys_text_1" })}
                  </p>
                  <p className="pb-1 text">
                    {this.props.intl.formatMessage({ id: "surveys_text_2" })}
                  </p>
                  <p className="pb-1 text">
                    {this.props.intl.formatMessage({ id: "surveys_text_3" })}
                  </p>
                  <p className="pb-1 text">
                    {this.props.intl.formatMessage({ id: "surveys_text_4" })}
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
