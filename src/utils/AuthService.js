import jwtDecode from "jwt-decode";
import ppLogo from "../img/pp-logo-dark.png";
import myhistory from "./history";

// Quiet Jest down (Unnecessary as soon as we upgrade to react-apps 0.10)
if (process.env.NODE_ENV === "test") {
  require.ensure = (deps, cb) => cb(require);
}

const SCOPE =
  "openid email read:users update:users update:users_app_metadata user_metadata app_metadata picture created_at";

class AuthService {
  constructor(clientId, domain) {
    this.clientId = clientId;
    this.domain = domain;
    this.lock = null;
    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  setupLock(next) {
    // use code splitting to make it so auth0-lock is only loaded when we actually need to auth
    let component = this;
    require.ensure(["auth0-lock"], function(require) {
      let Auth0Lock = require("auth0-lock").default;
      component.lock = new Auth0Lock(component.clientId, component.domain, {
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
      });
    });
  }

  loginSuccess(profile, state) {
    console.log("in loginSuccess, doing history push");
    myhistory.push(state.pathname);
  }
  loginError(error) {
    console.error("Error during login", error);
  }

  login(redirectUrl) {
    console.log("in login, redirectUrl = ", redirectUrl);
    // Call the show method to display the widget.
    if (!this.lock) {
      this.setupLock(this.showLock.bind(this, redirectUrl));
    } else {
      this.showLock(redirectUrl);
    }
  }
  showLock(redirectUrl) {
    let state = { pathname: window.location.pathname };
    if (redirectUrl) {
      state["return_url"] = redirectUrl;
    }
    console.log("state", state);
    let component = this;
    this.lock.on("authenticated", authResult => {
      console.log("WE ARE AUTHENTICATED");
      component.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          return component.loginError(error);
        }
        component.setToken(authResult.idToken);
        component.setProfile(profile);
        return component.loginSuccess(profile, JSON.parse(authResult.state));
      });
    });
    component.lock.on("authorization_error", error => {
      console.log("GOT ERROR", error);
      component.loginError(error);
    });
    console.log("DOING THE SHOW");
    this.lock.show({
      auth: {
        params: {
          scope: SCOPE,
          state: JSON.stringify(state)
        }
      }
    });
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    localStorage.removeItem("profile");
    // need to rerender everything
    myhistory.push("/");
  }

  getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem("profile");
    return profile ? JSON.parse(localStorage.profile) : {};
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem("profile", JSON.stringify(profile));
    // Triggers profile_updated event to update the UI
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  getTokenExpirationDate() {
    const token = this.getToken();
    const decoded = jwtDecode(token);
    if (!decoded.exp) {
      return null;
    }

    const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    const date = this.getTokenExpirationDate(token);
    const offsetSeconds = 0;
    if (date === null) {
      return false;
    }
    let expired = !(date.valueOf() >
      new Date().valueOf() + offsetSeconds * 1000);
    return expired;
  }
}

const authService = new AuthService(
  process.env.REACT_APP_AUTH0_CLIENT_ID,
  process.env.REACT_APP_AUTH0_DOMAIN
);

export default authService;
