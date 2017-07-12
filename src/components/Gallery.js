import React from "react";
import ImageGallery from "react-image-gallery";

// This component knows how to process a "thing" (case, method, etc) and extract the images
// and other data that the ImageGallery component needs.

function getPics(thing) {
  let awsUrl = process.env.REACT_APP_UPLOADS_CDN_URL;
  return thing && thing.images
    ? thing.images.map(img => awsUrl + encodeURIComponent(img))
    : [];
}

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.defineImage = this.defineImage.bind(this);
    this.getWidth = this.getWidth.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.state = { pics: getPics(props.thing) };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ pics: getPics(nextProps.thing) });
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

  render() {
    const images = this.state.pics.map(photo => {
      const src = photo;
      return {
        original: src,
        thumbnail: src
      };
    });

    if (images.length === 0) {
      return <div />;
    } else if (images.length > 1) {
      return (
        <ImageGallery
          items={images}
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
