import React from "react";
import { Route, Switch } from "react-router";
import { bool, object, func } from "prop-types";
import { Link } from "react-router-dom";
import Home from "./Home";
import Fullscreen from "./components/Fullscreen";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import SearchQuery from "./containers/SearchQuery";
import Footer from "./components/Footer/Footer";
import LoginAvatar from "./LoginAvatar";
import { connect } from "react-redux";
import { checkLogin, loginRequest, logoutSuccess } from "./actions";
import FlatButton from "material-ui/FlatButton";
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
import {
  CaseEditorContainer,
  MethodEditorContainer,
  OrganizationEditorContainer,
  NewCaseContainer,
  NewMethodContainer,
  NewOrganizationContainer
} from "./containers/EditorContainers";
import QuickSubmitPicker
  from "./components/QuickSubmitPicker/QuickSubmitPicker";

/* eslint-disable no-unused-vars */
import globalStyles from "./global.css";
/* eslint-enable no-unused-vars */
import "./Layout.css";
import { injectIntl, intlShape } from "react-intl";
import menuIcon from "./img/menu-icon.png";
import ppLogo from "./img/pp-logo.png";
import myhistory from "./utils/history";

// import "bootstrap/dist/css/bootstrap.min.css"; // XXX this is maybe avoidable by using reactstrap?
import "./UniversalStyles.css"

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

const EnsureAuth = props =>
  authService.loggedIn()
    ? <div />
    : <div>Must be logged in</div> && authService.login(props.location.state);

class Routes extends React.Component {
  render() {
    let intl = this.props.intl;
    
    let isAuthenticated = authService.loggedIn();
    let profile = authService.getProfile();
    return (
      <div className="contentArea">
        <Route exact path="/" component={Home} />
        <Route exact path="/cases" component={Home} />
        <Route exact path="/methods" component={Home} />
        <Route exact path="/organizations" component={Home} />
        <Route path="/search" component={Home} />
        <Route component={ScrollToTop} />
        <Route path="/redirect" />
        <Route exact path="/profile" component={ProfileLoader} />
        <Route path="/profile/edit" component={EnsureAuth} />
        <Route
          path="/profile/edit"
          component={props => (
            <ProfileEditor
              isAuthenticated={isAuthenticated}
              intl={intl}
              profile={profile}
              {...props}
            />
          )}
        />
        <Route path="/help/:id" component={HelpArticle} />
        <Route path="/about" component={About} />
        <Route path="/experiments" component={Experiments} />
        <Route path="/_upload" component={Upload} />
        <Route path="/teaching" component={Teaching} />
        <Route exact path="/quick-submit" component={QuickSubmitPicker} />
        <Route path="/new" component={EnsureAuth} />
        <Route
          exact
          path="/new/case"
          component={props => <NewCaseContainer intl={intl} {...props} />}
        />
        <Route
          exact
          path="/new/method"
          component={props => <NewMethodContainer intl={intl} {...props} />}
        />
        <Route
          exact
          path="/new/organization"
          component={props => (
            <NewOrganizationContainer intl={intl} {...props} />
          )}
        />
        <Route path="/research" component={Research} />
        <Route
          path="/case/:nodeID"
          exact
          component={props => <Case intl={intl} {...props} />}
        />
        <Route path="/case/:nodeID/edit" component={EnsureAuth} />
        <Route
          path="/case/:nodeID/edit"
          component={props => <CaseEditorContainer intl={intl} {...props} />}
        />
        <Route path="/method/:nodeID" component={Method} />
        <Route path="/method/:nodeID/edit" component={EnsureAuth} />
        <Route path="/method/:nodeID/edit" component={MethodEditorContainer} />
        <Route
          exact
          path="/organization/:nodeID"
          component={props => <Organization intl={intl} {...props} />}
        />
        <Route path="/organization/:nodeID/edit" component={EnsureAuth} />
        <Route
          path="/organization/:nodeID/edit"
          component={props => (
            <OrganizationEditorContainer intl={intl} {...props} />
          )}
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
    checkLogin: func
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
    myhistory.push("/");
  }

  render() {
    const { auth, profile, dispatch, intl, isAuthenticated } = this.props;
    let routes = <Routes intl={intl} />;

    let theLayout = (
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
            <Link className="hidden-sm-down" to="/quick-submit">
              <div className="createButton"> 
                {this.props.intl.formatMessage({ id: "quick_submit" })}
              </div>
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
            onTouchTap={this.handleClose}>
            {this.props.intl.formatMessage({ id: "research" })}
          </MenuItem>
          <MenuItem className="hidden-sm-up">
            {isAuthenticated ? 
              <div className="profileButtonMenu">  
               <FlatButton
                 containerElement={<Link to={"/profile"} />}
                 onClick={this.handleClose}
                 label={this.props.intl.formatMessage({ id: "profile" })}
               />
              </div> 
            : 
              <div className="loginButtonMenu">
                <FlatButton
                  onClick={() => dispatch(loginRequest())}
                  onTouchTap={this.signIn}
                  label={this.props.intl.formatMessage({ id: "login" })}
                />
              </div>
            }
          </MenuItem>
          <MenuItem className="hidden-sm-up"
            containerElement={<Link to={"/quick-submit"} />}
            onTouchTap={this.handleClose}>
            <div className="quick-submit"> 
              <FlatButton 
                label={this.props.intl.formatMessage({ id: "quick_submit" })}
              />
            </div>
          </MenuItem>
          {isAuthenticated ? 
            <MenuItem className="hidden-sm-up"
              primaryText={this.props.intl.formatMessage({ id: "sign_out" })}
              onClick={() => dispatch(logoutSuccess())}
            /> 
          :
            undefined
          }
        </Drawer>
        {routes}
        <Footer />
      </div>
    );

    // only do the basic layout if not doing fullscreen
    return (
      <Switch>
        <Route path="/fullscreen" component={Fullscreen} />
        <Route path="/" render={() => theLayout} />
      </Switch>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkLogin: () => dispatch(checkLogin()),
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
