import _ from 'lodash';
import React from 'react';

class Image extends React.PureComponent {

  render() {
    var {
      height,
      width,
      href,
      source,
      src,
      border
    } = this.props;

    return (
      <div
        className="image fill"
        style={{
          height,
          width,
          border: border,
          backgroundImage: `url(${href || source || src})`
        }}
      />
    );
  }

};

Image.defaultProps = {
  height: "100%",
  width: "100%",
}

export default Image;