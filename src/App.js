import React from "react"; // eslint-disable-line

import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import es from "react-intl/locale-data/es";
import Layout from "./Layout";
import authService from "./utils/AuthService";
import { getFirstBrowserLanguage, getBestMatchingMessages } from "./utils/l10n";

addLocaleData([...en, ...fr, ...es]);

export default class App extends React.Component {
  render() {
    let locale = getFirstBrowserLanguage();
    let messages = getBestMatchingMessages(locale);
    let profile = authService.getProfile();
    console.log("GOT PROFILE", profile);
    const isAuthenticated = authService.loggedIn();
    let auth = { isAuthenticated, profile };
    return (
      <IntlProvider locale={locale} messages={messages}>
        <Layout
          auth={auth}
          profile={profile}
          isAuthenticated={isAuthenticated}
        />
      </IntlProvider>
    );
  }
}
