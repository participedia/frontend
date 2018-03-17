import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import SearchHit from "../../components/SearchHit/SearchHit";
import { Container, Col, Row } from "reactstrap";
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
    let { label, query } = this.props;
    return (
      <div>
        <Link to={`/search?${queryString.stringify(query)}`}>
          <FormattedMessage id={label} />
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
        />
        <LinkToSearch
          label="tag_infrastructure"
          query={{ tag: "infrastructure" }}
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
    let parameters = queryString.parse(myhistory.location.search); // XXX this is likely wrong, should be props.location
    delete parameters[key];
    let newquerystring = queryString.stringify(parameters);
    myhistory.push(`/search?${newquerystring}`); // XXX wrong, should be a <Link> somewhere.
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
    this.state = { selectedCategory: "All" };
    this.handleChange = this.handleChange.bind(this);
  }

  //JOYRIDE
  // componentDidMount() {
  //   if (this.props.location.pathname === "/") {
  //     this.props.addSteps([
  //       {
  //         title: 'Filters',
  //         text: 'Describe filters here',
  //         selector: '.filters',
  //         position: 'top',
  //         style: {
  //           skip: {
  //             display: 'none',
  //           },
  //         },
  //       },
  //     ]);
  //   }
  // }
  //JOYRIDE

  handleChange(event) {
    let href = "";
    if (event.target.value === "All") {
      href = "/" + this.props.location.search;
    } else if (event.target.value === "Cases") {
      href = "/cases" + this.props.location.search;
    } else if (event.target.value === "Methods") {
      href = "/methods" + this.props.location.search;
    } else if (event.target.value === "Organizations") {
      href = "/organizations" + this.props.location.search;
    } else {
      return;
    }

    this.props.history.push(href);
  }

  make_href(bits, restrictions) {
    let new_restrictions = {};
    Object.keys(restrictions).forEach(function(key, index) {
      new_restrictions[key] = restrictions[key];
    });
    Object.keys(bits).forEach(function(key, index) {
      new_restrictions[key] = bits[key];
    });
    return "?" + queryString.stringify(new_restrictions);
  }

  render() {
    let { data, pages, total, intl } = this.props;

    let selectedViewType = this.props.selectedViewType;
    let searchresults = data.map(function(result, index) {
      return (
        <SearchHit
          selectedViewType={selectedViewType}
          key={index}
          count={index}
          record={result}
        />
      );
    });
    let formatMessage = this.props.intl.formatMessage;
    let addLink = "/new";
    let resultsCount = data.length;
    let { searching, query } = this.props;
    let results = "";
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
      let restrictions = queryString.parse(this.props.location.search);
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
      const on_last_page = pageNo === pages ? true : false;

      let nextPage = Math.min(pageNo + 1, total);
      restrictions["page"] = String(nextPage);
      let newSearch = queryString.stringify(restrictions);
      const next_href = this.props.location.pathname + "?" + newSearch;
      let prevPage = Math.max(1, pageNo - 1);
      restrictions["page"] = String(prevPage);
      newSearch = queryString.stringify(restrictions);
      const prev_href = this.props.location.pathname + "?" + newSearch;

      results = (
        <div className="search-results">
          <div className="search-description">
            <div className="search-description-text clearfix">
              {searchTerm ? (
                <div className="page-of">
                  {resultsCount}&nbsp;
                  <FormattedMessage
                    id={"result" + (resultsCount === 1 ? "" : "s")}
                  />{" "}
                  <FormattedMessage id="of" /> {total} {description}{" "}
                  <div className="search-term">{searchTerm}</div>
                  {" ("}
                  <FormattedMessage id="page" /> {pageNo}{" "}
                  <FormattedMessage id="of" /> {pages}
                  {")"}
                </div>
              ) : (
                <div className="page-of">
                  <span className="text-capitalize">
                    <FormattedMessage className="text-capitalize" id="page" />
                  </span>{" "}
                  {pageNo} {this.props.intl.formatMessage({ id: "of" })} {pages}
                </div>
              )}
              <div className="pagination">
                <IconButton
                  disabled={on_first_page}
                  containerElement={<Link to={prev_href} />}
                >
                  <NavigatePreviousIcon />
                </IconButton>
                <IconButton
                  disabled={on_last_page}
                  containerElement={<Link to={next_href} />}
                >
                  <NavigateNextIcon />
                </IconButton>
              </div>
            </div>
            <FilterArray data={filters} />
          </div>
          <Container fluid={true}>
            <Row className="results-box">{searchresults}</Row>
            <div className="pagination">
              <IconButton
                disabled={on_first_page}
                containerElement={<Link to={prev_href} />}
              >
                <NavigatePreviousIcon />
              </IconButton>
              <IconButton
                disabled={on_last_page}
                containerElement={<Link to={next_href} />}
              >
                <NavigateNextIcon />
              </IconButton>
            </div>
          </Container>
        </div>
      );
    }
    // let restrictions = queryString.parse(this.props.location.search);
    const cases_href = "/cases" + this.props.location.search;
    const methods_href = "/methods" + this.props.location.search;
    const organizations_href = "/organizations" + this.props.location.search;
    const all_href = "/" + this.props.location.search;

    return (
      <div className="main-contents">
        <Container className="search-results-component pb-3" fluid>
          <Col
            md="3"
            className="sidepanel d-none d-sm-none d-md-none d-lg-none d-xl-none"
          >
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
                <FormattedMessage id="featured" />
              </div>
              <div
                onClick={this.props.onSortingChange.bind(this, "chronological")}
                className={
                  this.props.sortingMethod === "chronological"
                    ? "selected"
                    : "unselected"
                }
              >
                <FormattedMessage id="chronological" />
              </div>
              <div
                onClick={this.props.onSortingChange.bind(this, "alphabetical")}
                className={
                  this.props.sortingMethod === "alphabetical"
                    ? "selected"
                    : "unselected"
                }
              >
                <FormattedMessage id="alphabetical" />
              </div>
            </div>
            <div className="featured-searches-area">
              <div className="featured-searches-header">
                <FormattedMessage id="featured_searches" />
              </div>
              <div className="featured-searches">
                <FeaturedSearches />
              </div>
            </div>
          </Col>
          <Col md="12" className="results-area">
            <div className="clearfix search-actions-area">
              <div className="filters d-none d-md-block d-lg-block d-xl-block">
                <div
                  className={
                    this.props.selectedCategory === "All"
                      ? "selected"
                      : "unselected"
                  }
                >
                  <Link to={all_href}>
                    <FormattedMessage id="all" />
                  </Link>
                </div>
                <div
                  className={
                    this.props.selectedCategory === "Cases"
                      ? "selected"
                      : "unselected"
                  }
                >
                  <Link to={cases_href}>
                    <FormattedMessage id="cases" />
                  </Link>
                </div>
                <div
                  className={
                    this.props.selectedCategory === "Methods"
                      ? "selected"
                      : "unselected"
                  }
                >
                  <Link to={methods_href}>
                    <FormattedMessage id="methods" />
                  </Link>
                </div>
                <div
                  className={
                    this.props.selectedCategory === "Organizations"
                      ? "selected"
                      : "unselected"
                  }
                >
                  <Link to={organizations_href}>
                    <FormattedMessage id="organizations" />
                  </Link>
                </div>
              </div>
              <select
                className="mobile-select d-md-none"
                value={this.props.selectedCategory}
                onChange={this.handleChange}
              >
                <option value="All">{intl.formatMessage({ id: "all" })}</option>
                <option value="Cases">
                  {intl.formatMessage({ id: "cases" })}
                </option>
                <option value="Methods">
                  {intl.formatMessage({ id: "methods" })}
                </option>
                <option value="Organizations">
                  {intl.formatMessage({ id: "organizations" })}
                </option>
              </select>
              <div className="view-types d-none d-md-block d-lg-block d-xl-block">
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
        <Link
          className="d-block d-sm-none d-md-none d-lg-none d-xl-none"
          to={addLink}
        >
          <FloatingActionButton secondary={true} className="addFAB">
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
