import React from "react";
import PropTypes from "prop-types";

const Tags = ({ thing, intl }) =>
  thing.tags && thing.tags.length ? (
    <div>
      <p className="sub-sub-heading">Tags</p>
      <div className="tags blond">
        {thing.tags.map(
            (tag, index) => 
            index < thing.tags.length - 1 ? 
              <span key={tag}>{tag},</span>
            : 
              <span key={tag}>{tag}</span>
            
          )
        }
      </div>
    </div>
  ) : (
    <div />
  );

Tags.propTypes = {
  thing: PropTypes.object.isRequired
};

export default Tags;
