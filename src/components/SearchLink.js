import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

export default class SearchLink extends React.Component {
  render() {
    let { tag, value } = this.props;
    let href = `/search?${tag}=${value}`;
    if (tag && value)
      return (
        <Link className="tag" to={{ pathname: href }}>
          {value}
        </Link>
      );
    return (
      <div>
        <FormattedMessage id="not_specified" />
      </div>
    );
  }
}

/* ? <Link
          to={{
            pathname: "/search",
            search: `?${tag}=${value}`
          }}
        >
          {value}
        </Link>*/
