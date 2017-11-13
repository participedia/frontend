import React from "react";
import { string } from "prop-types";
import { FormattedMessage } from "react-intl";
import "./AccordionTab.css";

class AccordionTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div
        className={this.state.open ? "tab-open" : "tab"}
        onClick={e => {
          e.stopPropagation();
          this.handleClick();
        }}
      >
      { this.props.sub ? 
        <p className="title sub">
          <FormattedMessage id={this.props.titleId} />
        </p> 
        : 
        <h3 className="title">
          <FormattedMessage id={this.props.titleId} />
        </h3>
      }
        {this.props.children}
      </div>
    );
  }
}

AccordionTab.propTypes = {
  titleId: string.isRequired
};

export default AccordionTab;
