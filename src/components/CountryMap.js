import React from "react"; // eslint-disable-line no-unused-vars

class CountryMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { SVG: "" };
  }
  componentWillMount() {
    let component = this;
    // TODO move to country-specific bucket or at least folder
    if (this.props.countrycode && this.props.countrycode !== null) {
      fetch(
        process.env.REACT_APP_ASSETS_URL +
          "countries/fullname/" +
          this.props.countrycode +
          ".svg?"
      )
        .then(function(response) {
          return response.text();
        })
        .then(function(SVGtext) {
          component.setState({ SVG: SVGtext });
        });
    }
  }

  render() {
    return this.props.countrycode
      ? <div className="case-map">
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
