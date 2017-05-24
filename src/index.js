import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import injectTapEventPlugin from "react-tap-event-plugin";
import { ConnectedRouter } from "react-router-redux";

import App from "./App";
import store from "./store";
import myhistory from "./utils/history";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#3f51b2"
  },
  appBar: {}
});

injectTapEventPlugin();

function renderAll() {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <ConnectedRouter history={myhistory}>
          <App />
        </ConnectedRouter>
      </MuiThemeProvider>
    </Provider>,
    document.getElementById("root")
  );
}

renderAll();
