// This is the JS API to talk to api.participedia.xyz
import log from "winston";
let APIURL = process.env.REACT_APP_API_URL; // eslint-disable-line no-undef

if (!APIURL) {
  console.error(
    "No API URL was found. REACT_APP_API_URL should be set in environment variables."
  );
}

import queryString from "query-string";

const signedFetch = function(url, method, payload) {
  let opts = {
    method: method || "get",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("id_token"),
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  if (payload) opts.body = JSON.stringify(payload);
  return fetch(url, opts);
};

class API {
  secureFetch = function(url, method, payload) {
    let opts = {
      method: method || "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("id_token"),
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    if (payload) opts.body = JSON.stringify(payload);
    return fetch(url, opts);
  };

  fetchGeoJSON = function(countryCode) {
    let url = APIURL + "/countries/" + countryCode + ".geo.json";
    return fetch(url).then(response => response.json()).catch(function(error) {
      log.error(
        `There has been a problem with your fetch operation: (${url}) ${error}`
      );
      return error;
    });
  };

  countsByCountry = function() {
    let url = APIURL + "/case/countsByCountry";
    return fetch(url)
      .then(response => response.json())
      .then(function(json) {
        // log.error("countsByCountry", json);
        return json.data.countryCounts;
      })
      .catch(function(error) {
        log.error(
          `There has been a problem with your fetch operation: (${url}) ${error}`
        );
        return error;
      });
  };

  performSearch = function(query, selectedCategory, sortingMethod) {
    let paramstring = queryString.stringify({
      query: query,
      selectedCategory: selectedCategory,
      sortingMethod: sortingMethod
    });
    let url = `${APIURL}/search?${paramstring}`;
    return fetch(url).then(response => response.json()).catch(function(error) {
      console.log(
        `There has been a problem with your fetch operation: (${url}) ${error}`
      );
      return error;
    });
  };

  fetchCaseById = function(caseId) {
    let url = APIURL + "/case/" + caseId;
    return fetch(url)
      .then(response => response.json())
      .then(json => json.data)
      .catch(function(error) {
        console.error(
          `There has been a problem with your fetch operation: (${url}) ${error}`
        );
        throw error;
      });
  };

  saveNewCase = function(caseObj) {
    let url = APIURL + "/case/new";
    return signedFetch(url, "POST", caseObj)
      .then(response => response.json())
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.message);
        }
        return response;
      })
      .then(json => json.data)
      .catch(function(error) {
        console.error(
          `There has been a problem with saving the case: (${url}) ${error}`
        );
        throw error;
      });
  };

  saveCase = function(caseObj) {
    let url = APIURL + "/case/" + caseObj.id;
    return signedFetch(url, "PUT", caseObj)
      .then(response => response.json())
      .then(json => json.data)
      .catch(function(error) {
        console.error(
          `There has been a problem with saving the case: (${url}) ${error}`
        );
        throw error;
      });
  };

  fetchMethodById = function(methodId) {
    let url = APIURL + "/method/" + methodId;
    return fetch(url)
      .then(response => response.json())
      .then(json => json.data)
      .catch(function(error) {
        console.log(
          `There has been a problem with your fetch operation: (${url}) ${error}`
        );
        return error;
      });
  };

  fetchOrgById = function(caseId) {
    let url = APIURL + "/organization/" + caseId;
    return fetch(url)
      .then(response => response.json())
      .then(json => json.data)
      .catch(function(error) {
        console.log(
          `There has been a problem with your fetch operation: (${url}) ${error}`
        );
        return error;
      });
  };

  fetchNouns = function(noun) {
    let url = APIURL + "/search/getAllForType?objType=" + noun;
    return fetch(url).then(response => response.json()).catch(function(error) {
      console.log(
        `There has been a problem with your fetch operation: (${url}) ${error}`
      );
      return error;
    });
  };
}

export default new API();
