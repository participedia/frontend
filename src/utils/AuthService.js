import history from "./history";
import store from "store";
import api from "./api";

// AUTH_V8
// import auth0 from "auth0-js";

// AUTH_v7
import Auth0Lock from "auth0-lock";
import ppLogo from "../img/pp-logo.png";

// const AUTH_VERSION = 7; // or 8

const SCOPE =
  "openid email user_metadata app_metadata picture created_at read:users update:users update:users_app_metadata";

// const AUDIENCE = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`;

class AuthService {
  // if (AUTH_VERSION === 8) {
  // auth0 = new auth0.WebAuth({
  //   domain: process.env.REACT_APP_AUTH0_DOMAIN,
  //   clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  //   redirectUri: window.location.origin + "/redirect",
  //   audience: AUDIENCE,
  //   responseType: "token id_token",
  //   scope: SCOPE
  // });

  constructor(clientId, domain) {
    // AUTH_VERSION === 7
    this.lock = new Auth0Lock(
      process.env.REACT_APP_AUTH0_CLIENT_ID,
      process.env.REACT_APP_AUTH0_DOMAIN,
      {
        auth: {
          redirectUrl: window.location.origin + "/redirect",
          responseType: "token",
          params: {
            scope: SCOPE,
            state: JSON.stringify({ pathname: window.location.pathname })
          }
        },
        theme: {
          primaryColor: "#323232",
          logo: ppLogo
        },
        languageDictionary: {
          title: "Participedia"
        }
      }
    );

    this.clientId = clientId;
    this.domain = domain;
    // AUTH_VERSION=7
    this.lock.on("authenticated", authResult => {
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        let expiresAt = JSON.stringify(authResult.idTokenPayload.exp * 1000);
        store.set("expires_at", expiresAt);
        store.set("access_token", authResult.accessToken);
        store.set("id_token", authResult.idToken);
        // store.set("expires_at", expiresAt);
        this.setProfile(profile);
        let state = JSON.parse(authResult.state);
        api.fetchUser().then(user => {
          store.set("user", user.data);
          if (state && state.redirectURL) {
            history.replace(state.redirectURL);
          } else {
            history.replace("/");
          }
        });
      });
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
          store.set("user", user.data);
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
        if (typeof profile === typeof "") {
          profile = JSON.parse(profile);
        }
        if (profile) {
          store.set("profile", profile);
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
    let state = { redirectURL };

    this.lock.show({
      auth: {
        params: {
          scope: SCOPE,
          state: JSON.stringify(state)
        }
      }
    });
  }
  handleAuthentication() {
    this.auth0.parseHash(window.location.hash, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
        );
        store.set("access_token", authResult.accessToken);
        store.set("id_token", authResult.idToken);
        store.set("expires_at", expiresAt);
        if (authResult.redirectURL) {
          history.replace(authResult.redirectURL);
        } else {
          history.replace("/");
        }
      } else if (err) {
        console.error("parseHash() error: %o", err);
        history.replace("/");
      } else {
        console.error("No authResult AND no error?");
      }
    });
  }

  getToken() {
    return store.get("id_token");
  }

  logout() {
    // Clear access token and ID token from local storage
    store.remove("access_token");
    store.remove("id_token");
    store.remove("expires_at");
    store.set("profile", "{}");
    store.set("user", "{}");
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
    if (!store.get("id_token") || !store.get("expires_at")) {
      return false;
    }
    let authenticated = false;
    // we may have a token but it could be expired
    let expiresAt = store.get("expires_at");
    try {
      expiresAt = JSON.parse(expiresAt);
      authenticated = new Date().getTime() < expiresAt;
    } catch (e) {
      // invalid JSON
      // ignore it, authenticated is false by default.
    }

    if (!authenticated) {
      // we should figure out how to do reauth XXX
      store.remove("access_token");
      store.remove("id_token");
      store.remove("expires_at");
      store.set("profile", "{}");
      store.set("user", "{}");
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
