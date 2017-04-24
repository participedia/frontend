import React from "react"; // eslint-disable-line
import { withRouter } from "react-router";

import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import es from "react-intl/locale-data/es";
import Layout from "./Layout";
import { getFirstBrowserLanguage, getBestMatchingMessages } from "./utils/l10n";

addLocaleData([...en, ...fr, ...es]);

export default class App extends React.Component {
  render() {
    let locale = getFirstBrowserLanguage();
    let messages = getBestMatchingMessages(locale);
    let RoutedLayout = withRouter(Layout);
    return (
      <IntlProvider locale={locale} messages={messages}>
        <RoutedLayout />
      </IntlProvider>
    );
  }
}
