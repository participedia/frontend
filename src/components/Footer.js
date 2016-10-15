import React from 'react' // eslint-disable-line no-unused-vars
import './Footer.css'

function Footer () {
  let ppLogo = require('../img/pp-logo.png')
  let ccIcon = require('../img/cc-icon.png')
  return (
    <div className='footer-component'>
      <div className='expanded-footer'>
        <div className='column'>
          <a href='#'>About</a>
          <a href='#'>Research</a>
          <a href='#'>Teaching</a>
        </div>
        <div className='column'>
          <a href='#'>Cases</a>
          <a href='#'>Methods</a>
          <a href='#'>Organizations</a>
          <a href='#'>Users</a>
        </div>
        <div className='column'>
          <a href='#'>News</a>
          <a href='#'>Help</a>
          <a href='#'>Contact</a>
        </div>
        <div className='column'>
          <a className='social-icons' href='#'><img src={require('../img/pp-social-fb.png')} alt='' /></a>
          <a className='social-icons' href='#'><img src={require('../img/pp-social-tw.png')} alt='' /></a>
          <a className='social-icons' href='#'><img src={require('../img/pp-social-rss.png')} alt='' /></a>
        </div>
      </div>
      <div className='copyright-area'>
        <a href='/' className='logo'><img src={ppLogo} alt='' /></a>
        <p className='copyright-text'>
          <img src={ccIcon} alt='' />Participedia 2016
        </p>
      </div>
    </div>
  )
}

export default Footer
