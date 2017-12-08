import React from 'react';
import HumanCitation from "./HumanCitation";
import MachineCitation from "./MachineCitation";
import { FlatButton, Dialog, RaisedButton } from "material-ui";

export default class CiteThis extends React.Component {

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    let { intl } = this.props;
    var label = intl.formatMessage({ id: "cite_" + this.props.thing.type });
    const actions = [
      <FlatButton
        label={intl.formatMessage({ id: "close" })}
        primary={true}
        onClick={this.handleClose}
      />
    ];
    return (
      <div>
        <RaisedButton
          onClick={this.handleOpen}
          className="customButton"
          label={label}
          style={{marginTop: '15px'}}
        />
        <Dialog
          title={label}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <HumanCitation
            intl={intl}
            thing={this.props.thing}
          />
          <hr />
          <MachineCitation
            intl={intl}
            thing={this.props.thing}
          />
        </Dialog>
      </div>
    );
  }
}

//ReactDOM.render(<CiteThis />, appElement);
