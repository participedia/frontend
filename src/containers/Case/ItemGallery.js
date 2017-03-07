import React from 'react';
import ImageGallery from 'react-image-gallery';

class ItemGallery extends React.Component {

  render() {

    const images = this.props.items.map((photo) => {
      const src = photo;
      return ({
        original: src,
        thumbnail: src,
      });
    });

    return (
      <ImageGallery
        items={images}
        showFullscreenButton={false}
        slideInterval={2000} />
    );
  }

}

export default ItemGallery;
