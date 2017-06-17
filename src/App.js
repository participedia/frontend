import React from "react"; // eslint-disable-line

import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import es from "react-intl/locale-data/es";
import Layout from "./Layout";
import authService from "./utils/AuthService";
import { getFirstBrowserLanguage, getBestMatchingMessages } from "./utils/l10n";
import { BrowserRouter } from "react-router-dom";
import history from "./utils/history";

import Raven from "raven-js";

Raven.config(
  "https://0189b4df0dd54b6fa22f6202b7fb6c11@sentry.io/180779"
).install();

addLocaleData([...en, ...fr, ...es]);

export default class App extends React.Component {
  render() {
    let locale = getFirstBrowserLanguage();
    let messages = getBestMatchingMessages(locale);
    return (
      <IntlProvider locale={locale} messages={messages}>
        <BrowserRouter history={history}>
          <Layout history={history} auth={authService} />
        </BrowserRouter>
      </IntlProvider>
    );
  }
}
