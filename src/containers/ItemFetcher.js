import React from "react";
import ItemDetails from "../components/ItemDetails/ItemDetails";
import { intlShape } from "react-intl";
import { number, func } from "prop-types";

export default class ItemFetcher extends React.Component {
  componentDidMount() {
    let component = this;
    let props = this.props;
    props.api(props.id).then(function(data) {
      component.setState({
        data: data,
        isAuthenticated: props.isAuthenticated
      });
    });
  }
  render() {
    let props = this.props;
    if (this.state && this.state.data) {
      return <ItemDetails {...props} data={this.state.data} />;
    } else {
      return <div>No data yet</div>;
    }
  }
}

ItemFetcher.propTypes = {
  intl: intlShape.isRequired,
  api: func,
  id: number
};
