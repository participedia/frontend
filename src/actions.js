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

import api from './utils/api'

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
    // XXX deal with things beyond cases
  }
}


export function doRecentSearch () {
  return {
    type: DO_RECENT_SEARCH
  }
}

export function switchCategory (category) {
  return {
    type: SWITCH_CATEGORY,
    category: category
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
    data: response.hits.hits
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
