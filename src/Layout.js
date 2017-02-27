import React, {PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import SearchQuery from './containers/SearchQuery'
import Footer from './components/Footer/Footer'
import LoginAvatar from './LoginAvatar'
import { connect } from 'react-redux'

/* eslint-disable no-unused-vars */
import globalStyles from './global.css'
/* eslint-enable no-unused-vars */
import './Layout.css'
import {injectIntl, intlShape} from 'react-intl'
import menuIcon from './img/menu-icon.png'
import ppLogo from './img/pp-logo.png'

import HelpBar from './components/HelpBar/HelpBar'

export class Layout extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    profile: PropTypes.object.isRequired
  }
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
  }

  handleClose () {
    this.setState({open: false})
  }

  touchTitle () {
    browserHistory.push('/')
  }

  render () {
    const { auth, profile, isAuthenticated } = this.props

    let children = null
    if (this.props.children && this.props.route) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth // sends auth instance from route to children
      })
    }
    let locale = this.props.intl.locale
    let home = `/${locale}/`

    return (
      <div>
        <div className='nav-bar-component'>
          <div className='nav-bar-wrapper'>
            <div className='logo-area'>
              <a href='#' onClick={this.handleToggle} className='menu-icon'><img src={menuIcon} alt='' /></a>
              <Link to={home} className='logo'><img src={ppLogo} alt='Go Home' /></Link>
            </div>
            <div className='search-box-area'>
              <SearchQuery />
            </div>
            <LoginAvatar auth={auth} isAuthenticated={isAuthenticated} profile={profile} className='login-area' />
          </div>
        </div>
        <Drawer
          className='drawer'
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
          <MenuItem containerElement={<Link to={'/'+locale} />}
            onTouchTap={this.handleClose}>{this.props.intl.formatMessage({id: 'home'})}</MenuItem>
          <MenuItem containerElement={<Link to={'/'+locale+'/about'} />}
            onTouchTap={this.handleClose}>{this.props.intl.formatMessage({id: 'about'})}</MenuItem>
          <MenuItem containerElement={<Link to={'/'+locale+'/teaching'} />}
            onTouchTap={this.handleClose}>{this.props.intl.formatMessage({id: 'teaching'})}</MenuItem>
          <MenuItem containerElement={<Link to={'/'+locale+'/research'} />}
            onTouchTap={this.handleClose}>{this.props.intl.formatMessage({id: 'research'})}</MenuItem>
          <MenuItem containerElement={<Link to={'/'+locale+'/profile'} />}
            onTouchTap={this.handleClose}>{this.props.intl.formatMessage({id: 'profile'})}</MenuItem>
          <MenuItem containerElement={<Link to={'/'+locale+'/quick-submit'} />}
            onTouchTap={this.handleClose}>{this.props.intl.formatMessage({id: 'add_new'})}</MenuItem>
          <MenuItem containerElement={<Link to={this.props.location.pathname + '?help'} />}
            onTouchTap={this.handleClose}>{this.props.intl.formatMessage({id: 'help'})}</MenuItem>
        </Drawer>
        <div className='contentArea'>
          {children}
        </div>
        <Footer />
        {('help' in this.props.location.query)?<HelpBar currentPath={this.props.location.pathname} locale={this.props.intl.locale} />:null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  
  const { auth } = state
  const { isAuthenticated, profile } = auth
  return {
    auth,
    isAuthenticated,
    profile: profile || {}
  }
}

Layout.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(connect(mapStateToProps)(Layout))
