import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import Avatar from "material-ui/Avatar";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";
import "./LoginAvatar.css";
import authService from "./utils/AuthService";

export class LoginAvatar extends React.Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = authService;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
    window.setInterval(() => this.setState({ time: new Date() }), 5000);
  }

  render() {
    const { isAuthenticated } = authService;
    let buttonStyle = { color: "black" };
    const profile = this.state.profile;
    let intl = this.props.intl; // injected

    if (isAuthenticated() && this.state.profile !== {}) {
      return (
        <div className="avatar">
          <IconMenu
            iconButtonElement={
              <IconButton>
                <Avatar
                  size={35}
                  src={
                    profile.user_metadata && profile.user_metadata.customPic
                      ? profile.user_metadata.customPic
                      : profile.picture
                  }
                  title={authService.getExpiresInPretty()}
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
        <div className="loginButton">
          <RaisedButton
            onClick={() => authService.login(window.location.pathname)}
            backgroundColor="#444"
            labelColor="white"
            className="customButton"
            onTouchTap={this.signIn}
            label={intl.formatMessage({ id: "login" })}
          />
        </div>
      );
    }
  }
}

export default injectIntl(LoginAvatar);
