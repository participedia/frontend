import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import injectTapEventPlugin from "react-tap-event-plugin";
import { App, store } from "./App";

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
