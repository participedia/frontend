import Profile from '../src/Profile'
import Layout from '../src/Layout'
import Home from '../src/Home'
import Login from '../src/Login'
import Add from '../src/components/Add'
import AddCase from '../src/containers/AddCase'
import Timeline from '../src/containers/Timeline'
import Case from '../src/containers/Case'
import Method from '../src/containers/Method'
import AuthService from '../src/utils/AuthService'

/* eslint-disable no-undef */
const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__)
/* eslint-enable no-undef */

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const routeConfig = [
  { path: '/',
    component: Layout,
    auth: auth,
    indexRoute: {
      component: Home
    },
    childRoutes: [
      { path: 'profile',
        component: Profile,
        onEnter: requireAuth},
      { path: 'add',
        indexRoute: {
          component: Add
        },
        childRoutes: [{
          path: 'case',
          component: AddCase
        }
      ]},
      { path: 'login',
        component: Login},
      { path: 'case/:nodeID',
        component: Case},
      { path: 'method/:methodID',
        component: Method},
      { path: 'timeline',
        component: Timeline}
    ]}
]

module.exports = routeConfig
