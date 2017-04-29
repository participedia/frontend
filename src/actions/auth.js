import authService from "../utils/AuthService";
import myhistory from "../utils/history";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

// Listen to authenticated event from authService and get the profile of the user
// Done on every page startup

function configLock(dispatch) {
  authService.lock.on("authenticated", authResult => {
    authService.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        return dispatch(loginError(error));
      }
      authService.setToken(authResult.idToken);
      authService.setProfile(profile);
      return dispatch(loginSuccess(profile, JSON.parse(authResult.state)));
    });
  });
  authService.lock.on("authorization_error", error =>
    dispatch(loginError(error))
  );
}
export function checkLogin() {
  return dispatch => {
    if (authService.loggedIn()) {
      dispatch(loginSuccess(authService.getProfile(), {}));
    } else {
      if (authService.lock === null) {
        authService.setupLock(configLock.bind(dispatch));
      }
      configLock(dispatch);
    }
  };
}

export function loginRequest() {
  authService.login();
  return {
    type: LOGIN_REQUEST
  };
}

export function loginSuccess(profile, state) {
  myhistory.push(state.pathname);
  return {
    type: LOGIN_SUCCESS,
    profile
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  };
}

export function logoutSuccess() {
  authService.logout();
  return {
    type: LOGOUT_SUCCESS
  };
}
