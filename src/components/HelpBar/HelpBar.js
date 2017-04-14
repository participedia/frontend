import React from "react";
import { Link } from "react-router";
import "./HelpBar.css";
import { injectIntl } from "react-intl";

class HelpBar extends React.Component {
  constructor(props) {
    super(props);
    const helpItems = [
      this.props.intl.formatMessage({ id: "help_q1" }),
      this.props.intl.formatMessage({ id: "help_q2" }),
      this.props.intl.formatMessage({ id: "help_q3" }),
      this.props.intl.formatMessage({ id: "help_q4" }),
      this.props.intl.formatMessage({ id: "help_q5" }),
      this.props.intl.formatMessage({ id: "help_q6" }),
      this.props.intl.formatMessage({ id: "help_q7" }),
      this.props.intl.formatMessage({ id: "help_q8" }),
      this.props.intl.formatMessage({ id: "help_q9" }),
      this.props.intl.formatMessage({ id: "help_q10" }),
      this.props.intl.formatMessage({ id: "help_q11" }),
      this.props.intl.formatMessage({ id: "help_q12" }),
      this.props.intl.formatMessage({ id: "help_q13" }),
      this.props.intl.formatMessage({ id: "help_q14" })
    ];
    this.state = {
      query: "",
      helpItems: helpItems,
      filteredHelpItems: helpItems
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ query: event.target.value }, () => this.filterHelp());
  }

  filterHelp() {
    let query = this.state.query;
    let allItems = this.state.helpItems;
    let filteredItems = [];
    for (let i = 0; i < allItems.length; i++) {
      let item = allItems[i];
      if (item.toLowerCase().indexOf(query.toLowerCase()) > -1)
        filteredItems.push(item);
    }
    this.setState({ filteredHelpItems: filteredItems });
  }

  render() {
    let onChange = this.onChange;
    return (
      <div className="help-bar">
        <div className="top-area">
          <div className="top-area-inner">
            <div className="title-section">
              <h2 className="help-title">
                {this.props.intl.formatMessage({ id: "participedia_help" })}
              </h2>
              <Link to={this.props.currentPath} className="close-help" />
            </div>
            <div className="search-box-section">
              <input
                className="search-input"
                value={this.state.query || ""}
                type="text"
                placeholder="Search Help"
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="data-section">
          <h3 className="data-title">
            {this.props.intl.formatMessage({ id: "faq" })}
          </h3>
          <ul className="data-list">
            {this.state.filteredHelpItems.map((item, i) => (
              <li key={i}>
                <Link to="/help/1">{item}</Link>
              </li>
            ))}
            {this.state.filteredHelpItems.length === 0
              ? <li>
                  <a>
                    {this.props.intl.formatMessage({ id: "no_results_found" })}
                  </a>
                </li>
              : null}
          </ul>
        </div>
      </div>
    );
  }
}

export default injectIntl(HelpBar);
