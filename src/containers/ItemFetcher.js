import React from "react";
import ItemDetails from "../components/ItemDetails/ItemDetails";
import { number, func } from "prop-types";

export default class ItemFetcher extends React.Component {
  componentDidMount() {
    let component = this;
    let props = this.props;
    props.api(props.id).then(function(data) {
      component.setState({
        data: data
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
  api: func,
  id: number
};
