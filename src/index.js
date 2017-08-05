import React, { Component } from "react"; // eslint-disable-line no-unused-vars
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import injectTapEventPlugin from "react-tap-event-plugin";

import App from "./App";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#323232"
  },
  datePicker: {
    selectColor: "#ec1414",
    headerColor: "#ec1414"
  },
  appBar: {}
});

injectTapEventPlugin();

function renderAll() {
  ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>,
    document.getElementById("root")
  );
}

renderAll();
