import React from "react";
import ItemDetails from "../components/ItemDetails/ItemDetails";
import { number, func, object } from "prop-types";

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
    let data = null;
    if (this.state && this.state.data) {
      data = this.state.data;
    }
    return <ItemDetails {...props} data={data} />;
  }
}

ItemFetcher.propTypes = {
  auth: object.isRequired,
  api: func,
  id: number
};
