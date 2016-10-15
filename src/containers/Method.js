import React from 'react'
import './Case.css'
import Map from '../containers/Map'
import FloatingActionButton from 'material-ui/FloatingActionButton'
// import ContentPencil from 'material-ui/svg-icons/image/edit'
import api from '../utils/api'
import caseIconBookmark from '../img/pp-case-icon-bookmark.png'
import caseIconSettings from '../img/pp-case-icon-settings.png'
import caseIconFB from '../img/pp-case-icon-fb.png'
import caseIconTW from '../img/pp-case-icon-tw.png'
import caseIconShare from '../img/pp-case-icon-share.png'

class Method extends React.Component {
  componentWillMount () {
    let component = this
    api.fetchMethodById(this.props.params.nodeID).then(function (json) {
      let data = json['_source']
      let htmlBody = ''

      if (data.ArticleHTML) {
        htmlBody = data.ArticleHTML
      }
      component.setState({data: data, htmlBody: htmlBody})
    })
  }

  getInnerHTML () {
    let input = ''
    if (this.state && this.state.htmlBody) {
      input = this.state.htmlBody
    }
    return {__html: input}
  }

  render () {
    if (this.state && this.state.data) {
      let datumObj = this.state.data
      return (
        <div>
          <Map />
          <FloatingActionButton className='editButton' iconClassName='attach-file' />
          <div className='main-contents'>
            <div className='detailed-case-component'>
              <div className='sidebar'>
                <p className='sub-heading'>
                  Related Content
                </p>
                <div className='related-content'>
                  <a href='#'>Cases</a>
                  <a href='#'>Methods</a>
                  <a href='#'>Surveys</a>
                  <a href='#'>Datasets</a>
                </div>
              </div>
              <div className='main-area'>
                <div className='case-box'>
                  <div className='category'>
                    Method
                  </div>
                  <p className='case-title'>
                    {datumObj.Title}
                  </p>
                  <div className='case-html'
                    dangerouslySetInnerHTML={{__html: datumObj.ArticleHTML}} />
                </div>
                <div className='case-tools'>
                  <div className='top-icons'>
                    <a href='#'><img src={caseIconBookmark} alt='' /></a>
                    <a href='#'><img src={caseIconSettings} alt='' /></a>
                    <a href='#'><img src={caseIconFB} alt='' /></a>
                    <a href='#'><img src={caseIconTW} alt='' /></a>
                    <a href='#'><img src={caseIconShare} alt='' /></a>
                  </div>
                  <div className='bottom-icons'>
                    <a href='#'><img src='/img/pp-case-icon-edit.png' alt='' /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>)
    } else {
      return (<div></div>)
    }
  }
}

export default Method
