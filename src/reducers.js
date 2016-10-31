import {reducer} from 'redux-form'
import { combineReducers } from 'redux'

// AUTH reducers

import {
  LOCK_SUCCESS, LOGOUT_SUCCESS
} from './actions'

function getProfile() {
  return JSON.parse(localStorage.getItem('profile'));
}

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. 
// TODO figure out if we need to check for expired tokens
function auth(state = {
    isFetching: false,
    profile: getProfile(),
    token: localStorage.getItem('id_token'),
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
    case LOCK_SUCCESS:
      console.log("in auth, action.type is LOCK_SUCCESS")
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        profile: getProfile(),
        errorMessage: ''
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        profile: null
      })
    default:
      return state
    }
}



// separate actions for UI and actions for content

import { SEARCHING, RECEIVED_DATA, SWITCH_CATEGORY, SET_LAYOUT,
         SET_SORT_ORDER, DO_RECENT_SEARCH,
        FETCHING_OBJECT, RECEIVED_OBJECT } from './actions'

function dataStoreReducer (state = { }, action) {
  switch (action.type) {
  case FETCHING_OBJECT:
    return Object.assign({}, state, {
      type: action.type,
      id: action.id,
      searching: true
    })
  case RECEIVED_OBJECT:
    return Object.assign({}, state, {
      currentObject: action.payload.object,
      currentID: action.payload.ID,
      searching: false
    })
  default:
    return state
  }
}

function searchEngine (state = { }, action) {
  switch (action.type) {
  case SEARCHING:
    return Object.assign({}, state, {
      query: action.query,
      searching: true
    })
  case DO_RECENT_SEARCH:
    return Object.assign({}, state, {
      query: 'recent',
      searching: true
    })
  case RECEIVED_DATA:
    return Object.assign({}, state, {
      data: action.data,
      searching: false
    })
  default:
    return state
  }
}

function uiReducer (state = {
    sort: 'chronological',
    category: 'All'
  }, action) {
    console.log("in uiReducer", action)
    switch (action.type) {
    case SWITCH_CATEGORY:
      return Object.assign({}, state, {
        category: action.category
      })
    case SET_SORT_ORDER:
      return Object.assign({}, state, {
        sort: action.sort
      })
    case SET_LAYOUT:
      return Object.assign({}, state, {
        layout: action.layout
      })
    default:
      return state
  }
}


const rootReducer = combineReducers({
  auth: auth,
  cases: searchEngine,
  ui: uiReducer,
  objects: dataStoreReducer,
  form: reducer
})

export default rootReducer
