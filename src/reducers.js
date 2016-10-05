import {combineReducers}  from 'redux'
import {reducer} from 'redux-form'

// XXX separate actions for UI and actions for content

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
    console.log("in RECEIVED_OBJECT reducer", action)
    return Object.assign({}, state, {
      currentObject: action.payload.object,
      currentID: action.payload.ID,
      searching: false
    })
  }
  return state
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

function uiReducer (state = {}, action) {
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
  cases: searchEngine,
  ui: uiReducer,
  objects: dataStoreReducer,
  form: reducer
})

export default rootReducer
