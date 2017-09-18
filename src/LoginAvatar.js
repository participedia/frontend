import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";
import Avatar from "material-ui/Avatar";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";
import "./LoginAvatar.css";
import authService from "./utils/AuthService";

export class LoginAvatar extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    let buttonStyle = { color: "black" };
    const profile = this.state.profile;
    let intl = this.props.intl; // injected

    if (isAuthenticated() && this.state.profile !== {}) {
      return (
        <div className="avatar d-none d-sm-block d-md-block d-lg-block d-xl-block">
          <IconMenu
            iconButtonElement={
              <IconButton>
                <Avatar
                  size={30}
                  src={
                    profile.user_metadata && profile.user_metadata.customPic
                      ? profile.user_metadata.customPic
                      : profile.picture
                  }
                />
              </IconButton>
            }
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            targetOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <MenuItem
              style={buttonStyle}
              containerElement={<Link to={"/profile"} />}
              onClick={this.handleClose}
            >
              Profile
            </MenuItem>
            <MenuItem
              style={buttonStyle}
              primaryText={intl.formatMessage({ id: "sign_out" })}
              onClick={() => authService.logout()}
            />
          </IconMenu>
        </div>
      );
    } else {
      return (
        <div className="loginButton d-none d-sm-block d-md-block d-lg-block d-xl-block">
          <FlatButton
            onClick={() => authService.login()}
            onTouchTap={this.signIn}
            label={intl.formatMessage({ id: "login" })}
          />
        </div>
      );
    }
  }
}

export default injectIntl(LoginAvatar);
