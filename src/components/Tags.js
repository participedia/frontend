import React, { PropTypes } from "react";
import SearchLink from "../components/SearchLink";

const Tags = ({ thing, intl }) =>
  thing.tags && thing.tags.length
    ? <div>
        <p className="sub-sub-heading">
          Tags:
        </p>
        <div className="tags">
          {thing.tags.map(tag => (
            <SearchLink intl={intl} key={tag} tag="tag" value={tag} />
          ))}
        </div>
      </div>
    : <div />;

Tags.propTypes = {
  intl: PropTypes.object.isRequired,
  thing: PropTypes.object.isRequired
};

export default Tags;
