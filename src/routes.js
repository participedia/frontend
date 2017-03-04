import React from "react"; // eslint-disable-line no-unused-vars

import { Route, IndexRedirect, IndexRoute } from "react-router";

import Home from "./Home";
import Layout from "./Layout";
import Profile from "./Profile";
import ProfileEditor from "./containers/ProfileEditor";
import HelpArticle from "./HelpArticle";
import About from "./About";
import Teaching from "./Teaching";
import Research from "./Research";
import Upload from "./Upload";
import Case from "./containers/Case/Case";
import Organization from "./containers/Organization";
import Method from "./containers/Method";
import Add from "./components/Add/Add";
import EditCase from "./containers/EditCase";
import QuickSubmitPicker
  from "./components/QuickSubmitPicker/QuickSubmitPicker";
import {
  CaseForm,
  MethodForm,
  OrganizationForm,
  DatasetForm,
  SurveyForm
} from "./components/QuickSubmit/QuickSubmit";
import queryString from "query-string";

let getFirstBrowserLanguage = function() {
  let nav = window.navigator;
  let browserLanguagePropertyKeys = [
    "language",
    "browserLanguage",
    "systemLanguage",
    "userLanguage"
  ];
  let i, language;

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(nav.languages)) {
    for (i = 0; i < nav.languages.length; i++) {
      language = nav.languages[i];
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

let onRedirect = function() {
  let parsedParams = queryString.parse(window.location.hash);
  let path = JSON.parse(parsedParams.state).pathname;
  window.location.replace(path);
};

import localesJSON from "../public/locales.json";
let locales = Object.keys(localesJSON);

function buildRoutes() {
  let routes = [];
  locales.forEach(function(locale) {
    routes.push(
      <Route key={locale} path={locale} component={Layout}>
        <IndexRoute component={Home} />
        <Route path="profile/edit" component={ProfileEditor} />
        <Route path="profile" component={Profile} />
        <Route path="help/:id" component={HelpArticle} />
        <Route path="about" component={About} />
        <Route path="redirect" onEnter={onRedirect} />
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
          <Route path="edit" component={EditCase} />
        </Route>
        <Route path="method/:nodeID" component={Method} />
        <Route path="organization/:nodeID" component={Organization} />
        <Route path="add">
          <IndexRoute component={Add} />
        </Route>
      </Route>
    );
  });

  let userLocale = getFirstBrowserLanguage();

  routes.push(<IndexRedirect key="/" to={"/" + userLocale + "/"} />);
  return routes;
}

// just need to handle / redirect now
export default (
  <Route path="/">
    {buildRoutes()}
  </Route>
);
