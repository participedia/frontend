import React from "react"; // eslint-disable-line no-unused-vars
import "./Footer.css";
import ppLogo from "../../img/pp-logo.png";
import ccIcon from "../../img/cc-icon.png";
import fbIcon from "../../img/pp-social-fb.png";
import twitterIcon from "../../img/pp-social-tw.png";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import { ShareButtons } from "react-share";

export class Footer extends React.Component {
  render() {
    const { FacebookShareButton, TwitterShareButton } = ShareButtons;
    let currentUrl = "https://participedia.xyz";
    let title = "Participedia";

    return (
      <div className="footer-component">
        <div className="expanded-footer">
          <div className="column">
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
          <div className="column">
            <a href="#">{this.props.intl.formatMessage({ id: "cases" })}</a>
            <a href="#">{this.props.intl.formatMessage({ id: "methods" })}</a>
            <a href="#">
              {this.props.intl.formatMessage({ id: "organizations" })}
            </a>
            <a href="#">{this.props.intl.formatMessage({ id: "users" })}</a>
          </div>
          <div className="column">
            <a href="#">{this.props.intl.formatMessage({ id: "news" })}</a>
            <Link to={"?help"}>
              {this.props.intl.formatMessage({ id: "help" })}
            </Link>
            <a href="#">Contact</a>
          </div>
          <div className="column">
            <FacebookShareButton className="social-icons"
              url={currentUrl}
              title={title}welcome_message
              description={this.props.intl.formatMessage({ id: "welcome_message" })}
            >
              <img src={fbIcon} alt="" />
            </FacebookShareButton>
            <TwitterShareButton className="social-icons" url={currentUrl} title={title}>
              <img src={twitterIcon} alt="" />
            </TwitterShareButton>
          </div>
        </div>
        <div className="copyright-area">
          <a href="/" className="logo"><img src={ppLogo} alt="" /></a>
          <p className="copyright-text">
            <img src={ccIcon} alt="" />Participedia 2016
          </p>
        </div>
      </div>
    );
  }
}

export default injectIntl(Footer);
