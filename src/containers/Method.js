import React from "react";
import { injectIntl, intlShape } from "react-intl";
import api from "../utils/api";
import MethodDetails from "../components/MethodDetails";
import ItemFetcher from "./ItemFetcher";

export class Method extends React.Component {
  toggleFeatured(thing, featured) {
    thing.featured = featured;
    api.saveThing(thing.type, thing);
  }

  toggleHidden(thing, hidden) {
    thing.hidden = hidden;
    api.saveThing(thing.type, thing);
  }
  
  componentWillMount(){
    this.props.handleInternal();
  }

  render() {
    return (
      <ItemFetcher
        api={api.fetchMethodById}
        id={Number(this.props.match.params.nodeID)}
        details={MethodDetails}
        toggleFeatured={this.toggleFeatured.bind(this)}
        toggleHidden={this.toggleHidden.bind(this)}
        {...this.props}
      />
    );
  }
}

Method.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Method);
