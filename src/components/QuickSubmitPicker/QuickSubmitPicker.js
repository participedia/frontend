import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { injectIntl } from "react-intl";
import "./QuickSubmitPicker.css";

const QuickSubmitPicker = props => (
  <div>
    <Container className="select-type">
      <h2>Select type</h2>
      <Row>
        <Col md="4" className="ml-auto mr-auto">
          <Link to={"/new/case"}>
            <p>{props.intl.formatMessage({ id: "case" })}</p>
          </Link>
          <Link to={"/new/method"}>
            <p>{props.intl.formatMessage({ id: "method" })}</p>
          </Link>
          <Link to={"/new/organization"}>
            <p>{props.intl.formatMessage({ id: "organization" })}</p>
          </Link>
        </Col>
      </Row>
    </Container>
  </div>
);

export default injectIntl(QuickSubmitPicker);
