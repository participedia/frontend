import React from "react"; // eslint-disable-line
import { Route, IndexRoute } from "react-router";
import { Router, browserHistory } from "react-router";
import { IntlProvider, addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import es from "react-intl/locale-data/es";
import locales from "../public/locales.json";
import { syncHistoryWithStore } from "react-router-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Home";
import Layout from "./Layout";
import Profile from "./Profile";
import ProfileEditor from "./containers/ProfileEditor";
import HelpArticle from "./HelpArticle";
import About from "./About";
import Teaching from "./Teaching";
import Research from "./Research";
import Upload from "./Upload";
import Case from "./containers/Case";
import Organization from "./containers/Organization";
import Method from "./containers/Method";
import Add from "./components/Add/Add";
import {
  CaseEditorContainer,
  MethodEditorContainer,
  OrganizationEditorContainer
} from "./containers/EditorContainers";
import QuickSubmitPicker
  from "./components/QuickSubmitPicker/QuickSubmitPicker";
import {
  CaseForm,
  MethodForm,
  OrganizationForm,
  DatasetForm,
  SurveyForm
} from "./components/QuickSubmit/QuickSubmit";
import authService from "./utils/AuthService";

addLocaleData([...en, ...fr, ...es]);

function requireAuth(nextState, replace) {
  if (!authService.loggedIn()) {
    authService.login(nextState.location.pathname);
  }
}

let getFirstBrowserLanguage = function() {
  let nav = window.navigator;
  let browserLanguagePropertyKeys = [
    "language",
    "browserLanguage",
    "systemLanguage",
    "userLanguage"
  ];
  let i = 0;
  let language = "";

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(nav.languages)) {
    for (let i = 0; i < nav.languages.length; i++) {
      let language = nav.languages[i];
      if (language && language.length) {
        return language;
      }
    }
  }

  // support for other well known properties in browsers
  for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
    language = nav[browserLanguagePropertyKeys[i]];
    if (language && language.length) {
      return language;
    }
  }

  return null;
};

function getBestMatchingMessages(locale) {
  if (locale in locales) {
    return locales[locale];
  }
  let [language] = locale.split("-");
  if (language in locales) {
    return locales[language];
  }
  return locales["en"];
}

const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component {
  render() {
    let locale = getFirstBrowserLanguage();
    let messages = getBestMatchingMessages(locale);
    return (
      <IntlProvider locale={locale} messages={messages}>
        <Router history={history}>
          <Route path="/" component={Layout}>
            <Route path="redirect" />
            <IndexRoute component={Home} />
            <Route
              path="profile/edit"
              component={ProfileEditor}
              onEnter={requireAuth}
            />
            <Route path="profile" component={Profile} />
            <Route path="help/:id" component={HelpArticle} />
            <Route path="about" component={About} />
            <Route path="search" component={Home} />
            <Route path="_upload" component={Upload} />
            <Route path="teaching" component={Teaching} />
            <Route path="quick-submit">
              <IndexRoute component={QuickSubmitPicker} />
              <Route path="case" component={CaseForm} />
              <Route path="method" component={MethodForm} />
              <Route path="organization" component={OrganizationForm} />
              <Route path="dataset" component={DatasetForm} />
              <Route path="survey" component={SurveyForm} />
            </Route>
            <Route path="research" component={Research} />
            <Route path="case/:nodeID">
              <IndexRoute component={Case} />
              <Route
                path="edit"
                component={CaseEditorContainer}
                onEnter={requireAuth}
              />
            </Route>
            <Route path="method/:nodeID">
              <IndexRoute component={Method} />
              <Route
                path="edit"
                component={MethodEditorContainer}
                onEnter={requireAuth}
              />
            </Route>
            <Route path="organization/:nodeID">
              <IndexRoute component={Organization} />
              <Route
                path="edit"
                component={OrganizationEditorContainer}
                onEnter={requireAuth}
              />
            </Route>
            <Route path="add">
              <IndexRoute component={Add} onEnter={requireAuth} />
            </Route>
          </Route>
        </Router>
      </IntlProvider>
    );
  }
}

module.exports = { App, store };
