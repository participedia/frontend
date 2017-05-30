import React from "react"; // eslint-disable-line

import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import es from "react-intl/locale-data/es";
import Layout from "./Layout";
import authService from "./utils/AuthService";
import { getFirstBrowserLanguage, getBestMatchingMessages } from "./utils/l10n";
import createBrowserHistory from "history/createBrowserHistory";
import { BrowserRouter } from "react-router-dom";

const history = createBrowserHistory();

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
