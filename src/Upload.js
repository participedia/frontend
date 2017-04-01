import React from "react";
import DropzoneS3Uploader from "./react-dropzone-s3-uploader";
import { connect } from "react-redux";
import { updateUserMetaData } from "./actions";
import { injectIntl } from "react-intl";
import CheckCircle from "material-ui/svg-icons/action/check-circle";

const S3BUCKET_URL = process.env.REACT_APP_UPLOADS_S3_BUCKET;
const UPLOADS_CDN_URL = process.env.REACT_APP_UPLOADS_CDN_URL;

const box = {
  margin: "1em",
  height: 200,
  maxHeight: "200px",
  maxWidth: "200px",
  border: "dashed 2px #999",
  borderRadius: 5,
  position: "relative",
  cursor: "pointer"
};

class Preview extends React.Component {
  render(props) {
    let blob = this.props.preview;
    let done = this.props.done;
    let progress = done
      ? <div>
          <CheckCircle />
        </div>
      : <div><progress max="100" value={this.props.progress} /></div>;
    if (!this.props.started) {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          Drop here
        </div>
      );
    } else {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <div style={{ maxWidth: "100%", maxHeight: "80%" }}>
            <img
              alt=""
              style={{ maxWidth: "100%", maxHeight: "100%" }}
              src={blob}
            />
          </div>
          {progress}
        </div>
      );
    }
  }
}

class Upload extends React.Component {
  constructor() {
    super();
    this.state = {
      hidePic: false,
      started: false,
      done: false,
      preview: ""
    };
  }

  handleFinishedUpload(args) {
    const { dispatch, profile } = this.props;
    this.setState({
      hidePic: false,
      done: true,
      progress: 0,
      preview: args.file.preview
    });
    if (this.props.updatePicture) {
      dispatch(
        updateUserMetaData(profile.user_id, {
          customPic: `${UPLOADS_CDN_URL}cropped-to-square/${args.filename}`
        })
      );
    }
  }

  handleProgress(progress, textState, file) {
    this.setState({
      started: true,
      preview: file.preview,
      progress: progress
    });
  }

  render() {
    const { token, isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return (
        <div>
          {this.props.intl.formatMessage({ id: "sorry_upload" })}
        </div>
      );
    }

    const uploaderProps = {
      style: this.props.customStyle ? this.props.customStyle : box,
      server: process.env.REACT_APP_API_URL,
      signingUrlHeaders: {
        Authorization: "Bearer " + token
      }
    };

    const preview = this.state.preview;
    const progress = this.state.progress;
    const done = this.state.done;
    const started = this.state.started;
    return (
      <div className={this.state.hidePic ? "hide" : undefined}>
        <DropzoneS3Uploader
          s3Url={S3BUCKET_URL}
          onProgress={this.handleProgress.bind(this)}
          onFinish={this.handleFinishedUpload.bind(this)}
          upload={uploaderProps}
        >
          <Preview
            preview={preview}
            progress={progress}
            done={done}
            started={started}
          />
        </DropzoneS3Uploader>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default injectIntl(connect(mapStateToProps)(Upload));
