import React from "react";
import { FormattedMessage } from "react-intl";

import { BrowserRouter } from "react-router-dom";
import { Route, Redirect } from "react-router";
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
import HelpBar from "./components/HelpBar/HelpBar";
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
import { injectIntl } from "react-intl";
// import menuIcon from "./img/menu-icon.png";
import MenuIcon from "material-ui/svg-icons/navigation/menu";

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

    return <div style={style}>Loading.</div>;
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authService.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        authService.login(props.location) || <div />
      )}
  />
);

export class Layout extends React.Component {
  static propTypes = {};
  constructor(props, context) {
    super(props);
    this.context = context;
    this.state = { open: false, showHelp: false };
    this.setState = this.setState.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.openHelp = this.openHelp.bind(this);
    this.closeHelp = this.closeHelp.bind(this);
    this.touchTitle = this.touchTitle.bind(this);
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  closeHelp() {
    this.setState({ showHelp: false });
  }

  openHelp() {
    this.setState({
      open: false,
      showHelp: true
    });
  }

  touchTitle() {
    this.props.history.push("/");
  }

  render() {
    const { intl } = this.props;
    let isAuthenticated = authService.isAuthenticated();

    const menuOpen = {
      width: 32,
      height: 32,
      fill: "grey"
    }

    const menuClosed = {
      width: 32,
      height: 32,
      fill: "white"
    }

    return (
      <BrowserRouter>
        <div>
          <div className="nav-bar-component">
            <div className="nav-bar-wrapper">
              <div className="logo-area">
                <a onClick={this.handleToggle} className="menu-icon">
                  <MenuIcon style={this.state.open ? menuOpen : menuClosed} />
                </a>
                <Link to="/" className="logo">
                  Participedia
                </Link>
              </div>
              <div className="search-box-area">
                {/* The next line is so that the searchquery has the route props */}
                <Route path="/" component={SearchQuery} />
              </div>
              <Link
                className="d-none d-sm-block d-md-block d-lg-block d-xl-block"
                to="/new"
              >
                <div className="createButton">
                  <FormattedMessage id="quick_submit" />
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
              <FormattedMessage id="home" />
            </MenuItem>
            <MenuItem
              containerElement={<Link to={"/about"} />}
              onTouchTap={this.handleClose}
            >
              <FormattedMessage id="about" />
            </MenuItem>
            <MenuItem
              containerElement={<Link to={"/teaching"} />}
              onTouchTap={this.handleClose}
            >
              <FormattedMessage id="teaching" />
            </MenuItem>
            <MenuItem
              containerElement={<Link to={"/research"} />}
              onTouchTap={this.handleClose}
            >
              <FormattedMessage id="research" />
            </MenuItem>
            <MenuItem onTouchTap={this.openHelp}>
              <FormattedMessage id="help_contact" />
            </MenuItem>
            <MenuItem className="d-md-none d-lg-none d-xl-none">
              {isAuthenticated ? (
                <div className="profileButtonMenu">
                  <FlatButton
                    containerElement={<Link to={"/profile"} />}
                    onClick={this.handleClose}
                    label={intl.formatMessage({ id: "profile" })}
                  />
                </div>
              ) : (
                <div className="loginButtonMenu">
                  <FlatButton
                    onClick={() => authService.login()}
                    onTouchTap={this.signIn}
                    label={intl.formatMessage({ id: "login" })}
                  />
                </div>
              )}
            </MenuItem>
            <MenuItem
              className="d-md-none d-lg-none d-xl-none"
              containerElement={<Link to={"/new"} />}
              onTouchTap={this.handleClose}
            >
              <div className="new">
                <FlatButton
                  label={intl.formatMessage({ id: "quick_submit" })}
                />
              </div>
            </MenuItem>
            {isAuthenticated ? (
              <MenuItem
                className="d-md-none d-lg-none d-xl-none"
                primaryText={this.props.intl.formatMessage({
                  id: "sign_out"
                })}
                onClick={() => authService.logout()}
              />
            ) : (
              undefined
            )}
          </Drawer>
          <div className="contentArea">
            <Route
              path="/redirect"
              render={props => {
                return <Callback {...props} />;
              }}
            />
            <Route exact path="/cases" component={Home} />
            <Route exact path="/methods" component={Home} />
            <Route exact path="/organizations" component={Home} />
            <Route
              path="/show/:term"
              render={props => (
                <Redirect to={`/search?query=${props.match.params.term}`} />
              )}
            />
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Home} />
            <Route component={ScrollToTop} />
            <Route exact path="/profile" component={ProfileLoader} />
            <PrivateRoute path="/profile/edit" component={ProfileEditor} />
            <Route path="/help/:id" component={HelpArticle} />
            <Route path="/about" component={About} />
            <Route path="/experiments" component={Experiments} />
            <Route path="/teaching" component={Teaching} />
            <PrivateRoute exact path="/new" component={QuickSubmitPicker} />
            <Route exact path="/new/case" component={NewCaseContainer} />
            <Route exact path="/new/method" component={NewMethodContainer} />
            <Route
              exact
              path="/new/organization"
              component={NewOrganizationContainer}
            />
            <Route path="/research" component={Research} />
            <Route path="/case/:nodeID" exact component={Case} />
            <Route path="/method/:nodeID" exact component={Method} />
            <Route
              path="/organization/:nodeID"
              exact
              component={Organization}
            />
            <PrivateRoute
              path="/case/:nodeID/edit"
              component={CaseEditorContainer}
            />
            <PrivateRoute
              path="/method/:nodeID/edit"
              component={MethodEditorContainer}
            />
            <PrivateRoute
              path="/organization/:nodeID/edit"
              component={OrganizationEditorContainer}
            />
            <Route path="/users/:id" component={ProfileLoader} />
          </div>
          <Footer onHelpOpen={this.openHelp} />
          {this.state.showHelp ? (
            <HelpBar
              onHelpClose={this.closeHelp}
              locale={this.props.intl.locale}
            />
          ) : (
            undefined
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default injectIntl(Layout);
