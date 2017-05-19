import React from "react"; // eslint-disable-line no-unused-vars
import { Container, Row, Col } from "reactstrap";
import "./Footer.css";
import ccIcon from "../../img/cc-icon.png";
import fbIcon from "../../img/pp-social-fb.png";
import twitterIcon from "../../img/pp-social-tw.png";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import { ShareButtons } from "react-share";

export class Footer extends React.Component {
  render() {
    const { FacebookShareButton, TwitterShareButton } = ShareButtons;
    let currentUrl = process.env.REACT_APP_ROOT_URL;
    let title = "Participedia";

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
                <Link to="/users">
                  {this.props.intl.formatMessage({ id: "users" })}
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
                <FacebookShareButton
                  className="social-icons"
                  url={currentUrl}
                  title={title}
                  welcome_message
                  description={this.props.intl.formatMessage({
                    id: "welcome_message"
                  })}
                >
                  <img src={fbIcon} alt="" />
                </FacebookShareButton>
                <TwitterShareButton
                  className="social-icons"
                  url={currentUrl}
                  title={this.props.intl.formatMessage({
                    id: "welcome_message"
                  })}
                >
                  <img src={twitterIcon} alt="" />
                </TwitterShareButton>
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
