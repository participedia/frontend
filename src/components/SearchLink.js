import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

export default class SearchLink extends React.Component {
  render() {
    let { tag, value, intl } = this.props;
    // console.log("VALUE", value);
    // console.log("href", encodeURI(value));
    let href = `/search?${tag}=${value}`;
    return tag && value && intl ? (
      <Link className="tag" to={{ pathname: href }}>
        {value}
      </Link>
    ) : (
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
