import history from "./history";
import store from "store";
import api from "./api";

// AUTH_V9
import auth0 from "auth0-js";
import ppLogo from "../img/pp-logo.png";
const SCOPE = "openid profile email picture user_metadata";

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
    return store.get("access_token");
  }

  getUser(cb) {
    let user = store.get("user");
    if (user) {
      if (typeof user === typeof "") {
        user = JSON.parse(user);
      }
      cb(null, user);
    } else {
      this.getProfile(profile => {
        api.fetchUser().then(user => {
          if (user && user.name) {
            profile.name = user.name;
          }
          store.set("user", user.data);
          store.set("profile", profile);
          cb(user.data);
        });
      });
    }
  }

  getProfile(cb) {
    let profile = store.get("profile");
    if (profile) {
      if (typeof profile === typeof "") {
        profile = JSON.parse(profile);
      }
      cb(null, profile);
    } else {
      let accessToken = this.getAccessToken();
      if (accessToken) {
        this.auth0.client.userInfo(accessToken, (err, profile) => {
          if (err) {
            console.error(err);
            return;
          }
          if (typeof profile === typeof "") {
            profile = JSON.parse(profile);
          }
          if (profile) {
            this.userProfile = profile;
            store.set("profile", profile);
          }
          cb(err, profile);
        });
      } else {
        cb(null, null);
      }
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
        store.set("expires_in", authResult.expiresIn);
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
    });
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

  getExpiresAt() {
    /* Return a Date object */
    let expiresAt = store.get("expires_at");
    if (expiresAt) {
      try {
        expiresAt = JSON.parse(expiresAt);
        return new Date(expiresAt);
      } catch (e) {
        // fall through to return a new date
      }
    }
    return new Date();
  }

  getExpiresIn() {
    /* how many seconds until expiry? */
    return Math.floor(
      (this.getExpiresAt().getTime() - new Date().getTime()) / 1000
    );
  }

  getExpiresInPretty() {
    /* string representing how long until logout */
    let exp = this.getExpiresIn();
    let minute = 60;
    let hour = 60 * 60;
    switch (exp) {
      case exp < 1:
        return `Login has expired`;
      case exp < minute:
        return `Login expires in ${exp} seconds`;
      case exp < hour:
        return `Login expires in ${Math.floor(exp / minute)} minutes`;
      default:
        return `Login will expire in ${Math.floor(exp / hour)}:${Math.floor(
          (exp % hour) / minute
        )}`;
    }
  }

  isAuthenticated() {
    let authenticated = false;
    // we may have a token but it could be expired
    if (this.getExpiresIn() > 0) {
      authenticated = new Date().getTime() < this.getExpiresAt();
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
