import React from "react"; // eslint-disable-line
import routeConfig from "./routes";
import { Router, browserHistory } from "react-router";
import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import es from "react-intl/locale-data/es";
import locales from "../public/locales.json";
import { syncHistoryWithStore } from "react-router-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

addLocaleData([...en, ...fr, ...es]);

function createElement(Component, props) {
  let locale = window.location.pathname.split("/")[1];
  let messages = locales[locale];

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Component {...props} />
    </IntlProvider>
  );
}

const history = syncHistoryWithStore(browserHistory, store);

export class App extends React.Component {
  render() {
    return (
      <Router
        createElement={createElement}
        history={history}
        routes={routeConfig}
      />
    );
  }
}

module.exports = { App, store };
