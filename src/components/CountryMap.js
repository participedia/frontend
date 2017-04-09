import React from "react"; // eslint-disable-line no-unused-vars

class CountryMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { SVG: "" };
  }
  componentWillMount() {
    let component = this;
    // TODO move to country-specific bucket or at least folder
    console.log("this.props");
    if (this.props.countrycode && this.props.countrycode !== null) {
      fetch(process.env.REACT_APP_ASSETS_URL + this.props.countrycode + ".svg")
        .then(function(response) {
          return response.text();
        })
        .then(function(SVGtext) {
          let svg = '<svg class="country-map" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1"><defs><style type="text/css"><![CDATA[.country-map path {stroke: none;fill: #d8382c;}]]></style></defs>' +
            SVGtext +
            "</svg>";
          component.setState({ SVG: svg });
        });
    }
  }

  render() {
    return this.props.countrycode
      ? <div>
          <div dangerouslySetInnerHTML={{ __html: this.state.SVG }} />
          {this.props.city
            ? <p className="case-location">
                {this.props.city}, {this.props.countrycode}
              </p>
            : <p className="case-location">{this.props.countrycode}</p>}
        </div>
      : <div />;
  }
}

export default CountryMap;
