import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class ErrorDialog extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => this.props.onDismissError()}
      />
    ];

    return (
      <div>
        <Dialog
          title="Something went wrong"
          actions={actions}
          modal={false}
          open={true}
          onRequestClose={this.props.onDismissError}
        >
          {this.props.errorMessage}
        </Dialog>
      </div>
    );
  }
}
