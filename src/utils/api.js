// This is the JS API to talk to api.participedia.xyz
import queryString from "query-string";
import authService from "./AuthService";
import store from "store";
import Raven from "raven-js";
import emojiStrip from "emoji-strip";

let APIURL = process.env.REACT_APP_API_URL; // eslint-disable-line no-undef

if (!APIURL) {
  console.error(
    "No API URL was found. REACT_APP_API_URL should be set in environment variables."
  );
}

const signedFetch = function(url, opts={}) {
  // Set some sensible defaults
  opts.method = opts.method || "get";
  opts.headers = opts.headers || {};
  opts.headers["Accept"] = opts.headers["Accept"] || "application/json";
  opts.headers["Content-Type"] = opts.headers["Content-Type"] || "application/json";
  // We usually want to pass JSON
  if (opts.body) opts.body = JSON.stringify(opts.body);

  // Fetch with query params
  if(opts.queryParams && Object.keys(opts.queryParams).length > 0){
    let querystring = queryString.stringify(opts.queryParams);
    url += "?" + querystring;
  }

  let profile = store.get("profile");
  if (profile) {
    profile = JSON.parse(profile);
    if (authService.isAuthenticated()) {
      opts["headers"]["Authorization"] = "Bearer " + authService.getToken();
      opts["headers"]["X-Auth0-Name"] = emojiStrip(profile.name);
      opts["headers"]["X-Auth0-UserId"] = profile.user_id;
    }
    // console.log("doing signed call to", url);
  } else {
    // console.log("doing unsigned call to", url);
    delete opts["headers"]["authorization"];
  }
  return fetch(url, opts);
};

class API {
  secureFetch = signedFetch;

  fetchGeoJSON = function(countryCode) {
    let url = APIURL + "/countries/" + countryCode + ".geo.json";
    return signedFetch(url)
      .then(response => response.json())
      .catch(function(error) {
        console.error(
          `There has been a problem with your fetch operation: (${url}) ${error}`
        );
        return error;
      });
  };

  countsByCountry = function() {
    let url = APIURL + "/case/countsByCountry";
    return signedFetch(url)
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

  performSearch = function(queryParams) {
    let url = APIURL + "/search";
    return signedFetch(url, {queryParams: queryParams})
      .then(response => response.json())
      .catch(function(error) {
        console.log(
          `There has been a problem with your fetch operation: (${url}) ${error}`
        );
        return error;
      });
  };

  fetchCaseById = function(caseId) {
    let url = APIURL + "/case/" + caseId;
    return signedFetch(url)
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
    // console.log("saveNewThing", thingType, obj);
    if (
      thingType !== "case" &&
      thingType !== "method" &&
      thingType !== "organization"
    ) {
      let error = `Can only create cases, methods, and organizations. You sent: ${thingType}`;
      console.error(error);
      throw error;
    }
    let url = APIURL + "/" + thingType + "/new";
    // console.log("sending object", obj);
    return signedFetch(url, {method: "POST", body: obj})
      .then(response => response.json())
      .then(function(response) {
        if (!response.OK) {
          console.log("Error doing saveNewThing's signedFetch: ", response);
          throw response.error;
        }
        // console.log("got response", response);
        return response.data;
      })
      .then(function(json) {
        // console.log("GOT JSON", json);
        obj.id = json.thingid;
        return obj;
      })
      .catch(function(error) {
        if (error) {
          let errorMsg = `There has been a problem with saving the ${thingType}: (${url}) ${JSON.stringify(
            error
          )}`;

          Raven.captureMessage(
            "error doing signedfetch " +
              JSON.stringify(obj) +
              " -> " +
              errorMsg,
            {
              level: "error"
            }
          );
          console.error(errorMsg);
          // throw error; XXX OIDP
        }
      });
  };

  saveThing = function(thingType, obj) {
    let url = APIURL + `/${thingType}/${obj.id}`;

    // console.log("saving", JSON.stringify(obj));
    delete obj.updated_date; // feels silly to have to do that.

    return signedFetch(url, {method: "PUT", body: obj})
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
          Raven.captureMessage(
            "error in signed fetch sending: " + JSON.stringify(obj),
            {
              level: "error"
            }
          );

          console.error(
            `There has been a problem with saving the ${thingType}: (${url}) ${error}`
          );
          throw error;
        }
      });
  };

  fetchMethodById = function(methodId) {
    let url = APIURL + "/method/" + methodId;
    return signedFetch(url)
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
    return signedFetch(url)
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
    return signedFetch(url)
      .then(response => response.json())
      .catch(function(error) {
        console.log(
          `There has been a problem with your fetch operation: (${url}) ${error}`
        );
        return error;
      });
  };

  addBookmark = function(bookmarkType, thingid) {
    let url = APIURL + "/bookmark/add";
    return signedFetch(url, {method: "POST", body: { bookmarkType, thingid }})
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
    return signedFetch(url, {method: "delete", body: { bookmarkType, thingid }})
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
    return signedFetch(url)
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
    console.log(data, "data being sent");
    const url = `https://participedia.auth0.com/api/v2/users/${userId}`;
    return signedFetch(url, {method: "PATCH", body: payload}).then(response => {
      store.set("profile", JSON.stringify(response));
    });
  };

  saveUser = function(user) {
    let url = APIURL + `/user`;
    return signedFetch(url, {method: "post", body: user})
      .then(response => response.json())
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .catch(function(error) {
        console.log(
          `There has been a problem with API:fetchUser: (${url}) ${error}`
        );
        return error;
      });
  };

  fetchCitation = function(thingType, thingId, citationFormat) {
    let url = APIURL + "/citation/" + thingType + "/" + thingId;
    let opts = {
      headers: {
        "Citation-Format": citationFormat,
        "Accept": "*/*",
      },
    };
    return signedFetch(url, opts)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .catch(function(error) {
        console.log(
          `There has been a problem with API:fetchCitation: (${url}) ${error}`
        );
        return error;
      });
  }
}

export default new API();
