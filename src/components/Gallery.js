import React from "react";
import ImageGallery from "react-image-gallery";

// This component knows how to process a "thing" (case, method, etc) and extract the images
// and other data that the ImageGallery component needs.

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    let thing = props.thing;
    this.defineImage = this.defineImage.bind(this);
    this.getWidth = this.getWidth.bind(this);
    this.renderItem = this.renderItem.bind(this);

    let awsUrl = process.env.REACT_APP_ASSETS_URL;
    let theLength = "";
    let pics = [];
    if (thing && thing.lead_image) {
      pics.push(awsUrl + encodeURIComponent(thing.lead_image.url));
    }
    if (thing && thing.other_images.length) {
      theLength = thing.other_images;
      Object.keys(theLength).forEach(function(key) {
        let obj = theLength[key];
        pics.push(awsUrl + encodeURIComponent(obj.url));
      });
    }
    this.state = { pics };
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
      <div className="image-gallery-image">
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
