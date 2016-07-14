/* this library is the single interface to elasticsearch that the entire front-end
   uses.  It returns Promise wrappers around fetch */

export function fetchRecentStuff () {
  let url = __ELASTICSEARCH_URL__ + '/pp/case/'

   // search by: LastUpdatedDate
  let p = new Promise(function (resolve, reject) {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (value) {
      resolve(value)
    }, function (reason) {
      reject(reason)
    })
  })
  return p
}

export function fetchCaseById (nodeID) {
  let url = __ELASTICSEARCH_URL__ + '/pp/case/' + nodeID

  let p = new Promise(function (resolve, reject) {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (value) {
      resolve(value)
    }, function (reason) {
      reject(reason)
    })
  })
  return p
}

export function fetchMethodById (methodID) {
  let url = __ELASTICSEARCH_URL__ + '/pp/method/' + methodID

  let p = new Promise(function (resolve, reject) {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (value) {
      resolve(value)
    }, function (reason) {
      reject(reason)
    })
  })
  return p
}
