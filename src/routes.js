import React from 'react'

import { Route, IndexRedirect, IndexRoute } from 'react-router'
import AuthService from './utils/AuthService'

import Home from './Home'
import Layout from './Layout'
import Profile from './Profile'
import Login from './Login'
import Case from './containers/Case'
import Method from './containers/Method'
import Add from './components/Add'
import AddCase from './containers/AddCase'

const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__)

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

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

var locales = Object.keys(require('../public/locales.json'))

function buildRoutes () {
  var routes = []
  locales.forEach(function (locale) {
    routes.push(
      <Route auth={auth} key={locale} path={locale} component={Layout}>
        <IndexRoute component={Home} />
        <Route path='profile' component={Profile} onEnter={requireAuth} />
        <Route path='login' component={Login} />
        <Route path='case/:nodeID' component={Case} />
        <Route path='method/:nodeID' component={Method} />
        <Route path='add' component={Add}>
          <Route path='case' component={AddCase} />
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

console.log(buildRoutes())

// just need to handle / redirect now
module.exports = (
  <Route path='/'>
    {buildRoutes()}
  </Route>
)
