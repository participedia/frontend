import React from "react";
import "./AccordionTab.css";

class AccordionTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className={this.state.open ? "tab-open" : "tab"}
        onClick={() => {
          this.setState({ open: !this.state.open });
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
