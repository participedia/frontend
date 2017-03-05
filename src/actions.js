export const SEARCH_CASES = "SEARCH_CASES";
export const SELECT_CASE = "SELECT_CASE";
export const RECEIVED_DATA = "RECEIVED_DATA";
export const SEARCHING = "SEARCHING";
export const SWITCH_CATEGORY = "SWITCH_CATEGORY";
export const SET_SORT_ORDER = "SET_SORT_ORDER";
export const SET_LAYOUT = "SET_LAYOUT";
export const DO_RECENT_SEARCH = "DO_RECENT_SEARCH";
export const FETCHING_OBJECT = "FETCHING_OBJECT";
export const RECEIVED_OBJECT = "RECEIVED_OBJECT";
export const CASE_TYPE = "CASE";
export const PROFILE_UPDATED = "PROFILE_UPDATED";

import Auth0Lock from "auth0-lock";
import api from "./utils/api";

// There are two possible states for our login
// process and we need actions for each of them.
//
// We also need one to show the Lock widget.
// export const SHOW_LOCK = 'SHOW_LOCK'
export const LOCK_SUCCESS = "LOCK_SUCCESS";
export const LOCK_ERROR = "LOCK_ERROR";

// Opens the Lock widget and
// dispatches actions along the way
export function login() {
  const options = {
    auth: {
      redirectUrl: window.location.origin + "/en-US/redirect",
      responseType: "token",
      params: {
        scope: "openid email read:users update:users update:users_app_metadata user_metadata app_metadata",
        state: JSON.stringify({ pathname: window.location.pathname })
      }
    },
    autoclose: true
  };

  const lock = new Auth0Lock(
    "lORPmEONgX2K71SX7fk35X5PNZOCaSfU",
    "participedia.auth0.com",
    options
  );

  return dispatch => {
    lock.show();
  };
}

export function updateUserMetaData(userId, data) {
  return function(dispatch) {
    const payload = { user_metadata: data };
    const url = `https://participedia.auth0.com/api/v2/users/${userId}`;
    return api.secureFetch(url, "PATCH", payload).then(response => {
      localStorage.setItem("profile", JSON.stringify(response));
      dispatch({
        type: PROFILE_UPDATED
      });
    });
  };
}

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem("id_token");
    dispatch(receiveLogout());
  };
}

export const ORGANIZATION = "ORGANIZATION";
export const CASE = "CASE";
export const METHOD = "METHOD";
export const RECEIVED_NOUNS = "RECEIVED_NOUNS";

export function loadNouns(noun) {
  return dispatch => {
    return api.fetchNouns(noun).then(
      function(response) {
        dispatch(receiveNouns(noun, response));
      },
      function(err) {
        console.log("got an error in loadNouns", err);
      }
    );
  };
}

export function receiveNouns(noun, json) {
  return {
    type: RECEIVED_NOUNS,
    noun: [noun.toLowerCase()],
    nouns: json
  };
}

export function startFetchObject() {
  return {
    type: FETCHING_OBJECT,
    payload: null
  };
}

export function receiveObject(id, json) {
  return {
    type: RECEIVED_OBJECT,
    payload: { object: json[0], id: id }
  };
}

export function loadObject(type, id) {
  if (type === CASE_TYPE) {
    return dispatch => {
      dispatch(startFetchObject(id));
      return api
        .fetchCaseById(id)
        .then(response => dispatch(receiveObject(id, response)), function(err) {
          console.log("got an error in fetchCaseById", err);
        });
    };
  } else {
    console.error("not a case");
    // TODO loadObject needs to deal with things other than cases
  }
}

export function changeCategory(category) {
  return {
    type: SWITCH_CATEGORY,
    category: category
  };
}

export function switchCategory(category, query, sortingMethod) {
  return dispatch => {
    dispatch(changeCategory(category));
    dispatch(search(query, category, sortingMethod));
  };
}

export function setSortOrder(sort) {
  return {
    type: SET_SORT_ORDER,
    sort: sort
  };
}

export function setSortOrderAndSearch(query, selectedCategory, sortingMethod) {
  return dispatch => {
    dispatch(setSortOrder(sortingMethod));
    dispatch(search(query, selectedCategory, sortingMethod));
  };
}

export function setLayoutOrder(layout) {
  return {
    type: SET_LAYOUT,
    layout: layout
  };
}

function startSearch(query, selectedCategory, sortingMethod) {
  return {
    type: SEARCHING,
    query: query,
    sortingMethod: sortingMethod
  };
}

function receiveData(query, response) {
  return {
    type: RECEIVED_DATA,
    data: response.results
  };
}

export function search(query, selectedCategory, sortingMethod) {
  return dispatch => {
    dispatch(startSearch(query, selectedCategory, sortingMethod));
    return api
      .performSearch(query, selectedCategory, sortingMethod)
      .then(response => dispatch(receiveData(query, response)), function(err) {
        console.log("got an error after performSearch", err);
      });
  };
}
