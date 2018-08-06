import history from "./history";
import store from "store";
import api from "./api";

// AUTH_V9
import auth0 from "auth0-js";

import ppLogo from "../img/pp-logo.png";

// const AUTH_VERSION = 9;

const SCOPE = "openid profile email picture";

const AUDIENCE = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`;

class AuthService {
  constructor(clientId, domain) {
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      responseType: "token id_token",
      audience: AUDIENCE,
      scope: SCOPE,
      redirectUri: window.location.origin + "/redirect"
    });
    this.getProfile = this.getProfile.bind(this);
    // binds login functions to keep this context
    this.login = this.login.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  setToken(token) {
    store.set("id_token", token);
  }

  setProfile(profile) {
    store.set("profile", JSON.stringify(profile));
  }

  getAccessToken() {
    const accessToken = store.get("access_token");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    return accessToken;
  }

  getUser(cb) {
    if (!store.get("user")) {
      return cb(null, {});
    }
    let user = store.get("user");
    if (user) {
      if (typeof user === typeof "") {
        user = JSON.parse(user);
      }
      cb(null, user);
    } else {
      this.getProfile(profile => {
        api.fetchUser().then(user => {
          profile.name = user.name;
          store.set("user", user.data);
          store.set("profile", profile);
          cb(user.data);
        });
      });
    }
  }

  getProfile(cb) {
    if (!store.get("access_token")) {
      return cb(null, {});
    }
    let profile = store.get("profile");
    if (profile) {
      if (typeof profile === typeof "") {
        profile = JSON.parse(profile);
      }
      cb(null, profile);
    } else {
      let accessToken = this.getAccessToken();
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (err) {
          console.error(err);
        }
        if (typeof profile === typeof "") {
          profile = JSON.parse(profile);
        }
        if (profile) {
          this.userProfile = profile;
        }
        cb(err, profile);
      });
    }
  }

  login(redirectURL) {
    if (!redirectURL) {
      redirectURL = "/";
    }
    store.set("redirect_url", redirectURL);
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        store.set("access_token", authResult.accessToken);
        store.set("id_token", authResult.idToken);
        let expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
        );
        store.set("expires_at", expiresAt);
        this.getUser(() => history.replace(store.get("redirect_url") || "/"));
      } else if (err) {
        console.error("handleAuthentication error: %o", err);
        store.clearAll();
        history.replace("/");
        return false;
      } else {
        return false;
      }
      // refresh UI to show logged-in state
    });
    // this.auth0.parseHash(window.location.hash, (err, authResult) => {
    //   if (authResult && authResult.accessToken && authResult.idToken) {
    //     // Set the time that the access token will expire at
    //     let expiresAt = JSON.stringify(
    //       authResult.expiresIn * 1000 + new Date().getTime()
    //     );
    //     store.set("access_token", authResult.accessToken);
    //     store.set("id_token", authResult.idToken);
    //     store.set("expires_at", expiresAt);
    //     if (authResult.redirectURL) {
    //       history.replace(authResult.redirectURL);
    //     } else {
    //       history.replace("/");
    //     }
    //   } else if (err) {
    //     console.error("parseHash() error: %o", err);
    //     history.replace("/");
    //   } else {
    //     console.error("No authResult AND no error?");
    //   }
    // });
  }

  getToken() {
    return store.get("id_token");
  }

  logout() {
    // Clear access token and ID token from local storage
    store.clearAll();
    // navigate to the home route
    history.replace("/");
  }

  isAdmin(widget) {
    const user = store.get("user");
    if (!user) {
      this.getUser(the_user => widget.setState({ the_user }));
      return false;
    }
    return user.isadmin;
  }

  isAuthenticated() {
    let authenticated = false;
    // we may have a token but it could be expired
    let expiresAt = store.get("expires_at");
    if (expiresAt) {
      try {
        expiresAt = JSON.parse(expiresAt);
        authenticated = new Date().getTime() < expiresAt;
      } catch (e) {
        // ignore it, authenticated is false by default.
      }
    }
    return authenticated;
  }
}

const authService = new AuthService(
  process.env.REACT_APP_AUTH0_CLIENT_ID,
  process.env.REACT_APP_AUTH0_DOMAIN
);

authService.isAdmin = authService.isAdmin.bind(authService);

export default authService;
