import React from "react";
import Bookmark from "material-ui/svg-icons/action/bookmark";
import BookmarkBorder from "material-ui/svg-icons/action/bookmark-border";
import IconButton from "material-ui/IconButton";
import api from "../utils/api";
import authService from "../utils/AuthService";

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

class BookmarkIcon extends React.Component {
  render() {
    if (this.props.bookmarked) {
      return <Bookmark style={styles.mediumIcon} />;
    } else {
      return <BookmarkBorder style={styles.mediumIcon} />;
    }
  }
}

export default class BookmarkToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bookmarked: props.bookmarked };
  }
  effectSwitch() {
    this.setState({ bookmarked: !this.state.bookmarked });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      bookmarked: nextProps.bookmarked
    });
  }

  toggleBookmark(thingType, thingid) {
    if (!authService.isAuthenticated()) {
      authService.login(window.location.pathname);
    } else {
      let effectSwitch = this.effectSwitch.bind(this);
      if (this.state.bookmarked) {
        // We are unbookmarking
        api
          .removeBookmark(this.props.thingType, this.props.thingid)
          .then(() => effectSwitch())
          .catch(() => {
            console.error(
              "Error adding a bookmark",
              this.props.thingType,
              this.props.thingid
            );
          });
      } else {
        // We are bookmarking
        api
          .addBookmark(this.props.thingType, this.props.thingid)
          .then(() => effectSwitch())
          .catch(() => {
            console.error(
              "Error removing a bookmark",
              this.props.thingType,
              this.props.thingid
            );
          });
      }
    }
  }
  render() {
    let toggle = this.toggleBookmark.bind(this);
    let bookmarked = this.state.bookmarked;
    return (
      <IconButton style={styles.medium} onClick={toggle}>
        <BookmarkIcon bookmarked={bookmarked} />
      </IconButton>
    );
  }
}
