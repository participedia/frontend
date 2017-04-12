// This is the JS API to talk to api.participedia.xyz
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
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  if (localStorage.profile) {
    let profile = JSON.parse(localStorage.profile);
    if (localStorage.getItem("id_token")) {
      opts["headers"]["Authorization"] = "Bearer " +
        localStorage.getItem("id_token");
    }
    opts["headers"]["X-Auth0-Name"] = profile.name;
    opts["headers"]["X-Auth0-UserId"] = profile.user_id;
  } else {
    delete opts["headers"]["authorization"];
  }
  if (payload) opts.body = JSON.stringify(payload);
  return fetch(url, opts);
};

class API {
  secureFetch = signedFetch;

  fetchGeoJSON = function(countryCode) {
    let url = APIURL + "/countries/" + countryCode + ".geo.json";
    return fetch(url).then(response => response.json()).catch(function(error) {
      console.error(
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
        return json.data.countryCounts;
      })
      .catch(function(error) {
        console.error(
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
    return signedFetch(url, "get")
      .then(response => response.json())
      .then(json => json.data)
      .catch(function(error) {
        console.error(
          `There has been a problem with your fetch operation: (${url}) ${error}`
        );
        throw error;
      });
  };

  saveNewThing = function(thingType, caseObj) {
    if (
      thingType !== "case" &&
      thingType !== "method" &&
      thingType !== "organization"
    ) {
      let error = `Can only create cases, methods, and organizations. You sent: ${thingType}`;
      console.error(error);
      throw error;
    }

    let url = APIURL + "/" + thingType + "/new";
    return signedFetch(url, "POST", caseObj)
      .then(function(response) {
        if (!response.ok) {
          console.log("Error doing saveNewThing's signedFetch: ", response);
          throw Error(response.message);
        }
        return response.json();
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

  addBookmark = function(bookmarkType, thingID) {
    let url = APIURL + "/bookmark/add";
    return signedFetch(url, "POST", { bookmarkType, thingID })
      .then(response => response.json())
      .catch(function(error) {
        console.log(
          `There has been a problem with API:addBookmark: (${url}) ${error}`
        );
        return error;
      });
  };
  removeBookmark = function(bookmarkType, thingID) {
    let url = APIURL + "/bookmark/delete";
    return signedFetch(url, "delete", {
      bookmarkType,
      thingID
    })
      .then(response => response.json())
      .catch(function(error) {
        console.log(
          `There has been a problem with API:removeBookmark: (${url}) ${error}`
        );
        return error;
      });
  };
}

export default new API();
