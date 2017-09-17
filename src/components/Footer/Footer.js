import React from "react"; // eslint-disable-line no-unused-vars
import { FormattedMessage } from "react-intl";
import { Container, Row, Col } from "reactstrap";
import "./Footer.css";
import ccIcon from "../../img/cc-icon.png";
import fbIcon from "../../img/pp-social-fb.png";
import twitterIcon from "../../img/pp-social-tw.png";
import linkedInIcon from "../../img/pp-social-linkedin.png";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";

export class Footer extends React.Component {
  render() {
    return (
      <div className="footer-component">
        <Container className="mobile-footer pb-4 d-md-none d-lg-none d-xl-none">
          <Row className="pt-4">
            <Col xs={{ size: 5, offset: 1 }}>
              <Link to="/about">
                <FormattedMessage id="about" />
              </Link>
              <Link to="/research">
                <FormattedMessage id="research" />
              </Link>
              <Link to="/teaching">
                <FormattedMessage id="teaching" />
              </Link>
            </Col>
            <Col xs={{ size: 6 }}>
              <Link to="/news">
                <FormattedMessage id="news" />
              </Link>
              <Link to="/help">
                <FormattedMessage id="help" />
              </Link>
              Contact
            </Col>
          </Row>
          <Row className="pt-4">
            <Col xs={{ size: 5, offset: 1 }}>
              <Link to="/cases">
                <FormattedMessage id="cases" />
              </Link>
              <Link to="/methods">
                <FormattedMessage id="methods" />
              </Link>
              <Link to="/organizations">
                <FormattedMessage id="organizations" />
              </Link>
            </Col>
            <Col xs={{ size: 6 }}>
              <a
                className="social-icons"
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.facebook.com/Participedia/"
              >
                <img src={fbIcon} alt="" />
              </a>
              <a
                className="social-icons"
                rel="noopener noreferrer"
                target="_blank"
                href="https://twitter.com/participedia"
              >
                <img src={twitterIcon} alt="" />
              </a>
              <a
                className="social-icons"
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.linkedin.com/company/participedia"
              >
                <img src={linkedInIcon} alt="" />
              </a>
              <div className="pt-4 copyright-area">
                <img src={ccIcon} alt="" />
                <span>Participedia 2017</span>
              </div>
            </Col>
          </Row>
        </Container>
        <Container
          className="expanded-footer d-lg-block d-md-block d-sm-none d-none"
          fluid={true}
        >
          <Row>
            <Col lg={{ size: 6 }}>
              <div className="column list">
                <Link to="/about">
                  <FormattedMessage id="about" />
                </Link>
                <Link to="/research">
                  <FormattedMessage id="research" />
                </Link>
                <Link to="/teaching">
                  <FormattedMessage id="teaching" />
                </Link>
                <Link to="/experiments">
                  <FormattedMessage id="experiments" />
                </Link>
              </div>
              <div className="column list">
                <Link to="/cases">
                  <FormattedMessage id="cases" />
                </Link>
                <Link to="/methods">
                  <FormattedMessage id="methods" />
                </Link>
                <Link to="/organizations">
                  <FormattedMessage id="organizations" />
                </Link>
              </div>
              <div className="column list">
                <Link to="/news">
                  <FormattedMessage id="news" />
                </Link>
                <Link to="/help">
                  <FormattedMessage id="help" />
                </Link>
                Contact
              </div>
            </Col>
            <Col lg={{ size: 6 }}>
              <div className="column xl">
                <h4>Participedia</h4>
                <p>
                  <FormattedMessage id="about_intro" />
                </p>
              </div>
              <div className="column right">
                <a
                  className="social-icons"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.facebook.com/Participedia/"
                >
                  <img src={fbIcon} alt="" />
                </a>
                <a
                  className="social-icons"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://twitter.com/participedia"
                >
                  <img src={twitterIcon} alt="" />
                </a>
                <a
                  className="social-icons"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.linkedin.com/company/participedia"
                >
                  <img src={linkedInIcon} alt="" />
                </a>
                <div className="copyright-area">
                  <img src={ccIcon} alt="" />
                  <span>Participedia 2017</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default injectIntl(Footer);
