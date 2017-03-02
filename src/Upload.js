import React from 'react'
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'
import { connect } from 'react-redux'
import { updateUserMetaData } from './actions'
import {injectIntl} from 'react-intl'

const S3BUCKET_URL = process.env.REACT_APP_UPLOADS_S3_BUCKET

const box = {
  margin: '1em',
  height: 200,
  maxHeight: '200px',
  maxWidth: '200px',
  border: 'dashed 2px #999',
  borderRadius: 5,
  position: 'relative',
  cursor: 'pointer',
}

class Upload extends React.Component {
  constructor() {
    super();
    this.state = {
      hidePic: false,
    };
  }

  handleFinishedUpload (args) {
    console.log("in handleFinishedUpload", args)
    const { dispatch, profile } = this.props
    if (this.props.updatePicture) {
      dispatch(updateUserMetaData(profile.user_id, 
        { 'customPic': `${S3BUCKET_URL}/${args.filename}` }))
      this.setState({hidePic: true})
    }
  }

  render () {
    const { token, isAuthenticated } = this.props
    if (! isAuthenticated) {
      return (
        <div>
          {this.props.intl.formatMessage({id: 'sorry_upload'})}
        </div>
      )
    }

    const uploaderProps = {
      style: this.props.customStyle ? this.props.customStyle : box, 
      maxFileSize: 1024 * 1024 * 50,   // TODO move maxFilesize to a config file
      server: process.env.REACT_APP_API_URL, 
      s3Url: S3BUCKET_URL, 
      signingUrlHeaders: {
        'Authorization': 'Bearer ' + token
      }
    }

    return (
      <div className={(this.state.hidePic) ? 'hide' : undefined}>
        <DropzoneS3Uploader onFinish={this.handleFinishedUpload.bind(this)} {...uploaderProps}>
          { this.props.updatePicture ? 
            <span>Change</span>
            :
            undefined
          }
        </DropzoneS3Uploader>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default injectIntl(connect(mapStateToProps)(Upload))
