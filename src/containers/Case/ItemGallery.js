import React from "react";
import ImageGallery from "react-image-gallery";

class ItemGallery extends React.Component {
  constructor(props) {
    super(props);
    this.defineImage = this.defineImage.bind(this);
    this.getWidth = this.getWidth.bind(this);
    this.renderItem = this.renderItem.bind(this);
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
    const images = this.props.items.map(photo => {
      const src = photo;
      return {
        original: src,
        thumbnail: src
      };
    });
    if (images.length > 1) {
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

export default ItemGallery;
