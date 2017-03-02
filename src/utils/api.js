// This is the JS API to talk to api.participedia.xyz

let APIURL = process.env.REACT_APP_API_URL  // eslint-disable-line no-undef

if (! APIURL) {
  console.error('No API URL was found. REACT_APP_API_URL should be set in environment variables.')
}

import queryString from 'query-string'

class API {

  secureFetch = function (url, method, payload) {
    var opts = {
      method: method || 'get',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    if (payload) opts.body = JSON.stringify(payload)
    return new Promise(function (resolve, reject) {
      fetch(url, opts)
        .then(function (response) {
          response.json().then(function (json) {
            resolve(json)
          })
        })
        .catch(function (error) {
          console.log('There has been a problem:' + error.message)
          reject(error)
        }
      )
    })
  }

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
      console.log('query: << %s >>, selectedCategory: << %s >>, sortingMethod: << %s >>', query, selectedCategory, sortingMethod);
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
  fetchNouns = function (noun) {
    return new Promise(function (resolve, reject) {
      try {
        let url = APIURL + '/search/getAllForType?objType=' + noun
        fetch(url)
          .then(function (response) {
            response.json().then(function (json) {
              resolve(json)
            })
          })
          .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ' + error.message)
            reject(error)
          })
      } catch (e) {
        console.log(e)
      }
    })
  }
}
export default new API()
