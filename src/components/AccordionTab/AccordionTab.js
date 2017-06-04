import React from "react";
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
        onClick={(e) => {
          e.stopPropagation();
          this.handleClick();
        }}
      >
        <p className="title">
          {this.props.title}
        </p>
        {this.props.children}
      </div>
    );
  }
}

export default AccordionTab;
