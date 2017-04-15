import React from "react";
import { Link } from "react-router-dom";

const SearchLink = ({ tag, value, intl }) =>
  tag && value && intl
    ? <Link
        to={{
          pathname: "/search",
          query: { [tag]: value }
        }}
      >
        {value}
      </Link>
    : <div>{intl.formatMessage({ id: "not_specified" })}</div>;

export default SearchLink;
