import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Question from "material-ui/svg-icons/communication/live-help";
import { FormattedMessage, injectIntl } from "react-intl";

class InfoBox extends React.Component {
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
    const actions = [
      <FlatButton
        label={this.props.intl.formatMessage({ id:"ok"})}
        primary={true}
        disableTouchRipple={true}
        disableFocusRipple={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div className="infobox">
        <div className="infobox-trigger" onClick={this.handleOpen}><Question /></div>
        <Dialog
          title={this.props.intl.formatMessage({ id:this.props.info + "_box_title"})}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <FormattedMessage id={this.props.info + "_box_text"} />
        </Dialog>
      </div>
    );
  }
}

export default injectIntl(InfoBox);
