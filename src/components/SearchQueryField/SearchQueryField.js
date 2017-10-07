import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import "./SearchQueryField.css";

class SearchQueryField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: this.props.query }; // is there another way?
    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ query: nextProps.query });
  }

  //joyride
  // componentDidMount() {
  //   const steps = [
  //     {
  //       title: 'Search',
  //       text: 'Explain search here.',
  //       selector: '.search-bar',
  //       position: 'top',
  //       type: 'hover',
  //     },
  //     // {
  //     //   title: 'Search',
  //     //   text: 'Quickly find cases, methods and organizations.',
  //     //   selector: '.card-tasks',
  //     //   position: 'top',
  //     //   type: 'hover',
  //     // },
  //     // {
  //     //   title: '3-Advance customization',
  //     //   text: 'You can set individual styling options for beacons and tooltips. <br/>To advance click `NEXT` inside the hole.',
  //     //   selector: '.cxard-tickets',
  //     //   position: 'top',
  //     //   // allowClicksThruHole: true,
  //     //   style: {
  //     //     mainColor: '#ec1414',
  //     //     header: {
  //     //       color: '#ec1414',
  //     //     },
  //     //   },
  //     // },
  //   ];
  //   this.props.addSteps(steps);
  // }

  handleClick = (e) => {
    e.preventDefault();
    const { next } = this.props;

    next();
  }
  //joyride ends

  onChange(event) {
    this.setState({ query: event.target.value });
  }

  onKeyUp(val) {
    if (val.keyCode === 13) {
      this.props.onPerformQuery(
        this.state.query,
        this.props.selectedCategory,
        this.props.sortingMethod
      );
    }
  }

  render() {
    let onChange = this.onChange;
    return (
      <input
        className="search-bar"
        type="text"
        placeholder={this.props.intl.formatMessage({ id: "search" })}
        value={this.state.query}
        onChange={onChange}
        onKeyUp={val => this.onKeyUp(val)}
      />
    );
  }
}

SearchQueryField.propTypes = {
  onPerformQuery: PropTypes.func.isRequired,
  query: PropTypes.string
};

export default injectIntl(SearchQueryField);
