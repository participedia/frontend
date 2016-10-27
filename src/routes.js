import React from 'react'  // eslint-disable-line no-unused-vars

import { Route, IndexRedirect, IndexRoute } from 'react-router'
// import AuthService from './utils/AuthService'

import Home from './Home'
import Layout from './Layout'
import Profile from './Profile'
import EditProfile from './EditProfile'
import HelpArticle from './HelpArticle'
import Login from './Login'
import About from './About'
import Teaching from './Teaching'
import Research from './Research'
import Case from './containers/Case'
import Organization from './containers/Organization'
import Method from './containers/Method'
import Add from './components/Add'
// import AddCase from './containers/AddCase'
import EditCase from './containers/EditCase'

import auth from './utils/AuthService'

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  console.log('in requireAuth', nextState)
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

import localesJSON from '../public/locales.json'
var locales = Object.keys(localesJSON)

// (removed from Profile for development)
// XXX move this to a configuration variable
// onEnter={requireAuth} 

function buildRoutes () {
  var routes = []
  console.log('in buildRoutes, auth=', auth)
  locales.forEach(function (locale) {
    routes.push(
      <Route auth={auth} key={locale} path={locale} component={Layout}>
        <IndexRoute component={Home} />
        <Route path='profile/edit' component={EditProfile} />
        <Route path='profile' component={Profile} />
        <Route path='help/:id' component={HelpArticle} />
        <Route path='login' component={Login} />
        <Route path='about' component={About} />
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
