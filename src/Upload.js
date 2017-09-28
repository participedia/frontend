import React from "react";
import { FormattedMessage } from "react-intl";
import DropzoneS3Uploader from "./react-dropzone-s3-uploader";
import api from "./utils/api";
import authService from "./utils/AuthService";
import { injectIntl } from "react-intl";
import CheckCircle from "material-ui/svg-icons/action/check-circle";
import AddToPhotos from "material-ui/svg-icons/image/add-to-photos";

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
    let checkmark = <div />;
    let progress = <div />;
    if (!done) {
      progress = (
        <progress
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            maxWidth: "100%",
            maxHeight: "100%"
          }}
          max="100"
          value={this.props.progress}
        />
      );
    }
    if (!this.props.started) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            marginLeft: "33%",
            marginTop: "33%"
          }}
        >
          <AddToPhotos
            color="grey"
            hoverColor="red"
            style={{
              width: "33%",
              height: "33%"
            }}
          />
        </div>
      );
    } else {
      if (done) {
        checkmark = (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              marginLeft: "33%",
              marginTop: "33%"
            }}
          >
            <CheckCircle
              color="lightgreen"
              style={{
                width: "33%",
                height: "33%"
              }}
            />
          </div>
        );
      }
      return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <div style={{ maxWidth: "100%", maxHeight: "80%" }}>
            <img
              alt=""
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                maxWidth: "100%",
                maxHeight: "100%"
              }}
              src={blob}
            />
            {progress}
            {checkmark}
          </div>
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
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = authService;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  handleFinishedUpload(args) {
    // if addToList is specified, then we clear out the uploader. If not,
    // we display the happy checkmark.
    const { dispatch, profile } = this.props;
    this.setState({
      hidePic: false,
      done: true,
      started: this.props.addToList ? false : true,
      progress: 0
      // preview: args.file.preview
    });
    if (this.props.onChange) {
      this.props.onChange(args.filename);
    }
    if (this.props.updatePicture) {
      // dispatch(
        api.updateUserMetaData(profile.user_id, {
          customPic: `${UPLOADS_CDN_URL}cropped-to-square/${args.filename}`
        })
      // );
    }
    if (this.props.addToList) {
      this.props.addToList(args.filename);
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
    const { isAuthenticated } = authService;
    if (!isAuthenticated()) {
      return (
        <div>
          <FormattedMessage id="sorry_upload" />
        </div>
      );
    }
    const token = authService.getToken();
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
          className={this.props.customClass}
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

export default injectIntl(Upload);
