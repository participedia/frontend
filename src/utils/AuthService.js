import history from "./history";
import auth0 from "auth0-js";

const SCOPE =
  "openid profile email read:users update:users update:users_app_metadata user_metadata app_metadata picture created_at";

class AuthService {
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: window.location.origin + "/redirect",
    audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo`,
    responseType: "token id_token",
    scope: SCOPE
  });

  constructor(clientId, domain) {
    this.clientId = clientId;
    this.domain = domain;
    this.lock = null;
    this.getProfile = this.getProfile.bind(this);
    // binds login functions to keep this context
    this.login = this.login.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
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

  login() {
    this.auth0.authorize({
      lang: {
        signin: {
          title: "Log in to Participedia"
        }
      }
    });
  }

  handleAuthentication() {
    this.auth0.parseHash(window.location.hash, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace("/");
      } else if (err) {
        history.replace("/");
      }
    });
  }

  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );
      localStorage.setItem("access_token", authResult.accessToken);
      localStorage.setItem("id_token", authResult.idToken);
      localStorage.setItem("expires_at", expiresAt);
      // navigate to the home route
      history.push("/");
    }
  }

  getToken() {
    return localStorage.getItem("access_token");
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
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }
}

const authService = new AuthService(
  process.env.REACT_APP_AUTH0_CLIENT_ID,
  process.env.REACT_APP_AUTH0_DOMAIN
);

export default authService;
