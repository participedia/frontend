// This is the JS API to talk to api.participedia.xyz

let APIURL = __API_URL__

import queryString from 'query-string'

class API {
  countsByCountry = function (resolve, reject) {
    return new Promise(function (resolve, reject) {
      fetch(APIURL + '/case/countsByCountry')
        .then(function (response) {
          response.json().then(function (json) {
            resolve(json.data.countryCounts)
          })
        })
        .catch(function (error) {
          console.log('There has been a problem with your fetch operation: ' + error.message)
          reject(error)
        })
    })
  }

  performSearch = function (query, selectedCategory, sortingMethod, resolve, reject) {
    let paramstring = queryString.stringify({
      query: query,
      selectedCategory: selectedCategory,
      sortingMethod: sortingMethod
    })
    return new Promise(function (resolve, reject) {
      fetch(APIURL + '/case/search?' + paramstring)
        .then(function (response) {
          response.json().then(function (json) {
            resolve(json.data)
          })
        })
        .catch(function (error) {
          console.log('There has been a problem with your fetch operation: ' + error.message)
          reject(error)
        })
    })
  }
  fetchCaseById = function (caseId) {
    return new Promise(function (resolve, reject) {
      fetch(APIURL + '/case/' + caseId)
        .then(function (response) {
          response.json().then(function (json) {
            resolve(json.data)
          })
        })
        .catch(function (error) {
          console.log('There has been a problem with your fetch operation: ' + error.message)
          reject(error)
        })
    })
  }
  fetchMethodById = function (methodId) {
    return new Promise(function (resolve, reject) {
      fetch(APIURL + '/method/' + methodId)
        .then(function (response) {
          response.json().then(function (json) {
            resolve(json.data)
          })
        })
        .catch(function (error) {
          console.log('There has been a problem with your fetch operation: ' + error.message)
          reject(error)
        })
    })
  }}

export default new API()
