import React from 'react'
import styles from './Footer.css'
import CSSModules from 'react-css-modules'

function Footer () {
  let ppLogo = require('../../public/img/pp-logo.png')
  let ccIcon = require('../../public/img/cc-icon.png')
  return (
    <div styleName="footer-component">
      <div styleName="expanded-footer">
        <div styleName="column">
          <a href="#">About</a>
          <a href="#">Research</a>
          <a href="#">Teaching</a>
        </div>
        <div styleName="column">
          <a href="#">Cases</a>
          <a href="#">Methods</a>
          <a href="#">Organizations</a>
          <a href="#">Users</a>
        </div>
        <div styleName="column">
          <a href="#">News</a>
          <a href="#">Help</a>
          <a href="#">Contact</a>
        </div>
        <div styleName="column">
          <a styleName="social-icons" href="#"><img src={require('../../public/img/pp-social-fb.png')} alt="" /></a>
          <a styleName="social-icons" href="#"><img src={require('../../public/img/pp-social-tw.png')} alt="" /></a>
          <a styleName="social-icons" href="#"><img src={require('../../public/img/pp-social-rss.png')} alt="" /></a>
        </div>
      </div>
      <div styleName="copyright-area">
        <a href="/" styleName="logo"><img src={ppLogo} alt="" /></a>
        <p styleName="copyright-text">
          <img src={ccIcon} alt="" />Participedia 2016
        </p>
      </div>
    </div>
  )
}

export default CSSModules(Footer, styles)
