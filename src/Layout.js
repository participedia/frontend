import React from "react";
import { FormattedMessage } from "react-intl";
import { Router } from "react-router-dom";
import { Route, Redirect } from "react-router";
import { Link } from "react-router-dom";
import Home from "./Home";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import AddIcon from "material-ui/svg-icons/content/add";
import SearchQuery from "./containers/SearchQuery";
import Footer from "./components/Footer/Footer";
import LoginAvatar from "./LoginAvatar";
import FlatButton from "material-ui/FlatButton";
import authService from "./utils/AuthService";
import ProfileLoader from "./containers/ProfileLoader";
import ProfileEditor from "./containers/ProfileEditor";
import HelpArticle from "./HelpArticle";
import history from "./history";
import HelpBar from "./components/HelpBar/HelpBar";
import About from "./About";
import Teaching from "./Teaching";
import Research from "./Research";
import Legal from "./Legal";
import Experiments from "./components/Experiments";
import Case from "./containers/Case";
import Organization from "./containers/Organization";
import Method from "./containers/Method";
import Joyride from "react-joyride";
import store from "store";
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

class PrivateRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          authService.isAuthenticated() ? (
            <Component {...props} handleInternal={this.props.handleInternal} />
          ) : (
            authService.login(props.location) || <div />
          )}
      />
    );
  }
}

export class Layout extends React.Component {
  static propTypes = {};

  constructor(props, context) {
    super(props);
    this.state = {
      open: false,
      showHelp: false,
      // joyride states
      joyrideOverlay: true,
      joyrideType: "continuous",
      isRunning: store.get("tutorial-was-shown") ? false : true,
      stepIndex: 0,
      steps: [],
      selector: ""
    };
    this.setState = this.setState.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseHome = this.handleCloseHome.bind(this);
    this.openHelp = this.openHelp.bind(this);
    this.closeHelp = this.closeHelp.bind(this);
    this.touchTitle = this.touchTitle.bind(this);
    this.showTourFromHelp = this.showTourFromHelp.bind(this);
    this.goHomeFromHelp = this.goHomeFromHelp.bind(this);
    //joyride
    this.handleInternal = this.handleInternal.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.callback = this.callback.bind(this);
    this.next = this.next.bind(this);
  }

  handleInternal() {
    this.setState({
      isRunning: false
    });
  }

  handleHome() {
    this.setState({
      isRunning: store.get("tutorial-was-shown") ? false : true
    });
  }

  next() {
    this.joyride.next();
  }

  callback(data) {
    if (data.type === "step:before" && data.index === 2) {
      store.set("tutorial-was-shown", true);
    }
  }

  handleToggle() {
    this.setState({
      open: !this.state.open,
      isRunning:
        this.state.open && !store.get("tutorial-was-shown") ? true : false
    });
  }

  handleClose() {
    this.setState({
      open: false,
      isRunning: false
    });
  }

  handleCloseHome() {
    this.setState({
      open: false,
      isRunning: !store.get("tutorial-was-shown") ? true : false
    });
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

  showTourFromHelp() {
    this.setState({
      isRunning: true
    });
    this.closeHelp();
  }

  goHomeFromHelp() {
    store.remove("tutorial-was-shown")
    history.push('/');
  }

  touchTitle() {
    this.props.history.push("/");
  }

  render() {
    const { intl } = this.props;
    const {
      isRunning,
      joyrideOverlay,
      joyrideType,
      selector,
      stepIndex
    } = this.state;
    let isAuthenticated = authService.isAuthenticated();

    const menuOpen = {
      width: 32,
      height: 32,
      fill: "grey"
    };

    const menuClosed = {
      width: 32,
      height: 32,
      fill: "white"
    };

    const steps = [
      {
        title: "Search",
        text:
          "<p>Conduct a site-wide search using one or more keywords.<p/><p>You can do an advanced search using common syntax like “and”, “or”, and “not”, as well as quotations and parentheses.</p><p>For example,<code>bicycle or rally</code> will match items with either or both words.<p>",
        selector: ".search-bar",
        position: "left",
        isFixed: true,
      },
      {
        title: "Map",
        text:
          "The map shows cases and organizations around the world. Your search results are represented by red pins. Double click to zoom in. Select any pin to find out more about a Case or Organization. Note, methods don’t appear on the map because they’re not location specific.",
        selector: ".map-component",
        position: "left",
      },
      {
        title: "Sort",
        text:
          "Sort the results by content type such as cases, methods or organizations.",
        selector: ".filters",
        position: "bottom",
      },
      {
        title: "Quick Submit",
        text:
          "Quick submit allows you to enter some basic information about a public participation case, method or organization in just minutes. You can then publish your entry as is, or click “do full version” if you have more details to add.",
        selector: ".qs-button-case",
        position: "top",
        isFixed: true
      },
      {
        title: "Read",
        text:
          "Open any case, method or organization to read about it and see what data has been entered.",
        selector: ".result0",
        position: "top"
      },
      {
        title: "Bookmark",
        text:
          "Bookmark content to review it later. Find your bookmarks on your profile page.",
        selector: ".result0 .bookmark",
        position: "top"
      },
      {
        title: "Feedback",
        text:
          "Use the feedback button to suggest improvements or if something on the website isn’t working properly. Include your email address if you would like to be contacted about your feedback.<br/><p class='pt-4'>This is the end of the tour. You can restart it from Help & Contact.</p>",
        selector: "#feedback",
        isFixed: true,
        position: "top"
      }
    ];

    return (
      <Router history={history}>
        <div>
          <Joyride
            ref={c => (this.joyride = c)}
            callback={this.callback}
            debug={false}
            disableOverlay={selector === ".card-tickets"}
            allowClicksThruHole={true}
            locale={{
              back: <span>Back</span>,
              close: <span>Close</span>,
              last: <span>Last</span>,
              next: <span>Next</span>,
              skip: <span>Skip</span>
            }}
            run={isRunning}
            showOverlay={joyrideOverlay}
            showSkipButton={true}
            showStepsProgress={true}
            stepIndex={stepIndex}
            steps={steps}
            type={joyrideType}
          />
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
                <Route
                  path="/"
                  render={routeProps => (
                    <SearchQuery
                      {...routeProps}
                      addSteps={this.addSteps}
                      selector={selector}
                      next={this.next}
                    />
                  )}
                />
              </div>
              <Link
                className="d-none d-none d-md-block d-lg-block d-xl-block"
                to="/new"
              >
              <div className="qs-button-case">
                <RaisedButton 
                className="qs-button customButton"
                label={intl.formatMessage({id: "quick_submit"})} 
                labelPosition="after"
                icon={<AddIcon />}/>
              </div>
              </Link>
              <LoginAvatar
                addSteps={this.addSteps}
                auth={authService}
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
              onTouchTap={this.handleCloseHome}
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
            <MenuItem
              containerElement={<Link to={"/legal"} />}
              onTouchTap={this.handleClose}
            >
              <FormattedMessage id="terms_of_use" />
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
              <div className="qs-mobile mt-3">
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
            <Route
              path="/cases"
              render={routeProps => (
                <Home {...routeProps} handleHome={this.handleHome} />
              )}
            />
            <Route
              path="/methods"
              render={routeProps => (
                <Home {...routeProps} handleHome={this.handleHome} />
              )}
            />
            <Route
              path="/organizations"
              render={routeProps => (
                <Home {...routeProps} handleHome={this.handleHome} />
              )}
            />
            <Route
              path="/show/:term"
              render={props => (
                <Redirect to={`/search?query=${props.match.params.term}`} />
              )}
            />
            <Route
              exact
              path="/"
              render={routeProps => (
                <Home {...routeProps} handleHome={this.handleHome} />
              )}
            />
            <Route
              path="/search"
              render={routeProps => (
                <Home {...routeProps} handleHome={this.handleHome} />
              )}
            />
            <Route component={ScrollToTop} />
            <Route
              exact
              path="/profile"
              render={routeProps => (
                <ProfileLoader
                  {...routeProps}
                  handleInternal={this.handleInternal}
                />
              )}
            />
            <PrivateRoute path="/profile/edit" component={ProfileEditor} />
            <Route path="/help/:id" component={HelpArticle} />
            <Route
              path="/about"
              render={routeProps => (
                <About {...routeProps} handleInternal={this.handleInternal} />
              )}
            />
            <Route path="/legal" component={Legal} />
            <Route
              path="/teaching"
              render={routeProps => (
                <Teaching
                  {...routeProps}
                  handleInternal={this.handleInternal}
                />
              )}
            />
            <Route path="/experiments" component={Experiments} />
            <PrivateRoute
              exact
              path="/new"
              component={QuickSubmitPicker}
              handleInternal={this.handleInternal}
            />
            <Route
              exact
              path="/new/case"
              render={routeProps => (
                <NewCaseContainer
                  {...routeProps}
                  handleInternal={this.handleInternal}
                />
              )}
            />
            <Route
              exact
              path="/new/method"
              render={routeProps => (
                <NewMethodContainer
                  {...routeProps}
                  handleInternal={this.handleInternal}
                />
              )}
            />
            <Route
              exact
              path="/new/organization"
              render={routeProps => (
                <NewOrganizationContainer
                  {...routeProps}
                  handleInternal={this.handleInternal}
                />
              )}
            />
            <Route
              path="/research"
              render={routeProps => (
                <Research
                  {...routeProps}
                  handleInternal={this.handleInternal}
                />
              )}
            />
            <Route
              exact
              path="/case/:nodeID"
              render={routeProps => (
                <Case {...routeProps} handleInternal={this.handleInternal} />
              )}
            />
            <Route
              exact
              path="/method/:nodeID"
              render={routeProps => (
                <Method {...routeProps} handleInternal={this.handleInternal} />
              )}
            />
            <Route
              exact
              path="/organization/:nodeID"
              render={routeProps => (
                <Organization
                  {...routeProps}
                  handleInternal={this.handleInternal}
                />
              )}
            />
            <PrivateRoute
              handleInternal={this.handleInternal}
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
          <div id="feedback" />
          {this.state.showHelp ? (
            <HelpBar
              onHelpClose={this.closeHelp}
              locale={this.props.intl.locale}
              showTour={this.showTourFromHelp}
              goHome={this.goHomeFromHelp}
            />
          ) : (
            undefined
          )}
        </div>
      </Router>
    );
  }
}

export default injectIntl(Layout);
