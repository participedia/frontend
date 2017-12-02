import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router";
import "./QuickSubmitPicker.css";

class QuickSubmitPicker extends React.Component {
  componentWillMount() {
    if (this.props.handleInternal) {
      this.props.handleInternal();
    }
  }
  render() {
    return (
      <div>
        <Container className="select-type">
          <h2 className="medium">Select type</h2>
          <Row>
            <Col md="4" className="ml-auto mr-auto">
              <Link to={"/new/case"}>
                <p>{this.props.intl.formatMessage({ id: "case" })}</p>
              </Link>
              <Link to={"/new/method"}>
                <p>{this.props.intl.formatMessage({ id: "method" })}</p>
              </Link>
              <Link to={"/new/organization"}>
                <p>{this.props.intl.formatMessage({ id: "organization" })}</p>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default injectIntl(withRouter(QuickSubmitPicker));
