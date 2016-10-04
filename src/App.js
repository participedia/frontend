import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { IntlProvider, addLocaleData } from 'react-intl'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
var routeConfig = require('./routes')
import {Router, browserHistory} from 'react-router'
import { Provider } from 'react-redux'
import locales from '../public/locales.json'

var configureStore = require('./configureStore')
var store = configureStore()

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#3f51b2'
  },
  appBar: {
  }
})

import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import es from 'react-intl/locale-data/es'

addLocaleData([...en, ...fr, ...es])

function createElement (Component, props) {
  var locale = window.location.pathname.split('/')[1]
  var messages = locales[locale]

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Component {...props} />
    </IntlProvider>
  )
}

// XXX test on Safari
//
// if (!window.Intl) {
//   require.ensure(['intl'], (require) => {
//     window.Intl = require('intl')
//     runApp()
//   }, 'IntlBundle')
// } else {
//   runApp()
// }

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Router createElement={createElement} history={browserHistory} routes={routeConfig} />
        </MuiThemeProvider>
      </Provider>
    )
  }
}
