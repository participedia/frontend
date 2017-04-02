import React, { PropTypes, Component } from "react"; // eslint-disable-line no-unused-vars
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import queryString from "query-string";
import Auth0 from "auth0-js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
// import "bootstrap/dist/css/bootstrap.min.css";
import injectTapEventPlugin from "react-tap-event-plugin";
import { App, store } from "./App";

let auth0 = new Auth0({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID
});
let parsed = queryString.parse(window.location.hash);
if (parsed.access_token) {
  localStorage.setItem("access_token", parsed.access_token);
  localStorage.setItem("id_token", parsed.id_token);
}
let access_token = localStorage.getItem("access_token");
if (access_token) {
  auth0.getUserInfo(access_token, function(err, profile) {
    if (err) {
      console.log("error getting profile", err);
    } else {
      localStorage.setItem("profile", JSON.stringify(profile));
    }
  });
}

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#3f51b2"
  },
  appBar: {}
});

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
