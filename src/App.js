import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
var routeConfig = require('./routes')
import {Router, browserHistory} from 'react-router'
import { Provider } from 'react-redux'
// import style from './style.css'

var configureStore = require('./configureStore')
var store = configureStore()

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    textColor: 'white',
    primary1Color: '#3f51b2'
  },
  appBar: {
    // height: 50,
  }
})

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Router history={browserHistory} routes={routeConfig} />
        </MuiThemeProvider>
      </Provider>
    )
  }
}
