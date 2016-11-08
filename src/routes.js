import React from 'react'  // eslint-disable-line no-unused-vars

import { Route, IndexRedirect, IndexRoute } from 'react-router'

import Home from './Home'
import Layout from './Layout'
import Profile from './Profile'
import ProfileEditor from './containers/ProfileEditor'
import HelpArticle from './HelpArticle'
import About from './About'
import Teaching from './Teaching'
import Research from './Research'
import Upload from './Upload'
import Case from './containers/Case'
import Organization from './containers/Organization'
import Method from './containers/Method'
import Add from './components/Add'
import EditCase from './containers/EditCase'

var getFirstBrowserLanguage = function () {
  var nav = window.navigator
  var browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage']
  var i, language

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(nav.languages)) {
    for (i = 0; i < nav.languages.length; i++) {
      language = nav.languages[i]
      if (language && language.length) {
        return language
      }
    }
  }

  // support for other well known properties in browsers
  for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
    language = nav[browserLanguagePropertyKeys[i]]
    if (language && language.length) {
      return language
    }
  }

  return null
}

import localesJSON from '../public/locales.json'
var locales = Object.keys(localesJSON)

function buildRoutes () {
  var routes = []
  locales.forEach(function (locale) {
    routes.push(
      <Route key={locale} path={locale} component={Layout}>
        <IndexRoute component={Home} />
        <Route path='profile/edit' component={ProfileEditor} />
        <Route path='profile' component={Profile} />
        <Route path='help/:id' component={HelpArticle} />
        <Route path='about' component={About} />
        <Route path='_upload' component={Upload} />
        <Route path='teaching' component={Teaching} />
        <Route path='research' component={Research} />
        <Route path='case/:nodeID'>
          <IndexRoute component={Case} />
          <Route path='edit' component={EditCase} />
        </Route>
        <Route path='method/:nodeID' component={Method} />
        <Route path='organization/:nodeID' component={Organization} />
        <Route path='add'>
          <IndexRoute component={Add}/>
        </Route>
      </Route>
    )
  })

  var userLocale = getFirstBrowserLanguage()

  routes.push(
    <IndexRedirect key='/' to={'/' + userLocale + '/'} />
  )
  return routes
}

// just need to handle / redirect now
export default (
  <Route path='/'>
    {buildRoutes()}
  </Route>
)
