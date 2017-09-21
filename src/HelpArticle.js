import React from "react"; // eslint-disable-line no-unused-vars
import "./HelpArticle.css";

class HelpArticle extends React.Component {
  render() {
    return (
      <div className="faq-answer pt-4">
        <h5 className="data-title">{this.props.intl.formatMessage({ id: "help_q" + this.props.item })}</h5>
        <p>{this.props.intl.formatMessage({ id: "help_q" + this.props.item + "_p1" })}</p> 
      </div>
    );
  }
}

export default HelpArticle;
