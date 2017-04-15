import React from "react";
import { connect } from "react-redux";
import { injectIntl, intlShape } from "react-intl";
import api from "../utils/api";
import MethodDetails from "../components/MethodDetails";
import ItemFetcher from "./ItemFetcher";

function mapStateToProps({ auth }) {
  const { isAuthenticated } = auth;

  return {
    isAuthenticated
  };
}

export class Method extends React.Component {
  render() {
    return (
      <ItemFetcher
        api={api.fetchMethodById}
        id={Number(this.props.match.params.nodeID)}
        details={MethodDetails}
        {...this.props}
      />
    );
  }
}

Method.propTypes = {
  intl: intlShape.isRequired
};

export default connect(mapStateToProps)(injectIntl(Method));
