import React from "react";
import { Route, Redirect } from "react-router";
import { bool, object, func } from "prop-types";
import { Link } from "react-router-dom";
import Home from "./Home";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import SearchQuery from "./containers/SearchQuery";
import Footer from "./components/Footer/Footer";
import LoginAvatar from "./LoginAvatar";
import FlatButton from "material-ui/FlatButton";
import authService from "./utils/AuthService";
import ProfileLoader from "./containers/ProfileLoader";
import ProfileEditor from "./containers/ProfileEditor";
import HelpArticle from "./HelpArticle";
import About from "./About";
import Teaching from "./Teaching";
import Research from "./Research";
import Experiments from "./components/Experiments";
import Case from "./containers/Case";
import Organization from "./containers/Organization";
import Method from "./containers/Method";

import {
  CaseEditorContainer,
  MethodEditorContainer,
  OrganizationEditorContainer,
  NewCaseContainer,
  NewMethodContainer,
  NewOrganizationContainer
} from "./containers/EditorContainers";
import QuickSubmitPicker from "./components/QuickSubmitPicker/QuickSubmitPicker";

/* eslint-disable no-unused-vars */
import globalStyles from "./global.css";
/* eslint-enable no-unused-vars */
import "./Layout.css";
import { injectIntl, intlShape } from "react-intl";
import menuIcon from "./img/menu-icon.png";
import ppLogo from "./img/pp-logo.png";

import "./UniversalStyles.css";

function onSearch(pathname) {
  return pathname === "/" || pathname === "/search";
}

const ScrollToTop = props => {
  let wasSearch = onSearch(props.history.location.pathname);
  let isSearch = onSearch(props.location.pathname);
  if (wasSearch && isSearch) {
    // we don't scroll if we were and still are on a search page.
    return null;
  }
  window.scrollTo(0, 0);
  return null;
};

// const handleAuthentication = (nextState, replace) => {
//   if (/access_token|id_token|error/.test(nextState.location.hash)) {
//     authService.handleAuthentication(nextState.location.hash);
//   }
// };

class Callback extends React.Component {
  render() {
    const style = {
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "white"
    };

    return (
      <div style={style}>
        Loading.
      </div>
    );
  }
}

const EnsureAuth = props =>
  authService.isAuthenticated()
    ? <div />
    : <div>Must be logged in</div> &&
        authService.login(window.location.pathname);

class Routes extends React.Component {
  render() {
    let intl = this.props.intl;

    return (
      <div className="contentArea">
        <Route
          path="/redirect"
          render={props => {
            // handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
        <Route
          exact
          path="/cases"
          render={props => <Home auth={authService} />}
        />
        <Route
          exact
          path="/methods"
          render={props => <Home auth={authService} />}
        />
        <Route
          exact
          path="/organizations"
          render={props => <Home auth={authService} />}
        />
        <Route
          path="/show/:term"
          render={props =>
            <Redirect to={`/search?query=${props.match.params.term}`} />}
        />
        <Route exact path="/" render={props => <Home auth={authService} />} />
        <Route path="/search" render={props => <Home auth={authService} />} />
        <Route component={ScrollToTop} />
        <Route
          exact
          path="/profile"
          component={props => <ProfileLoader intl={intl} />}
        />
        <Route
          path="/profile/edit"
          render={props => <EnsureAuth auth={authService} />}
        />
        <Route
          path="/profile/edit"
          component={props =>
            <ProfileEditor intl={intl} auth={authService} {...props} />}
        />
        <Route path="/help/:id" component={HelpArticle} />
        <Route path="/about" component={About} />
        <Route path="/experiments" component={Experiments} />
        <Route path="/teaching" component={Teaching} />
        <Route
          path="/new"
          render={props => <EnsureAuth auth={authService} />}
        />
        <Route
          exact
          path="/new"
          render={props => <QuickSubmitPicker auth={authService} />}
        />
        <Route
          exact
          path="/new/case"
          component={props =>
            <NewCaseContainer auth={authService} intl={intl} {...props} />}
        />
        <Route
          exact
          path="/new/method"
          component={props =>
            <NewMethodContainer auth={authService} intl={intl} {...props} />}
        />
        <Route
          exact
          path="/new/organization"
          component={props =>
            <NewOrganizationContainer
              auth={authService}
              intl={intl}
              {...props}
            />}
        />
        <Route path="/research" component={Research} />
        <Route
          path="/case/:nodeID"
          exact
          component={props =>
            <Case auth={authService} intl={intl} {...props} />}
        />
        <Route path="/case/:nodeID/edit" component={EnsureAuth} />
        <Route
          path="/case/:nodeID/edit"
          component={props =>
            <CaseEditorContainer auth={authService} intl={intl} {...props} />}
        />
        <Route
          exact
          path="/method/:nodeID"
          component={props =>
            <Method auth={authService} intl={intl} {...props} />}
        />
        <Route path="/method/:nodeID/edit" component={EnsureAuth} />
        <Route
          path="/method/:nodeID/edit"
          component={props =>
            <MethodEditorContainer auth={authService} intl={intl} {...props} />}
        />
        <Route
          exact
          path="/organization/:nodeID"
          component={props =>
            <Organization auth={authService} intl={intl} {...props} />}
        />
        <Route path="/organization/:nodeID/edit" component={EnsureAuth} />
        <Route
          path="/organization/:nodeID/edit"
          component={props =>
            <OrganizationEditorContainer
              auth={authService}
              intl={intl}
              {...props}
            />}
        />
        <Route path="/users/:id" component={ProfileLoader} />
      </div>
    );
  }
}

export class Layout extends React.Component {
  static propTypes = {
    isAuthenticated: bool.isRequired,
    profile: object.isRequired,
    checkLogin: func,
    intl: intlShape.isRequired
  };
  constructor(props) {
    super(props);
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
    this.props.history.push("/");
  }

  render() {
    const { intl } = this.props;
    let routes = <Routes intl={intl} auth={authService} />;
    let isAuthenticated = authService.isAuthenticated();

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
            <Link className="d-none d-sm-block d-md-block d-lg-block d-xl-block" to="/new">
              <div className="createButton">
                {this.props.intl.formatMessage({ id: "quick_submit" })}
              </div>
            </Link>
            <LoginAvatar auth={authService} className="login-area" />
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
          <MenuItem className="d-md-none d-lg-none d-xl-none">
            {isAuthenticated
              ? <div className="profileButtonMenu">
                  <FlatButton
                    containerElement={<Link to={"/profile"} />}
                    onClick={this.handleClose}
                    label={this.props.intl.formatMessage({ id: "profile" })}
                  />
                </div>
              : <div className="loginButtonMenu">
                  <FlatButton
                    onClick={() => authService.login()}
                    onTouchTap={this.signIn}
                    label={this.props.intl.formatMessage({ id: "login" })}
                  />
                </div>}
          </MenuItem>
          <MenuItem
            className="d-md-none d-lg-none d-xl-none"
            containerElement={<Link to={"/new"} />}
            onTouchTap={this.handleClose}
          >
            <div className="new">
              <FlatButton
                label={this.props.intl.formatMessage({ id: "quick_submit" })}
              />
            </div>
          </MenuItem>
          {isAuthenticated
            ? <MenuItem
                className="d-md-none d-lg-none d-xl-none"
                primaryText={this.props.intl.formatMessage({ id: "sign_out" })}
                onClick={() => authService.logout()}
              />
            : undefined}
        </Drawer>
        {routes}
        <Footer />
      </div>
    );
  }
}

export default injectIntl(Layout);
