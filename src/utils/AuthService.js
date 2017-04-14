import Auth0Lock from "auth0-lock";
import jwtDecode from "jwt-decode";
import ppLogo from "../img/pp-logo-dark.png";

class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0 lock
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: window.location.origin + "/redirect",
        responseType: "token",
        params: {
          scope: "openid email read:users update:users update:users_app_metadata user_metadata app_metadata",
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
    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  login(redirectUrl) {
    // Call the show method to display the widget.
    let state = { pathname: window.location.pathname };
    if (redirectUrl) {
      state["return_url"] = redirectUrl;
    }
    let stateString = JSON.stringify(state);
    this.lock.show({
      auth: {
        params: {
          scope: "openid email read:users update:users update:users_app_metadata user_metadata app_metadata",
          state: stateString
        }
      }
    });
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    localStorage.removeItem("profile");
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
