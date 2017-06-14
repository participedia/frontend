// This is the JS API to talk to api.participedia.xyz
import queryString from "query-string";
import authService from "./AuthService";

let APIURL = process.env.REACT_APP_API_URL; // eslint-disable-line no-undef

if (!APIURL) {
  console.error(
    "No API URL was found. REACT_APP_API_URL should be set in environment variables."
  );
}

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
    if (authService.isAuthenticated()) {
      opts["headers"]["Authorization"] = "Bearer " + authService.getToken();
      opts["headers"]["X-Auth0-Name"] = profile.name;
      opts["headers"]["X-Auth0-UserId"] = profile.user_id;
    }
    // console.log("doing signed call to", url);
  } else {
    // console.log("doing unsigned call to", url);
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

  performSearch = function(queryArgs) {
    let querystring = queryString.stringify(queryArgs);
    let url = `${APIURL}/search?${querystring}`;
    // console.log("queryArgs", queryArgs);
    // console.log("DOING SEARCH", url);
    return fetch(url).then(response => response.json()).catch(function(error) {
      console.log(
        `There has been a problem with your fetch operation: (${url}) ${error}`
      );
      return error;
    });
  };

  searchMapTokens = function(search) {
    let url;
    if (search) {
      url = APIURL + `/search${search}&resultType=map`;
    } else {
      url = APIURL + `/search?resultType=map`;
    }
    return signedFetch(url, "get")
      .then(response => response.json())
      .then(json => json.results)
      .catch(function(error) {
        console.error(
          `There has been a problem with your fetch operation: (${url}) ${error}`
        );
        throw error;
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

  saveNewThing = function(thingType, obj) {
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
    return signedFetch(url, "POST", obj)
      .then(response => response.json())
      .then(function(response) {
        if (!response.OK) {
          console.log("Error doing saveNewThing's signedFetch: ", response);
          throw response.error;
        }
        return response.data;
      })
      .then(function(json) {
        // console.log("GOT JSON", json);
        obj.id = json[thingType + "_id"]; // will this break when API changes?
        return obj;
      })
      .catch(function(error) {
        if (error) {
          console.error(
            `There has been a problem with saving the ${thingType}: (${url}) ${error}`
          );
          throw error;
        }
      });
  };

  saveThing = function(thingType, obj) {
    let url = APIURL + `/${thingType}/${obj.id}`;

    // console.log("saving", obj);
    delete obj.updated_date; // feels silly to have to do that.

    return signedFetch(url, "PUT", obj)
      .then(response => response.json())
      .then(function(response) {
        if (!response.OK) {
          console.log("Error doing saveThing's signedFetch: ", response);
          throw response.error;
        }
        // console.log("RESPONSE", response);
        return response.data;
      })
      .catch(function(error) {
        if (error) {
          console.error(
            `There has been a problem with saving the ${thingType}: (${url}) ${error}`
          );
          throw error;
        }
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

  addBookmark = function(bookmarkType, thingid) {
    let url = APIURL + "/bookmark/add";
    return signedFetch(url, "POST", { bookmarkType, thingid })
      .then(response => response.json())
      .catch(function(error) {
        console.log(
          `There has been a problem with API:addBookmark: (${url}) ${error}`
        );
        return error;
      });
  };
  removeBookmark = function(bookmarkType, thingid) {
    let url = APIURL + "/bookmark/delete";
    return signedFetch(url, "delete", {
      bookmarkType,
      thingid
    })
      .then(response => response.json())
      .catch(function(error) {
        console.log(
          `There has been a problem with API:removeBookmark: (${url}) ${error}`
        );
        return error;
      });
  };
  fetchUser = function(userId) {
    let url = APIURL + `/user`;
    if (userId) {
      url = APIURL + `/user/${userId}`;
    }
    return signedFetch(url, "get")
      .then(response => response.json())
      .catch(function(error) {
        console.log(
          `There has been a problem with API:fetchUser: (${url}) ${error}`
        );
        return error;
      });
  };

  updateUserMetaData = function(userId, data) {
    const payload = { user_metadata: data };
    const url = `https://participedia.auth0.com/api/v2/users/${userId}`;
    return signedFetch(url, "PATCH", payload).then(response => {
      localStorage.setItem("profile", JSON.stringify(response));
    });
  };
}

export default new API();
