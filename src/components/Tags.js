import React from "react";
import PropTypes from "prop-types";

const Tags = ({ thing, intl }) =>
  thing.tags && thing.tags.length
    ? <div>
        <p className="sub-sub-heading">
          Tags:
        </p>
        <div className="tags">
          {thing.tags.map(tag => (
            <span>{tag}</span>
          ))}
        </div>
      </div>
    : <div />;

Tags.propTypes = {
  intl: PropTypes.object.isRequired,
  thing: PropTypes.object.isRequired
};

export default Tags;
