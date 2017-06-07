import history from "./history";

// AUTH_V8
// import auth0 from "auth0-js";

// AUTH_v7
import Auth0Lock from "auth0-lock";
import ppLogo from "../img/pp-logo-dark.png";

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

  // AUTH_VERSION === 7
  lock = new Auth0Lock(
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

  constructor(clientId, domain) {
    this.clientId = clientId;
    this.domain = domain;
    // AUTH_VERSION=7
    this.lock.on("authenticated", authResult => {
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        // let expiresAt = JSON.stringify(
        //   authResult.expiresIn * 1000 + new Date().getTime()
        // );
        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);
        // localStorage.setItem("expires_at", expiresAt);
        this.setProfile(profile);
        let state = JSON.parse(authResult.state);
        if (state && state.redirectURL) {
          history.replace(state.redirectURL);
        } else {
          history.replace("/");
        }
      });
    });
    this.getProfile = this.getProfile.bind(this);
    // binds login functions to keep this context
    this.login = this.login.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  setToken(token) {
    localStorage.setItem("id_token", token);
  }
  setProfile(profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
  }

  getAccessToken() {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    return accessToken;
  }

  getProfile(cb) {
    if (!localStorage.getItem("access_token")) {
      return cb(null, {});
    }
    let profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) {
      cb(null, profile);
    } else {
      let accessToken = this.getAccessToken();
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          localStorage.setItem("profile", JSON.stringify(profile));
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
    // AUTH_VERSION === 8

    // this.auth0.authorize({
    //   lang: {
    //     signin: {
    //       title: "Log in to Participedia"
    //     }
    //   },
    //   audience: AUDIENCE,
    //   scope: SCOPE,
    //   state: JSON.stringify({ redirectURL })
    // });
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
    //  authService.lock.on("authorization_error", error =>
    //    dispatch(loginError(error))
    //  );

    this.auth0.parseHash(window.location.hash, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);
        localStorage.setItem("expires_at", expiresAt);
        let state = JSON.parse(authResult.state);
        if (state && state.redirectURL) {
          history.replace(state.redirectURL);
        } else {
          history.replace("/");
        }
      } else if (err) {
        history.replace("/");
      }
    });
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("profile");
    // navigate to the home route
    history.replace("/");
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    // AUTH_VERSION === 7
    return localStorage.getItem("id_token") ? true : false;
    // AUTH_VERSION === 8
    // let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    // return new Date().getTime() < expiresAt;
  }
}

const authService = new AuthService(
  process.env.REACT_APP_AUTH0_CLIENT_ID,
  process.env.REACT_APP_AUTH0_DOMAIN
);

export default authService;
