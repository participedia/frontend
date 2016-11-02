// This is the JS API to talk to api.participedia.xyz

let APIURL = process.env.REACT_APP_API_URL  // eslint-disable-line no-undef

if (! APIURL) {
  console.error('No API URL was found. REACT_APP_API_URL should be set in environment variables.')
}

import queryString from 'query-string'

class API {

  fetchGeoJSON = function ( countryCode ) {
    return new Promise(function (resolve, reject) {
      fetch(APIURL + '/countries/' + countryCode + '.geo.json')
        .then(function (response) {
          response.json().then(function (json) {
            resolve(json)
          })
        })
        .catch(function (error) {
          console.log('There has been a problem with fetchGeoJSON operation: ' + error.message)
          reject(error)
        }
      )
    })
  }

  countsByCountry = function (/* resolve , reject */) {
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
        }
      )
    })
  }

  performSearch = function (query, selectedCategory, sortingMethod,  /* resolve, reject */) {
    let paramstring = queryString.stringify({
      query: query,
      selectedCategory: selectedCategory,
      sortingMethod: sortingMethod
    })
    return new Promise(function (resolve, reject) {
      fetch(`${APIURL}/search?${paramstring}`)
        .then(function (response) {
          response.json().then(function (json) {
            resolve(json)
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
  }
  fetchOrgById = function (caseId) {
    return new Promise(function (resolve, reject) {
      fetch(APIURL + '/organization/' + caseId)
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
}
export default new API()
