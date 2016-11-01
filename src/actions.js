export const SEARCH_CASES = 'SEARCH_CASES'
export const SELECT_CASE = 'SELECT_CASE'
export const RECEIVED_DATA = 'RECEIVED_DATA'
export const SEARCHING = 'SEARCHING'
export const SWITCH_CATEGORY = 'SWITCH_CATEGORY'
export const SET_SORT_ORDER = 'SET_SORT_ORDER'
export const SET_LAYOUT = 'SET_LAYOUT'
export const DO_RECENT_SEARCH = 'DO_RECENT_SEARCH'
export const FETCHING_OBJECT = 'FETCHING_OBJECT'
export const RECEIVED_OBJECT = 'RECEIVED_OBJECT'
export const CASE_TYPE = 'CASE'

import Auth0Lock from 'auth0-lock'
import api from './utils/api'


// There are two possible states for our login
// process and we need actions for each of them.
//
// We also need one to show the Lock widget.
// export const SHOW_LOCK = 'SHOW_LOCK'
export const LOCK_SUCCESS = 'LOCK_SUCCESS'
export const LOCK_ERROR = 'LOCK_ERROR'

// function showLock() {
//   return {
//     type: SHOW_LOCK
//   }
// }

function lockSuccess(profile, token) {
  return {
    type: LOCK_SUCCESS,
    profile,
    token
  }
}

function lockError(err) {
  return {
    type: LOCK_ERROR,
    err
  }
}

// Opens the Lock widget and
// dispatches actions along the way
export function login() {
  const lock = new Auth0Lock('lORPmEONgX2K71SX7fk35X5PNZOCaSfU', 'participedia.auth0.com',
    {
      'auth': {
        'redirectUrl': window.location.origin + '/en-US/',
        'responseType': 'token',
        'params': {
          state: JSON.stringify({pathname: window.location.pathname})
        }
      }
    }
  );
  return dispatch => {
    lock.show({auth: { params: { scope: 'openid email app_metadata' }}}, (err, profile, token) => {
      // TODO #45 in actions.js figure out why the auth promise never gets called 
      // TODO when auth promise code fixed, remove code in index.js to do the profile extraction on redirect
      if (err) {
        dispatch(lockError(err))
        return
      }
      console.log("in consequnece of show", profile)
      localStorage.setItem('profile', JSON.stringify(profile))
      localStorage.setItem('id_token', token)
      dispatch(lockSuccess(profile, token))
    })
  }
}

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}


// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
  }
}







export function startFetchObject() {
  return {
    type: FETCHING_OBJECT,
    payload: null
  }
}
export function receiveObject(id, json) {
  return {
    type: RECEIVED_OBJECT,
    payload: {object: json[0], id: id}
  }
}

export function loadObject (type, id) {
  if (type === CASE_TYPE) {
    return dispatch => {
      dispatch(startFetchObject(id))
      return api.fetchCaseById(id)
        .then(response => dispatch(receiveObject(id, response)),
        function (err) {
          console.log('got an error in fetchCaseById', err)
        })
    }
  } else {
    console.error('not a case')
    // TODO loadObject needs to deal with things other than cases
  }
}

export function changeCategory (category) {
  return {
    type: SWITCH_CATEGORY,
    category: category
  }
}

export function switchCategory (category, query, sortingMethod) {
  // console.log(`in switchCategory: category: ${category}, query: ${query}, sortingMethod: ${sortingMethod}`)
  return dispatch => {
    dispatch(changeCategory(category))
    dispatch(search(query, category, sortingMethod))
  }
}

export function setSortOrder (sort) {
  return {
    type: SET_SORT_ORDER,
    sort: sort
  }
}

export function setSortOrderAndSearch (query, selectedCategory, sortingMethod) {
  return dispatch => {
    dispatch(setSortOrder(sortingMethod))
    dispatch(search(query, selectedCategory, sortingMethod))
  }
}

export function setLayoutOrder (layout) {
  return {
    type: SET_LAYOUT,
    layout: layout
  }
}

function startSearch (query, selectedCategory, sortingMethod) {
  return {
    type: SEARCHING,
    query: query,
    sortingMethod: sortingMethod
  }
}

function receiveData (query, response) {
  return {
    type: RECEIVED_DATA,
    data: response.results
  }
}

export function search (query, selectedCategory, sortingMethod) {
  return dispatch => {
    dispatch(startSearch(query, selectedCategory, sortingMethod))
    return api.performSearch(query, selectedCategory, sortingMethod)
      .then(response => dispatch(receiveData(query, response)),
      function (err) {
        console.log('got an error after performSearch', err)
      })
  }
}
