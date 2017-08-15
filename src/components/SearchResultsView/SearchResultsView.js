import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import SearchHit from "../../components/SearchHit/SearchHit";
import { Container, Col } from "reactstrap";
import FloatingActionButton from "material-ui/FloatingActionButton";
import IconButton from "material-ui/IconButton";
import DownloadButton from "material-ui/svg-icons/action/get-app";
import NavigateNextIcon from "material-ui/svg-icons/image/navigate-next";
import NavigatePreviousIcon from "material-ui/svg-icons/image/navigate-before";
import Plus from "material-ui/svg-icons/content/add";
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

  goNextPage() {
    let restrictions = queryString.parse(myhistory.location.search);
    let currentPage = restrictions["page"] || 1;
    currentPage++;
    restrictions["page"] = String(currentPage);
    let newSearch = queryString.stringify(restrictions);
    myhistory.push(myhistory.location.pathname + "?" + newSearch);
  }
  goPrevPage() {
    let restrictions = queryString.parse(myhistory.location.search);
    let currentPage = restrictions.page || 1;
    currentPage = Math.min(1, currentPage - 1);
    restrictions["page"] = String(currentPage);
    let newSearch = queryString.stringify(restrictions);
    myhistory.push(myhistory.location.pathname + "?" + newSearch);
  }

  render() {
    let { data, intl, pages, total } = this.props;

    let selectedViewType = this.props.selectedViewType;
    let searchresults = data.map(function(result, index) {
      return (
        <SearchHit
          selectedViewType={selectedViewType}
          key={index}
          record={result}
          intl={intl}
        />
      );
    });
    let formatMessage = this.props.intl.formatMessage;
    let addLink = "/new";
    let resultsCount = data.length;
    let { searching, query } = this.props;
    let results = "";
    let goNextPage = this.goNextPage.bind(this);
    let goPrevPage = this.goPrevPage.bind(this);
    if (this.props.searching) {
      results = (
        <div>
          <h3 className="searching-message">
            {formatMessage({ id: "searching_for" })}
            &nbsp;
            {query}
            {<div className="spinner" />}
          </h3>
        </div>
      );
    } else {
      let description = `for`;
      if (searching) {
        description = "for";
      }
      let restrictions = queryString.parse(myhistory.location.search);
      let filters = [];
      let pageNo = 1;
      let searchTerm = "";
      Object.keys(restrictions).forEach(function(key, index) {
        if (key === "query") {
          searchTerm = restrictions[key];
        } else if (key === "page") {
          pageNo = Number(restrictions[key]);
        } else {
          filters.push({
            key: key,
            label: formatMessage({ id: key }) + " : " + restrictions[key]
          });
        }
      });
      const on_first_page = pageNo === 1;
      const on_last_page = false;

      results = (
        <div className="search-results">
          <div className="search-description">
            {searchTerm
              ? <div className="search-description-text">
                  {resultsCount}&nbsp;
                  {this.props.intl.formatMessage({
                    id: "result" + (resultsCount === 1 ? "" : "s")
                  })}
                  {" "}
                  {this.props.intl.formatMessage({ id: "of" })}
                  {" "}
                  {total}
                  {" "}
                  {description} <div className="search-term">{searchTerm}</div>
                  {" ("}
                  {this.props.intl.formatMessage({ id: "page" })}
                  {" "}
                  {pageNo}
                  {" "}
                  {this.props.intl.formatMessage({ id: "of" })}
                  {" "}
                  {pages})
                  <div className="pagination">
                    <IconButton
                      disabled={on_first_page}
                      onTouchTap={goPrevPage}
                    >
                      <NavigatePreviousIcon />
                    </IconButton>
                    <IconButton disabled={on_last_page} onTouchTap={goNextPage}>
                      <NavigateNextIcon />
                    </IconButton>
                  </div>
                </div>
              : <div />}
            <FilterArray data={filters} />
          </div>
          <div className="result-count">
            <div className="results-box">
              {searchresults}
            </div>
            <div className="pagination">
              <IconButton disabled={on_first_page} onTouchTap={goPrevPage}>
                <NavigatePreviousIcon />
              </IconButton>
              <IconButton disabled={on_last_page} onTouchTap={goNextPage}>
                <NavigateNextIcon />
              </IconButton>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="main-contents">
        <Container className="search-results-component" fluid>
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
          <Col md="9" className="results-area">
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
                  <DownloadButton />
                </div>
              </div>
            </div>
            {results}
          </Col>
        </Container>
        <Link to={addLink}>
          <FloatingActionButton className="hidden-sm-up editButton">
            <Plus />
          </FloatingActionButton>
        </Link>
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
