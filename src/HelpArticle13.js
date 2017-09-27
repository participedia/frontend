import React from "react"; // eslint-disable-line no-unused-vars
import "./HelpArticle.css";

class HelpArticle13 extends React.Component {
  render() {
    return (
      <div className="faq-answer pt-4">
        <h5 className="data-title">{this.props.intl.formatMessage({ id: "help_q" + this.props.item })}</h5>
        <p>{this.props.intl.formatMessage({ id: "help_q" + this.props.item + "_p1" })}</p> 
        <p>{this.props.intl.formatMessage({ id: "help_q" + this.props.item + "_p2" })}</p> 
        <p>{this.props.intl.formatMessage({ id: "help_q" + this.props.item + "_p3" })}</p> 
        <p>AND: {this.props.intl.formatMessage({ id: "help_q" + this.props.item + "_p4" })}</p> 
        <p>OR: {this.props.intl.formatMessage({ id: "help_q" + this.props.item + "_p5" })}</p> 
        <p>NOT: {this.props.intl.formatMessage({ id: "help_q" + this.props.item + "_p6" })}</p> 
        <p>QUOTES: {this.props.intl.formatMessage({ id: "help_q" + this.props.item + "_p7" })}</p> 
        <p>PARENTHESES: {this.props.intl.formatMessage({ id: "help_q" + this.props.item + "_p8" })}</p> 
      </div>
    );
  }
}

export default HelpArticle13;
