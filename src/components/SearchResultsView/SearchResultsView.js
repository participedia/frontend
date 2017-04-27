import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import SearchHit from "../../components/SearchHit/SearchHit";
import SearchHitCategory
  from "../../components/SearchHitCategory/SearchHitCategory";
import { Container, Col } from "reactstrap";
import "./SearchResultsView.css";
import { injectIntl, intlShape } from "react-intl";
import preventDefault from "react-prevent-default";
import Chip from "material-ui/Chip";
import myhistory from "../../utils/history";
import queryString from "query-string";
import searchGridIcon from "../../img/pp-search-grid-icon.png";
import searchGridIconActive from "../../img/pp-search-grid-icon-active.png";
import searchListIcon from "../../img/pp-search-list-icon.png";
import searchListIconActive from "../../img/pp-search-list-icon-active.png";
import { ChasingDots } from "better-react-spinkit";

class LinkToSearch extends React.Component {
  render() {
    let { label, query, intl } = this.props;
    return (
      <div>
        <Link to={`/search?${queryString.stringify(query)}`}>
          {intl.formatMessage({ id: label })}
        </Link>
      </div>
    );
  }
}

class FeaturedSearches extends React.Component {
  render() {
    return (
      <div>
        <LinkToSearch
          label="mention_participatory_budgeting"
          query={{ query: "participatory budgeting" }}
          intl={this.props.intl}
        />
        <LinkToSearch
          label="tag_infrastructure"
          query={{ tag: "infrastructure" }}
          intl={this.props.intl}
        />
      </div>
    );
  }
}

class FilterArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chipData: props.data };
    this.styles = {
      chip: {
        margin: 4
      },
      wrapper: {
        display: "flex",
        flexWrap: "wrap"
      }
    };
  }

  handleRequestDelete = key => {
    let parameters = queryString.parse(myhistory.location.search);
    delete parameters[key];
    let newquerystring = queryString.stringify(parameters);
    myhistory.push(`/search?${newquerystring}`);
  };

  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    );
  }

  render() {
    return (
      <div style={this.styles.wrapper}>
        {this.state.chipData.map(this.renderChip, this)}
      </div>
    );
  }
}

const placeholderData = [
  {
    type: "case",
    hits: [
      {
        authors: [],
        body: "Sample case",
        case_id: 100000,
        title: "Case"
      },
      {
        authors: [],
        body: "Sample case",
        case_id: 100000,
        title: "Case"
      },
      {
        authors: [],
        body: "Sample case",
        case_id: 100000,
        title: "Case"
      },
      {
        authors: [],
        body: "Sample case",
        case_id: 100000,
        title: "Case"
      },
      {
        authors: [],
        body: "Sample case",
        case_id: 100000,
        title: "Case"
      },
      {
        authors: [],
        body: "Sample case",
        case_id: 100000,
        title: "Case"
      }
    ]
  }
];
export class SearchResultsView extends React.Component {
  constructor() {
    super();
    this.state = { value: "All" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.onCategoryChange.bind(this, event.target.value)();
  }

  render() {
    let categories = { case: [], organization: [], method: [], news: [] };
    let selectedViewType = this.props.selectedViewType;
    let { searching } = this.props;
    let data = placeholderData;
    if (!searching) {
      data = this.props.data;
    }

    data.forEach(function(batch) {
      let category = categories[batch.type];
      batch.hits.forEach(function(hit, index) {
        category.push(
          <SearchHit
            selectedViewType={selectedViewType}
            key={index}
            record={hit}
          />
        );
      });
    });

    let includeCases =
      this.props.selectedCategory === "All" ||
      this.props.selectedCategory === "Cases";
    let includeMethods =
      this.props.selectedCategory === "All" ||
      this.props.selectedCategory === "Methods";
    let includeNews =
      this.props.selectedCategory === "All" ||
      this.props.selectedCategory === "News";
    let includeOrgs =
      this.props.selectedCategory === "All" ||
      this.props.selectedCategory === "Organizations";

    let cases = includeCases ? categories["case"] : [];
    let methods = includeMethods ? categories["method"] : [];
    let orgs = includeOrgs ? categories["organization"] : [];
    let news = includeNews ? categories["news"] : [];
    let formatMessage = this.props.intl.formatMessage;

    let resultsCount =
      cases.length + methods.length + orgs.length + news.length;
    let results = "";
    let description = `Searched for:`;
    if (searching) {
      description = "Searching for:";
    }
    let restrictions = queryString.parse(myhistory.location.search);
    let filters = [];
    let searchTerm = "";
    Object.keys(restrictions).forEach(function(key, index) {
      if (key === "query") {
        searchTerm = restrictions[key];
      } else {
        filters.push({
          key: key,
          label: formatMessage({ id: key }) + " : " + restrictions[key]
        });
      }
    });

    results = (
      <div className="search-results">
        <div className="search-description">
          {searchTerm
            ? <div>
                {description} <div className="search-term">{searchTerm}</div>
              </div>
            : <div />}
          <FilterArray data={filters} />
        </div>
        <div className="result-count">
          <p>
            {resultsCount}&nbsp;
            {this.props.intl.formatMessage({
              id: "result" + (resultsCount === 1 ? "" : "s")
            })}
          </p>
          <div className="results-box">
            <SearchHitCategory
              title={this.props.intl.formatMessage({ id: "news" })}
              results={news}
            />
            <SearchHitCategory
              title={this.props.intl.formatMessage({ id: "cases" })}
              results={cases}
            />
            <SearchHitCategory
              title={this.props.intl.formatMessage({ id: "methods" })}
              results={methods}
            />
            <SearchHitCategory
              title={this.props.intl.formatMessage({
                id: "organizations"
              })}
              results={orgs}
            />
          </div>
        </div>
      </div>
    );
    return (
      <div className="main-contents">
        <Container className="search-results-component" fluid={true}>
          <Col md="3" className="sidepanel hidden-sm-down">
            <div
              className={
                "sorting-options" +
                  (this.state.sortingSelectionOpen ? " open-mobile-menu" : "")
              }
            >
              <p
                className="current-sorting-selection"
                onClick={() => {
                  this.setState({
                    sortingSelectionOpen: !this.state.sortingSelectionOpen
                  });
                }}
              >
                {this.props.intl.formatMessage({
                  id: this.props.sortingMethod
                })}
              </p>
              <div
                onClick={this.props.onSortingChange.bind(this, "featured")}
                className={
                  this.props.sortingMethod === "featured"
                    ? "selected"
                    : "unselected"
                }
              >
                {this.props.intl.formatMessage({ id: "featured" })}
              </div>
              <div
                onClick={this.props.onSortingChange.bind(this, "chronological")}
                className={
                  this.props.sortingMethod === "chronological"
                    ? "selected"
                    : "unselected"
                }
              >
                {this.props.intl.formatMessage({ id: "chronological" })}
              </div>
              <div
                onClick={this.props.onSortingChange.bind(this, "alphabetical")}
                className={
                  this.props.sortingMethod === "alphabetical"
                    ? "selected"
                    : "unselected"
                }
              >
                {this.props.intl.formatMessage({ id: "alphabetical" })}
              </div>
            </div>
            <div className="featured-searches-area">
              <div className="featured-searches-header">
                {this.props.intl.formatMessage({ id: "featured_searches" })}
              </div>
              <div className="featured-searches">
                <FeaturedSearches intl={this.props.intl} />
              </div>
            </div>
          </Col>
          <Col md="9">
            <div className="clearfix search-actions-area">
              <div className="filters hidden-xs-down">
                <div
                  onClick={() =>
                    preventDefault(this.props.onCategoryChange("All"))}
                  className={
                    this.props.selectedCategory === "All"
                      ? "selected"
                      : "unselected"
                  }
                >
                  {this.props.intl.formatMessage({ id: "all" })}
                </div>
                <div
                  onClick={() =>
                    preventDefault(this.props.onCategoryChange("News"))}
                  className={
                    this.props.selectedCategory === "News"
                      ? "selected"
                      : "unselected"
                  }
                >
                  {this.props.intl.formatMessage({ id: "news" })}
                </div>
                <div
                  onClick={() =>
                    preventDefault(this.props.onCategoryChange("Cases"))}
                  className={
                    this.props.selectedCategory === "Cases"
                      ? "selected"
                      : "unselected"
                  }
                >
                  {this.props.intl.formatMessage({ id: "cases" })}
                </div>
                <div
                  href="#"
                  onClick={() =>
                    preventDefault(this.props.onCategoryChange("Methods"))}
                  className={
                    this.props.selectedCategory === "Methods"
                      ? "selected"
                      : "unselected"
                  }
                >
                  {this.props.intl.formatMessage({ id: "methods" })}
                </div>
                <div
                  href="#"
                  onClick={() =>
                    preventDefault(
                      this.props.onCategoryChange("Organizations")
                    )}
                  className={
                    this.props.selectedCategory === "Organizations"
                      ? "selected"
                      : "unselected"
                  }
                >
                  {this.props.intl.formatMessage({ id: "organizations" })}
                </div>
              </div>
              <select
                className="mobile-select hidden-sm-up"
                value={this.state.value}
                onChange={this.handleChange}
              >
                <option value="All">
                  {this.props.intl.formatMessage({ id: "all" })}
                </option>
                <option value="News">
                  {this.props.intl.formatMessage({ id: "news" })}
                </option>
                <option value="Cases">
                  {this.props.intl.formatMessage({ id: "cases" })}
                </option>
                <option value="Methods">
                  {this.props.intl.formatMessage({ id: "methods" })}
                </option>
                <option value="Organizations">
                  {this.props.intl.formatMessage({ id: "organizations" })}
                </option>
              </select>
              <div className="view-types hidden-sm-down">
                <div
                  onClick={() =>
                    preventDefault(this.props.onLayoutChange("grid"))}
                  className={
                    this.props.selectedViewType === "grid"
                      ? "selected"
                      : "unselected"
                  }
                >
                  <img src={searchGridIcon} className="grid-icon" alt="" />
                  <img
                    src={searchGridIconActive}
                    className="grid-icon"
                    alt=""
                  />
                </div>
                <div
                  onClick={() =>
                    preventDefault(this.props.onLayoutChange("list"))}
                  className={
                    this.props.selectedViewType === "list"
                      ? "selected"
                      : "unselected"
                  }
                >
                  <img src={searchListIcon} className="list-icon" alt="" />
                  <img
                    src={searchListIconActive}
                    className="list-icon"
                    alt=""
                  />
                </div>
                <div onClick={this.props.startDownload.bind(this)}>
                  <img
                    src="../img/pp-search-dl-icon.png"
                    className="dl-icon"
                    alt=""
                  />
                </div>
              </div>
            </div>
            {results}
          </Col>
        </Container>
      </div>
    );
  }
}

SearchResultsView.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  sortingMethod: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  intl: intlShape.isRequired
};

let config = { allowMultiple: true };

export default injectIntl(SearchResultsView, config);
