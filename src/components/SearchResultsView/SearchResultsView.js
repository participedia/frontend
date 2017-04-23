import React from "react";
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
    // this.chipData = this.state.chipData;
    // const chipToDelete = this.chipData.map(chip => chip.key).indexOf(key);
    // this.chipData.splice(chipToDelete, 1);
    // this.setState({ chipData: this.chipData });
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
    let data = this.props.data;

    let categories = { case: [], organization: [], method: [], news: [] };
    let selectedViewType = this.props.selectedViewType;

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
    let query = this.props.query;
    let results = "";
    if (this.props.searching) {
      results = (
        <div>
          <h3>
            {formatMessage({ id: "searching_for" })}
            {" "}
            &nbsp;
            {query}
          </h3>
        </div>
      );
    } else {
      let description = `Searched for:`;
      let restrictions = queryString.parse(myhistory.location.search);
      let filters = [];
      let searchTerm = "";
      Object.keys(restrictions).forEach(function(key, index) {
        if (key == "q") {
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
            {description}
            {searchTerm
              ? <div className="search-term">{searchTerm}</div>
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
                title={this.props.intl.formatMessage({ id: "organizations" })}
                results={orgs}
              />
            </div>
          </div>
        </div>
      );
    }
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
              <a
                href="#"
                onClick={this.props.onSortingChange.bind(
                  this,
                  this.props.query,
                  this.props.selectedCategory,
                  "featured"
                )}
                className={
                  this.props.sortingMethod === "featured"
                    ? "selected"
                    : "unselected"
                }
              >
                {this.props.intl.formatMessage({ id: "featured" })}
              </a>
              <a
                href="#"
                onClick={this.props.onSortingChange.bind(
                  this,
                  this.props.query,
                  this.props.selectedCategory,
                  "chronological"
                )}
                className={
                  this.props.sortingMethod === "chronological"
                    ? "selected"
                    : "unselected"
                }
              >
                {this.props.intl.formatMessage({ id: "chronological" })}
              </a>
              <a
                href="#"
                onClick={this.props.onSortingChange.bind(
                  this,
                  this.props.query,
                  this.props.selectedCategory,
                  "alphabetical"
                )}
                className={
                  this.props.sortingMethod === "alphabetical"
                    ? "selected"
                    : "unselected"
                }
              >
                {this.props.intl.formatMessage({ id: "alphabetical" })}
              </a>
            </div>
          </Col>
          <Col md="9">
            <div className="clearfix search-actions-area">
              <div className="filters hidden-xs-down">
                <a
                  href="#"
                  onClick={preventDefault(
                    this.props.onCategoryChange.bind(this, "All")
                  )}
                  className={
                    this.props.selectedCategory === "All"
                      ? "selected"
                      : "unselected"
                  }
                >
                  {this.props.intl.formatMessage({ id: "all" })}
                </a>
                <a
                  href="#"
                  onClick={preventDefault(
                    this.props.onCategoryChange.bind(this, "News")
                  )}
                  className={
                    this.props.selectedCategory === "News"
                      ? "selected"
                      : "unselected"
                  }
                >
                  {this.props.intl.formatMessage({ id: "news" })}
                </a>
                <a
                  href="#"
                  onClick={preventDefault(
                    this.props.onCategoryChange.bind(this, "Cases")
                  )}
                  className={
                    this.props.selectedCategory === "Cases"
                      ? "selected"
                      : "unselected"
                  }
                >
                  {this.props.intl.formatMessage({ id: "cases" })}
                </a>
                <a
                  href="#"
                  onClick={preventDefault(
                    this.props.onCategoryChange.bind(this, "Methods")
                  )}
                  className={
                    this.props.selectedCategory === "Methods"
                      ? "selected"
                      : "unselected"
                  }
                >
                  {this.props.intl.formatMessage({ id: "methods" })}
                </a>
                <a
                  href="#"
                  onClick={preventDefault(
                    this.props.onCategoryChange.bind(this, "Organizations")
                  )}
                  className={
                    this.props.selectedCategory === "Organizations"
                      ? "selected"
                      : "unselected"
                  }
                >
                  {this.props.intl.formatMessage({ id: "organizations" })}
                </a>
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
                <a
                  href="#"
                  onClick={preventDefault(
                    this.props.onLayoutChange.bind(this, "grid")
                  )}
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
                </a>
                <a
                  href="#"
                  onClick={preventDefault(
                    this.props.onLayoutChange.bind(this, "list")
                  )}
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
                </a>
                <a href="#" onClick={this.props.startDownload.bind(this)}>
                  <img
                    src="../img/pp-search-dl-icon.png"
                    className="dl-icon"
                    alt=""
                  />
                </a>
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
  searching: PropTypes.bool.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onSortingChange: PropTypes.func.isRequired,
  onLayoutChange: PropTypes.func.isRequired,
  startDownload: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};

let config = { allowMultiple: true };

export default injectIntl(SearchResultsView, config);
