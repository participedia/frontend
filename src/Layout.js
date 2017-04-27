import React from "react";
import { Route } from "react-router";
import { bool, object, func } from "prop-types";
import { Link, browserHistory } from "react-router-dom";
import Home from "./Home";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import SearchQuery from "./containers/SearchQuery";
import Footer from "./components/Footer/Footer";
import LoginAvatar from "./LoginAvatar";
import { connect } from "react-redux";
import { checkLogin } from "./actions";

import authService from "./utils/AuthService";
import ProfileLoader from "./containers/ProfileLoader";
import ProfileEditor from "./containers/ProfileEditor";
import HelpArticle from "./HelpArticle";
import About from "./About";
import Teaching from "./Teaching";
import Research from "./Research";
import Experiments from "./components/Experiments";
import Upload from "./Upload";
import Case from "./containers/Case";
import Organization from "./containers/Organization";
import Method from "./containers/Method";
import Add from "./components/Add/Add";
import {
  CaseEditorContainer,
  MethodEditorContainer,
  OrganizationEditorContainer
} from "./containers/EditorContainers";
import QuickSubmitPicker
  from "./components/QuickSubmitPicker/QuickSubmitPicker";
import {
  CaseForm,
  MethodForm,
  OrganizationForm,
  DatasetForm,
  SurveyForm
} from "./components/QuickSubmit/QuickSubmit";

/* eslint-disable no-unused-vars */
import globalStyles from "./global.css";
/* eslint-enable no-unused-vars */
import "./Layout.css";
import { injectIntl, intlShape } from "react-intl";
import menuIcon from "./img/menu-icon.png";
import ppLogo from "./img/pp-logo.png";
import myhistory from "./utils/history";

import "bootstrap/dist/css/bootstrap.min.css"; // XXX this is maybe avoidable by using reactstrap?

function requireAuth(nextState, replace) {
  if (!authService.loggedIn()) {
    authService.login(nextState.location.pathname);
  }
}

// This is a bit hacky (calling login() in a render()), but seems
// needed given how react-router-v4 works.
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={function(props) {
      let isAuth = authService.loggedIn();
      if (isAuth) {
        return <Component {...props} />;
      } else {
        authService.login(props.location.state);
        return <div>Must be logged in</div>;
      }
    }}
  />
);

function onSearch(pathname) {
  return pathname === "/" || pathname === "/search";
}

const ScrollToTop = props => {
  let wasSearch = onSearch(myhistory.location.pathname);
  let isSearch = onSearch(props.location.pathname);
  if (wasSearch && isSearch) {
    // we don't scroll if we were and still are on a search page.
    return null;
  }
  window.scrollTo(0, 0);
  return null;
};

class Routes extends React.Component {
  render() {
    return (
      <div className="contentArea">
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Home} />
        <Route component={ScrollToTop} />
        <Route path="/redirect" />
        <Route path="/profile" component={ProfileLoader} />
        <PrivateRoute
          path="/profile/edit"
          component={ProfileEditor}
          onEnter={requireAuth}
        />
        <Route path="/help/:id" component={HelpArticle} />
        <Route path="/about" component={About} />
        <Route path="/experiments" component={Experiments} />
        <Route path="/_upload" component={Upload} />
        <Route path="/teaching" component={Teaching} />
        <PrivateRoute
          exact
          path="/quick-submit"
          component={QuickSubmitPicker}
        />
        <PrivateRoute path="/quick-submit/case" component={CaseForm} />
        <PrivateRoute path="/quick-submit/method" component={MethodForm} />
        <PrivateRoute
          path="/quick-submit/organization"
          component={OrganizationForm}
        />
        <PrivateRoute path="/quick-submit/dataset" component={DatasetForm} />
        <PrivateRoute path="/quick-submit/survey" component={SurveyForm} />
        <Route path="/research" component={Research} />
        <Route exact path="/case/:nodeID" component={Case} />
        <PrivateRoute
          path="/case/:nodeID/edit"
          component={CaseEditorContainer}
          onEnter={requireAuth}
        />
        <Route exact path="/method/:nodeID" component={Method} />
        <PrivateRoute
          path="/method/:nodeID/edit"
          component={MethodEditorContainer}
          onEnter={requireAuth}
        />
        <Route exact path="/organization/:nodeID" component={Organization} />
        <PrivateRoute
          path="/organization/:nodeID/edit"
          component={OrganizationEditorContainer}
          onEnter={requireAuth}
        />
        <Route exact path="/users/:id" component={ProfileLoader} />
        <PrivateRoute exact path="/add" component={Add} onEnter={requireAuth} />
      </div>
    );
  }
}

export class Layout extends React.Component {
  static propTypes = {
    isAuthenticated: bool.isRequired,
    profile: object.isRequired,
    checkLogin: func.isRequired
  };
  constructor(props) {
    super(props);
    this.props.checkLogin(); // check is Auth0 lock is authenticating after login callback
    this.state = { open: false };
    this.setState = this.setState.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.touchTitle = this.touchTitle.bind(this);
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  touchTitle() {
    browserHistory.push("/");
  }

  render() {
    const { auth, profile, isAuthenticated } = this.props;
    let routes = <Routes />;
    return (
      <div>
        <div className="nav-bar-component">
          <div className="nav-bar-wrapper">
            <div className="logo-area">
              <a onClick={this.handleToggle} className="menu-icon">
                <img src={menuIcon} alt="" />
              </a>
              <Link to="/" className="logo">
                <img src={ppLogo} alt="Go Home" />
              </Link>
            </div>
            <div className="search-box-area">
              <SearchQuery {...this.props} />
            </div>
            <Link to="/quick-submit">
              <div className="createButton" />
            </Link>
            <LoginAvatar
              auth={auth}
              isAuthenticated={isAuthenticated}
              profile={profile}
              className="login-area"
            />
          </div>
        </div>
        <Drawer
          className="drawer"
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <MenuItem
            containerElement={<Link to={"/"} />}
            onTouchTap={this.handleClose}
          >
            {this.props.intl.formatMessage({ id: "home" })}
          </MenuItem>
          <MenuItem
            containerElement={<Link to={"/about"} />}
            onTouchTap={this.handleClose}
          >
            {this.props.intl.formatMessage({ id: "about" })}
          </MenuItem>
          <MenuItem
            containerElement={<Link to={"/teaching"} />}
            onTouchTap={this.handleClose}
          >
            {this.props.intl.formatMessage({ id: "teaching" })}
          </MenuItem>
          <MenuItem
            containerElement={<Link to={"/research"} />}
            onTouchTap={this.handleClose}
          >
            {this.props.intl.formatMessage({ id: "research" })}
          </MenuItem>
          <MenuItem
            containerElement={<Link to={"/profile"} />}
            onTouchTap={this.handleClose}
          >
            {this.props.intl.formatMessage({ id: "profile" })}
          </MenuItem>
          <MenuItem
            containerElement={<Link to={"/quick-submit"} />}
            onTouchTap={this.handleClose}
          >
            {this.props.intl.formatMessage({ id: "add_new" })}
          </MenuItem>
        </Drawer>
        {routes}
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkLogin: () => dispatch(checkLogin())
  };
};

function mapStateToProps({ auth }) {
  const { isAuthenticated, profile } = auth;
  return {
    auth,
    isAuthenticated,
    profile: profile || {}
  };
}

Layout.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Layout));
