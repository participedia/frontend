import { reducer } from "redux-form";
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

// AUTH reducers
import * as ActionTypes from "./actions";
import AuthService from "./utils/AuthService";

function auth(
  state = {
    isAuthenticated: !AuthService.isTokenExpired(),
    isFetching: false,
    profile: AuthService.getProfile(),
    error: null
  },
  action
) {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return { ...state, isFetching: true, error: null };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        profile: action.profile
      };
    case ActionTypes.LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        profile: {},
        error: action.error
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return { ...state, isAuthenticated: false, profile: {} };
    case ActionTypes.PROFILE_UPDATED:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        profile: AuthService.getProfile(),
        errorMessage: ""
      });
    default:
      return state;
  }
}

// separate actions for UI and actions for content

import {
  SEARCHING,
  RECEIVED_DATA,
  SWITCH_CATEGORY,
  SET_LAYOUT,
  SET_SORT_ORDER,
  DO_RECENT_SEARCH,
  FETCHING_OBJECT,
  RECEIVED_OBJECT,
  RECEIVED_OBJECT_SAVED
} from "./actions";

function dataStoreReducer(state = {}, action) {
  switch (action.type) {
    case FETCHING_OBJECT:
      return Object.assign({}, state, {
        type: action.type,
        id: action.id,
        searching: true
      });
    case RECEIVED_OBJECT:
      return Object.assign({}, state, {
        currentObject: action.payload.object,
        currentID: action.payload.ID,
        searching: false
      });
    case RECEIVED_OBJECT_SAVED:
      return Object.assign({}, state, {
        currentID: action.payload.ID,
        searching: false
      });
    default:
      return state;
  }
}

function searchEngine(state = {}, action) {
  switch (action.type) {
    case SEARCHING:
      return Object.assign({}, state, {
        query: action.query,
        searching: true
      });
    case DO_RECENT_SEARCH:
      return Object.assign({}, state, {
        query: "recent",
        searching: true
      });
    case RECEIVED_DATA:
      return Object.assign({}, state, {
        data: action.data,
        searching: false
      });
    default:
      return state;
  }
}

function uiReducer(
  state = {
    sort: "chronological",
    category: "All"
  },
  action
) {
  switch (action.type) {
    case SWITCH_CATEGORY:
      return Object.assign({}, state, {
        category: action.category
      });
    case SET_SORT_ORDER:
      return Object.assign({}, state, {
        sort: action.sort
      });
    case SET_LAYOUT:
      return Object.assign({}, state, {
        layout: action.layout
      });
    default:
      return state;
  }
}

function nounCache(
  state = {
    organization: {}
  },
  action
) {
  switch (action.type) {
    case ActionTypes.RECEIVED_NOUNS:
      return Object.assign({}, state, {
        [action.noun]: action.nouns
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  auth: auth,
  cases: searchEngine,
  ui: uiReducer,
  objects: dataStoreReducer,
  nouns: nounCache,
  form: reducer,
  routing: routerReducer
});

export default rootReducer;
