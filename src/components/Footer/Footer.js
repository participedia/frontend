import React from "react"; // eslint-disable-line no-unused-vars
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
        <Container className="expanded-footer" fluid={true}>
          <Row>
            <Col lg={{ size: 6 }}>
              <div className="column list">
                <Link to="/about">
                  {this.props.intl.formatMessage({ id: "about" })}
                </Link>
                <Link to="/research">
                  {this.props.intl.formatMessage({ id: "research" })}
                </Link>
                <Link to="/teaching">
                  {this.props.intl.formatMessage({ id: "teaching" })}
                </Link>
                <Link to="/experiments">
                  {this.props.intl.formatMessage({ id: "experiments" })}
                </Link>
              </div>
              <div className="column list">
                <Link to="/cases">
                  {this.props.intl.formatMessage({ id: "cases" })}
                </Link>
                <Link to="/methods">
                  {this.props.intl.formatMessage({ id: "methods" })}
                </Link>
                <Link to="/organizations">
                  {this.props.intl.formatMessage({ id: "organizations" })}
                </Link>
              </div>
              <div className="column list">
                <Link to="/news">
                  {this.props.intl.formatMessage({ id: "news" })}
                </Link>
                <Link to="/help">
                  {this.props.intl.formatMessage({ id: "help" })}
                </Link>
                Contact
              </div>
            </Col>
            <Col lg={{ size: 6 }}>
              <div className="column xl">
                <h4>Participedia</h4>
                <p>{this.props.intl.formatMessage({ id: "about_intro" })}</p>
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
