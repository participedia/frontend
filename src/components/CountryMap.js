import React from "react"; // eslint-disable-line no-unused-vars

class CountryMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { SVG: "" };
  }
  componentDidMount() {
    this._fetchMap(this.props.countrycode);
  }
  componentWillReceiveProps(nextProps) {
    this._fetchMap(nextProps.countrycode);
  }
  _fetchMap(countrycode) {
    let component = this;
    // TODO move to country-specific bucket or at least folder
    if (countrycode && countrycode !== null) {
      fetch(
        process.env.REACT_APP_ASSETS_URL +
          "countries/fullname/" +
          countrycode +
          ".svg"
      )
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error(response.statusText);
          }
          return response;
        })
        .then(response => response.text())
        .then(function(response) {
          component.setState({ SVG: response, error: null });
        })
        .catch(function(error) {
          component.setState({
            error,
            SVG: null
          });
        });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="d-none d-sm-block d-md-block d-lg-block d-xl-block case-map">
          Error loading map for {this.props.countrycode}
        </div>
      );
    } else {
      return this.props.countrycode
        ? <div className="d-none d-sm-block d-md-block d-lg-block d-xl-block case-map">
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
}

export default CountryMap;
