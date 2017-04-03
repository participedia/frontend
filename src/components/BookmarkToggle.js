import React from "react";
import Bookmark from "material-ui/svg-icons/action/bookmark";
import BookmarkBorder from "material-ui/svg-icons/action/bookmark-border";
import IconButton from "material-ui/IconButton";
import api from "../utils/api";

const styles = {
  smallIcon: {
    width: 36,
    height: 36
  },
  mediumIcon: {
    width: 48,
    height: 48
  },
  largeIcon: {
    width: 60,
    height: 60
  },
  small: {
    width: 72,
    height: 72,
    padding: 16
  },
  medium: {
    width: 48,
    height: 48,
    padding: 0
  },
  large: {
    width: 60,
    height: 60,
    padding: 0
  }
};

export default class BookmarkToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { enabled: props.enabled };
  }
  effectSwitch() {
    this.setState({ enabled: !this.state.enabled });
  }
  toggleBookmark(thingType, thingID) {
    console.log("this.state.enabled", this.state.enabled);
    let effectSwitch = this.effectSwitch.bind(this);
    if (this.state.enabled) {
      // We are unbookmarking
      api
        .removeBookmark(this.props.thingType, this.props.thingID)
        .then(() => effectSwitch())
        .catch(() => {
          console.error(
            "Error adding a bookmark",
            this.props.thingType,
            this.props.thingID
          );
        });
    } else {
      // We are bookmarking
      api
        .addBookmark(this.props.thingType, this.props.thingID)
        .then(() => effectSwitch())
        .catch(() => {
          console.error(
            "Error removing a bookmark",
            this.props.thingType,
            this.props.thingID
          );
        });
    }
  }
  render() {
    let toggle = this.toggleBookmark.bind(this);
    let icon = <BookmarkBorder />;
    if (this.state.enabled) {
      icon = <Bookmark />;
    }
    return (
      <IconButton
        iconStyle={styles.mediumIcon}
        style={styles.medium}
        onClick={toggle}
      >
        {icon}
      </IconButton>
    );
  }
}
