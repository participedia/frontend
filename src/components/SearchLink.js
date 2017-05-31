import React from "react";
import { Link } from "react-router-dom";

export default class SearchLink extends React.Component {
  render() {
    let { tag, value, intl } = this.props;
    console.log("VALUE", value);
    return tag && value && intl
      ? <Link
          to={{
            pathname: "/search",
            search: `?${tag}=${value}`
          }}
        >
          {value}
        </Link>
      : <div>{intl.formatMessage({ id: "not_specified" })}</div>;
  }
}
