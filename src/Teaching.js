import React from "react";
import { Container, Row, Col } from "reactstrap";
import AccordionTab from "./components/AccordionTab/AccordionTab";
import "./About.css";
import { injectIntl } from "react-intl";

class Teaching extends React.Component {
  render() {
    return (
      <Container fluid={false} className="about">
        <Row>
          <Col lg={{ size: 10, offset: 1 }}>
            <h1>{this.props.intl.formatMessage({ id: "teaching" })}</h1>
            <h2>{this.props.intl.formatMessage({ id: "teaching_intro" })}</h2>
            <h2>
              {this.props.intl.formatMessage({ id: "teaching_resources" })}
            </h2>
            <div className="text">
              {this.props.intl.formatMessage({
                id: "teaching_resources_intro"
              })}
            </div>
            <div className="accordion">
              <AccordionTab
                title={this.props.intl.formatMessage({
                  id: "assignments_grading_rubrics"
                })}
              >
                <div className="content">
                  <p className="text">
                    {this.props.intl.formatMessage({
                      id: "assignments_grading_rubrics_intro"
                    })}
                  </p>
                </div>
              </AccordionTab>
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "syllabi" })}
              >
                <div className="content">
                  <p className="text">
                    {this.props.intl.formatMessage({ id: "syllabi_intro" })}
                  </p>
                  <div className="sub-accordion">
                    <AccordionTab
                      title={this.props.intl.formatMessage({
                        id: "syllabi_category1"
                      })}
                    >
                      <div className="sub-content">
                        <p className="name">
                          {this.props.intl.formatMessage({
                            id: "syllabi_category1_name1"
                          })}
                        </p>
                        <p className="department">
                          {this.props.intl.formatMessage({
                            id: "syllabi_category1_desc1"
                          })}
                        </p>
                        <p className="name">
                          {this.props.intl.formatMessage({
                            id: "syllabi_category1_name2"
                          })}
                        </p>
                        <p className="department">
                          {this.props.intl.formatMessage({
                            id: "syllabi_category1_desc2"
                          })}
                        </p>
                        <p className="name">
                          {this.props.intl.formatMessage({
                            id: "syllabi_category1_name3"
                          })}
                        </p>
                        <p className="department">
                          {this.props.intl.formatMessage({
                            id: "syllabi_category1_desc3"
                          })}
                        </p>
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      title={this.props.intl.formatMessage({
                        id: "syllabi_category2"
                      })}
                    >
                      <div className="sub-content">
                        <p className="name">
                          {this.props.intl.formatMessage({
                            id: "syllabi_category2_name1"
                          })}
                        </p>
                        <p className="department">
                          {this.props.intl.formatMessage({
                            id: "syllabi_category2_desc1"
                          })}
                        </p>
                        <p className="name">
                          {this.props.intl.formatMessage({
                            id: "syllabi_category2_name2"
                          })}
                        </p>
                        <p className="department">
                          {this.props.intl.formatMessage({
                            id: "syllabi_category2_desc2"
                          })}
                        </p>
                        <p className="name">
                          {this.props.intl.formatMessage({
                            id: "syllabi_category2_name3"
                          })}
                        </p>
                        <p className="department">
                          {this.props.intl.formatMessage({
                            id: "syllabi_category2_desc3"
                          })}
                        </p>
                      </div>
                    </AccordionTab>
                    <AccordionTab
                      title={this.props.intl.formatMessage({
                        id: "syllabi_category3"
                      })}
                    >
                      <div className="sub-content">
                        <p className="name">
                          {this.props.intl.formatMessage({
                            id: "syllabi_category3_name1"
                          })}
                        </p>
                        <p className="department">
                          {this.props.intl.formatMessage({
                            id: "syllabi_category3_desc1"
                          })}
                        </p>
                        <p className="name">
                          {this.props.intl.formatMessage({
                            id: "syllabi_category3_name2"
                          })}
                        </p>
                        <p className="department">
                          {this.props.intl.formatMessage({
                            id: "syllabi_category3_desc2"
                          })}
                        </p>
                        <p className="name">
                          {this.props.intl.formatMessage({
                            id: "syllabi_category3_name3"
                          })}
                        </p>
                        <p className="department">
                          {this.props.intl.formatMessage({
                            id: "syllabi_category3_desc3"
                          })}
                        </p>
                      </div>
                    </AccordionTab>
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "class_slides" })}
              >
                <div className="content">
                  <p className="text">
                    {this.props.intl.formatMessage({
                      id: "class_slides_intro"
                    })}
                  </p>
                </div>
              </AccordionTab>
              <AccordionTab
                title={this.props.intl.formatMessage({
                  id: "simulations_exercises"
                })}
              >
                <div className="content">
                  <p className="text">
                    {this.props.intl.formatMessage({
                      id: "simulations_exercises_intro"
                    })}
                  </p>
                  <div className="sub-content">
                    <p className="name">
                      {this.props.intl.formatMessage({
                        id: "simulations_category1_name1"
                      })}
                    </p>
                    <p className="department">
                      {this.props.intl.formatMessage({
                        id: "simulations_category1_desc1"
                      })}
                    </p>
                    <p className="name">
                      {this.props.intl.formatMessage({
                        id: "simulations_category1_name2"
                      })}
                    </p>
                    <p className="department">
                      {this.props.intl.formatMessage({
                        id: "simulations_category1_desc2"
                      })}
                    </p>
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab
                title={this.props.intl.formatMessage({ id: "lesson_plans" })}
              >
                <div className="content">
                  <p className="text">
                    {this.props.intl.formatMessage({
                      id: "lesson_plans_intro"
                    })}
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

export default injectIntl(Teaching);
