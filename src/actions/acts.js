export const SEARCH_CASES = "SEARCH_CASES";
export const SELECT_CASE = "SELECT_CASE";
export const RECEIVED_DATA = "RECEIVED_DATA";
export const SEARCHING = "SEARCHING";
export const SWITCH_CATEGORY = "SWITCH_CATEGORY";
export const SET_SORT_ORDER = "SET_SORT_ORDER";
export const SET_LAYOUT = "SET_LAYOUT";
export const DO_RECENT_SEARCH = "DO_RECENT_SEARCH";
export const FETCHING_OBJECT = "FETCHING_OBJECT";
export const SAVING_OBJECT = "SAVING_OBJECT";
export const RECEIVED_OBJECT = "RECEIVED_OBJECT";
export const RECEIVED_OBJECT_SAVED = "RECEIVED_OBJECT_SAVED";
export const CASE_TYPE = "CASE";
export const PROFILE_UPDATED = "PROFILE_UPDATED";
import { push } from "react-router-redux";
import api from "../utils/api";

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
    payload: { object: json, id: id }
  };
}

export function loadObject(type, id) {
  if (type === CASE_TYPE) {
    return dispatch => {
      dispatch(startFetchObject(id));
      return api
        .fetchCaseById(id)
        .then(response => dispatch(receiveObject(id, response)))
        .catch(function(err) {
          console.log("got an error in fetchCaseById", err);
        });
    };
  } else {
    console.error("not a case");
    // TODO loadObject needs to deal with things other than cases
  }
}

export function startSaveObject() {
  return {
    type: SAVING_OBJECT,
    payload: null
  };
}

export function receiveObjectSaved(state, id) {
  return {
    type: RECEIVED_OBJECT_SAVED,
    payload: { ID: id }
  };
}

export function makeObject(type, object) {
  // console.log("in makeObject", object);
  return dispatch => {
    dispatch(startSaveObject(object));
    if (type === CASE_TYPE) {
      return api
        .saveNewCase(object)
        .then(response => dispatch(receiveObjectSaved(object, response)))
        .then(function(thing) {
          dispatch(push("/en-US/case/" + thing.payload.ID.case_id));
        })
        .catch(reason => {
          console.error("Error saving case", reason);
        });
    } else {
      // XXX not cases
    }
  };
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
