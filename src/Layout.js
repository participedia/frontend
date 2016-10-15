import React from 'react'
import {Link, browserHistory} from 'react-router'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import SearchQuery from './containers/SearchQuery'
import Footer from './components/Footer'
import LoginAvatar from './LoginAvatar'
/* eslint-disable no-unused-vars */
import globalStyles from './global.css'
/* eslint-enable no-unused-vars */
import './Layout.css'
import {injectIntl} from 'react-intl'

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
    let menuIcon = require('./img/menu-icon.png')
    let ppLogo = require('./img/pp-logo.png')
    let locale = this.props.intl.locale
    let home = `/${locale}/`

    return (
      <div>
        <div className='nav-bar-component'>
          <div className='nav-bar-wrapper'>
            <div className='logo-area'>
              <a href='#' onClick={this.handleToggle} className='menu-icon'><img src={menuIcon} alt='' /></a>
              <a href={home} className='logo'><img src={ppLogo} alt='' /></a>
            </div>
            <div className='search-box-area'>
              <img src={require('./img/search-icon.png')} className='searchIcon' alt='' />
              <SearchQuery />
            </div>
            <LoginAvatar auth={this.props.route.auth} className='login-area' />
          </div>
        </div>
        <div style={substyles.box}></div>
        <Drawer
          className='drawer'
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
          <MenuItem containerElement={<Link to={'/'+locale} />}
            onTouchTap={this.handleClose}>Home</MenuItem>
          <MenuItem containerElement={<Link to={'/'+locale+'/about'} />}
            onTouchTap={this.handleClose}>About</MenuItem>
          <MenuItem containerElement={<Link to={'/'+locale+'/teaching'} />}
            onTouchTap={this.handleClose}>Teaching</MenuItem>
          <MenuItem containerElement={<Link to={'/'+locale+'/profile'} />}
            onTouchTap={this.handleClose}>Profile</MenuItem>
          <MenuItem containerElement={<Link to={'/'+locale+'/add'} />}
            onTouchTap={this.handleClose}>Add New</MenuItem>
        </Drawer>
        <div className='contentArea'>
          {children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default injectIntl(Layout)
