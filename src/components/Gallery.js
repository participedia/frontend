import React from "react";
import ImageGallery from "react-image-gallery";
import ReactPlayer from "react-player";
import caseIconFB from "../img/play.png";

// This component knows how to process a "thing" (case, method, etc) and extract the images
// and other data that the ImageGallery component needs.

function getPics(thing) {
  let awsUrl = process.env.REACT_APP_UPLOADS_CDN_URL;
  return thing && thing.images
    ? thing.images.map(img => awsUrl + encodeURIComponent(img))
    : [];
}

function getVids(thing) {
  return thing && thing.videos
    ? thing.videos
    : [];
}

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.defineImage = this.defineImage.bind(this);
    this.getWidth = this.getWidth.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.state = { pics: getPics(props.thing), videos: getVids(props.thing) };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ pics: getPics(nextProps.thing), videos: getVids(nextProps.thing)});
  }

  defineImage(url) {
    if (url) {
      let width = this.getWidth(url);
      if (width < 500) {
        return "portrait";
      } else {
        return "landscape";
      }
    } else {
      return;
    }
  }

  getWidth(url) {
    let img = new Image();
    img.src = url;
    return img.naturalWidth;
  }

  renderItem(item) {
    const imageClass = this.defineImage(item.original);
    if (item.embedUrl) {
      return (
      <div className="single-image">  
        <ReactPlayer
          width="100%"
          controls
          url={item.original}
        />
      </div>  
      );
    } else {
      return (
        <div className="single-image">
          <img
            className={imageClass}
            src={item.original}
            alt={item.originalAlt}
            srcSet={item.srcSet}
            sizes={item.sizes}
          />
        </div>
      );
    }
  }

  render() {
    const images = this.state.pics.map(photo => {
      const src = photo;
      return {
        original: src,
        thumbnail: src
      };
    });

    const videos = this.state.videos.map(video => {
      const src = video;
      return {
        original: src,
        thumbnail: caseIconFB,
        embedUrl: src,
      };
    });

    Array.prototype.push.apply(images, videos);

    if (images.length === 0) {
      return <div />;
    } else if (images.length > 1) {
      return (
        <ImageGallery
          items={images}
          showPlayButton={false}
          showVideo={true}
          showFullscreenButton={false}
          renderItem={this.renderItem}
          slideInterval={2000}
        />
      );
    } else {
      return this.renderItem(images[0]);
    }
  }
}

export default Gallery;
