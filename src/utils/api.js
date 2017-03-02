// This is the JS API to talk to api.participedia.xyz

let APIURL = process.env.REACT_APP_API_URL  // eslint-disable-line no-undef

if (! APIURL) {
  console.error('No API URL was found. REACT_APP_API_URL should be set in environment variables.')
}

import queryString from 'query-string'

let secureFetch = function (url, method, payload) {
  var opts = {
    method: method || 'get',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  if (payload) opts.body = JSON.stringify(payload)
  return fetch(url)
      .then(response => response.json())
}

class API {

  fetchGeoJSON = function ( countryCode ) {
    let url = APIURL + '/countries/' + countryCode + '.geo.json'
    return fetch(url)
      .then(response => response.json())
      .catch(function(error) {
        console.error("Error fetching: ", url, error)
      })
  }

  countsByCountry = function () {
    let url = APIURL + '/case/countsByCountry'
    return fetch(url)
      .then(response => response.json().data.countryCounts)
      .catch(function(error) {
        console.error("Error fetching: ", url, error)
        throw (error);
      })
  }

  performSearch = function (query, selectedCategory, sortingMethod) {
    let paramstring = queryString.stringify({
      query: query,
      selectedCategory: selectedCategory,
      sortingMethod: sortingMethod
    })
    let url = `${APIURL}/search?${paramstring}`
    return fetch(url)
      .then(response => response.json().data)
      .catch(function(error) {
        console.error("Error fetching: ", url, error)
        throw (error);
      })
  }
  fetchCaseById = function (caseId) {
    let url = APIURL + '/case/' + caseId
    return fetch(url)
      .then(response => response.json().data)
      .catch(function(error) {
        console.error("Error fetching: ", url, error)
        throw (error);
      })
  }
  fetchMethodById = function (methodId) {
    let url = APIURL + '/method/' + methodId
    return fetch(url)
        .then(response => response.json().data)
      .catch(function(error) {
        console.error("Error fetching: ", url, error)
        throw (error);
      })
  }
  fetchOrgById = function (orgId) {
    let url = APIURL + '/organization/' + orgId
    return fetch(url)
      .then(response => response.json().data)
      .catch(function(error) {
        console.error("Error fetching: ", url, error)
        throw (error);
      })
  }
  fetchNouns = function (noun) {
    return fetch(APIURL + '/search/getAllForType?objType=' + noun)
      .then(response => response.json().data)
      .catch(function(error) {
        console.error("Error fetching: ", url, error)
        throw (error);
      })
  }
}
export default new API()
