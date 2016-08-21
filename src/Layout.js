import React from 'react'
import {Link, browserHistory} from 'react-router'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import SearchQuery from './containers/SearchQuery'
import Footer from './components/Footer'
import LoginAvatar from './LoginAvatar'
/* eslint-disable no-unused-vars */
import globalStyles from '!!style-loader!css-loader!../public/global.css'
/* eslint-enable no-unused-vars */
import styles from './Layout.sass'
import CSSModules from 'react-css-modules'

var substyles = {
  box: {
    // height: 64
  }
}

class Layout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {open: false}
    this.setState = this.setState.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.touchTitle = this.touchTitle.bind(this)
  }

  handleToggle () {
    console.log('in handleToggle, this is', this)
    console.log('in handleToggle, state is', this.state)
    this.setState({open: !this.state.open})
  };

  handleClose () {
    this.setState({open: false})
  }

  touchTitle () {
    browserHistory.push('/')
  }

  render () {
    let children = null
    if (this.props.children && this.props.route) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth // sends auth instance from route to children
      })
    }
    let menuIcon = require('../public/img/menu-icon.png')
    let ppLogo = require('../public/img/pp-logo.png')

    return (
      <div>
        <div styleName='nav-bar-component'>
          <div styleName='nav-bar-wrapper'>
            <div styleName='logo-area'>
              <a href='#' onClick={this.handleToggle} styleName='menu-icon'><img src={menuIcon} alt='' /></a>
              <a href='/' styleName='logo'><img src={ppLogo} alt='' /></a>
            </div>
            <div styleName='search-box-area'>
              <img src={require('../public/img/search-icon.png')} styleName='searchIcon' alt='' />
              <SearchQuery />
            </div>
            <LoginAvatar auth={this.props.route.auth} styleName='login-area' />
          </div>
        </div>
        <div style={substyles.box}></div>
        <Drawer
          styleName='drawer'
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
          <MenuItem containerElement={<Link to='/' />}
            onTouchTap={this.handleClose}>Home</MenuItem>
          <MenuItem containerElement={<Link to='/en-US/about' />}
            onTouchTap={this.handleClose}>About</MenuItem>
          <MenuItem containerElement={<Link to='/en-US/teaching' />}
            onTouchTap={this.handleClose}>Teaching</MenuItem>
          <MenuItem containerElement={<Link to='/en-US/profile' />}
            onTouchTap={this.handleClose}>Profile</MenuItem>
          <MenuItem containerElement={<Link to='/en-US/add' />}
            onTouchTap={this.handleClose}>Add New</MenuItem>
        </Drawer>
        <div styleName='contentArea'>
          {children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default CSSModules(Layout, styles)
