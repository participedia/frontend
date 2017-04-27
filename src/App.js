import React from "react"; // eslint-disable-line

import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import es from "react-intl/locale-data/es";
import Layout from "./Layout";
import { getFirstBrowserLanguage, getBestMatchingMessages } from "./utils/l10n";

addLocaleData([...en, ...fr, ...es]);

export default class App extends React.Component {
  componentWillUnmount() {
    console.log("App will unmount");
  }
  componentWillMount() {
    console.log("App will mount");
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    let locale = getFirstBrowserLanguage();
    let messages = getBestMatchingMessages(locale);
    return (
      <IntlProvider locale={locale} messages={messages}>
        <Layout />
      </IntlProvider>
    );
  }
}
