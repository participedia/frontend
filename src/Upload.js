import React from 'react'
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'
import { connect } from 'react-redux'

const box = {
  margin: "1em",
  height: 200,
  maxHeight: "200px",
  maxWidth: "200px",
  border: 'dashed 2px #999',
  borderRadius: 5,
  position: 'relative',
  cursor: 'pointer',
}

let legend = {
  margin: "1em",
}

class Upload extends React.Component {
  handleFinishedUpload (args) {
    console.log("in handleFinishedUploads:", args)
  }

  render () {
    const { token, isAuthenticated } = this.props
    if (! isAuthenticated) {
      return (
        <div>
          Sorry, upload only works if you're logged in.
        </div>
      )
    }
    let style = {
      border: "none",
      width: "100%",
      height: "100%"
    }

    const uploaderProps = {
      style, 
      maxFileSize: 1024 * 1024 * 50,   // TODO move maxFilesize to a config file
      server: 'http://localhost:3001', // TODO move server config in upload to a config file 
      s3Url: 'http://uploads.participedia.xyz.s3-website-us-east-1.amazonaws.com',  // TODO move s3Url in upload to a config file 
      signingUrlHeaders: {
        'Authorization': 'Bearer ' + token
      }
    }

    return (
      <div style={box}>
        <DropzoneS3Uploader onFinish={this.handleFinishedUpload} {...uploaderProps}>
          <div style={legend}>
            Drop an image on here or click to select
          </div>
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

export default connect(mapStateToProps)(Upload)
