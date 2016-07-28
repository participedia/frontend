// This is the JS API to talk to api.participedia.xyz

let APIURL = __API_URL__


import elasticsearch from 'elasticsearch'

/* eslint-disable no-undef */
let ElasticSearchURL = __ELASTICSEARCH_URL__
/* eslint-enable no-undef */

import Bodybuilder from 'bodybuilder'
console.log('ElasticSearchURL', ElasticSearchURL)

var client = new elasticsearch.Client({
  host: ElasticSearchURL
  // log: 'trace'
})

class API {
  countsByCountry = function (resolve, reject) {
    return new Promise(function (resolve, reject) {
      fetch(APIURL + '/case/countsByCountry')
        .then(function (response) {
          response.json().then(function(json) {
            resolve(json.data.countryCounts)
          })
        })
        .catch(function (error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
          reject(error)
        })
    })
  }

  performSearch = function (query, selectedCategory, sortingMethod, resolve, reject) {
    let body = new Bodybuilder()
    if (query) {
      body = body.query('match', '_all', query)
    }
    // console.log('DOING SEARCH ', query, selectedCategory, sortingMethod)
    if (sortingMethod === 'chronological') {
      body = body.sort('LastUpdatedDate', 'desc')
    } else {
      body = body.sort('CaseID.raw', 'asc') // Note this requires a non-analyzed field
    }
    let bodyquery = body.size(30).build('v2')
    // console.log("BODYQUERY", bodyquery)

    if (query) {
      return client.search({
        index: 'pp',
        body: bodyquery
      })
    } else {
      return client.search({
        index: 'pp',
        match_all: {},
        body: bodyquery
      })
    }
  }
}

export default new API()
