import React from "react";
import "./HelpBar.css";
import HelpArticle from "../../HelpArticle";
import HelpArticle13 from "../../HelpArticle13";
import NavigateBack from "material-ui/svg-icons/navigation/arrow-back";
import MailIcon from "material-ui/svg-icons/communication/message";
import CloseIcon from "material-ui/svg-icons/navigation/close";
import { white } from "material-ui/styles/colors";
import { injectIntl } from "react-intl";
import { withRouter } from 'react-router'


class HelpBar extends React.Component {
  constructor(props) {
    super(props);
    const helpItems = [1, 2, 3, 4, 5, 6, 7, 9, 11, 13, 15];
    this.state = {
      helpItems: helpItems,
      all: true,
      helpItem: 1
    };
    this.pickHelpItem = this.pickHelpItem.bind(this);
    this.resetHelp = this.resetHelp.bind(this);
    this.closeHelp = this.closeHelp.bind(this);
    this.showTour = this.showTour.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  pickHelpItem(item) {
    this.setState({
      helpItem: item,
      all: false
    });
  }

  resetHelp() {
    this.setState({ all: true });
  }

  closeHelp() {
    this.props.onHelpClose();
  }

  showTour() {
    this.props.showTour();
  }

  goHome() {
    this.props.goHome();
  }

  render() {
    var showTour;
    var pathname = this.props.location.pathname
    if (pathname === "/" || pathname === "/organizations" || pathname === "/methods" || pathname === "/cases") {
      showTour = (<div onClick={() => { this.showTour() }} className="card tour">
                  <h4 className="data-title">{this.props.intl.formatMessage({ id: "show_tour" })}</h4>
                </div>);
    } else if (pathname.substr(pathname.length - 4) == "edit" || pathname.substr(1,4) == "new/" ) {
      showTour = undefined;
    } else {
      showTour = (<div onClick={() => { this.goHome() }} className="card tour">
                  <h4 className="data-title">{this.props.intl.formatMessage({ id: "show_tour" })}</h4>
                </div>);
    }

    return (
      <div className="help-bar">
        <div className="top-area">
          <div className="title-section">
            {!this.state.all ? (
              <NavigateBack
                className="go-back"
                color={white}
                onClick={() => {
                  this.resetHelp();
                }}
              />
            ) : (
              undefined
            )}
            <h4 className="help-title">
              {this.props.intl.formatMessage({ id: "participedia_help" })}
            </h4>
            <CloseIcon
              className="close-help"
              color={white}
              onClick={() => {
                this.closeHelp();
              }}
            />{" "}
            :
          </div>
        </div>
        <div className="data-section">
          {this.state.all ? (
            <div>
              <div className="card contact">
                <h4>{this.props.intl.formatMessage({ id: "contact_us" })}</h4>
                <a href="mailto: info@participedia.net">
                  <MailIcon color={"#ec1414"} />
                  {this.props.intl.formatMessage({ id: "email_support" })}
                </a>
              </div>
              <div className="some-container">
              {showTour}
              </div>
              <div className="card pt-3">
                <h4 className="data-title">
                  {this.props.intl.formatMessage({ id: "faq" })}
                </h4>
                <ul className="data-list">
                  {this.state.helpItems.map((item, i) => (
                    <li key={i}>
                      <a
                        onClick={() => {
                          this.pickHelpItem(item);
                        }}
                      >
                        {this.props.intl.formatMessage({ id: "help_q" + item })}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            [
              this.state.helpItem === 13 ? (
                <HelpArticle13
                  key={this.state.helpItem}
                  intl={this.props.intl}
                  item={this.state.helpItem}
                />
              ) : (
                <HelpArticle
                  key={this.state.helpItem}
                  intl={this.props.intl}
                  item={this.state.helpItem}
                />
              )
            ]
          )}
        </div>
      </div>
    );
  }
}

export default injectIntl(withRouter(HelpBar));
