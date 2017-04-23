import React from "react";
import { Container, Col, Row } from "reactstrap";
import Map from "./containers/Map";
import SearchResults from "./containers/SearchResults";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import iconInfo from "./img/icon-info.svg";
import DismissButton from "material-ui/svg-icons/navigation/close";
import "./Home.css";

class Home extends React.Component {
  constructor() {
    super();
    this.state = { showWelcome: true };
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  componentDidMount() {
    const skipWelcome = localStorage.getItem("skipWelcome");

    if (skipWelcome) {
      this.setState({ showWelcome: false });
    }
  }

  handleDismiss() {
    this.setState({ showWelcome: false });
    localStorage.setItem("skipWelcome", "true");
  }

  render() {
    return (
      <div className="home">
        {this.state.showWelcome
          ? <Container>
              <Row className="description">
                <Col sm={{ size: 8, offset: 2 }}>
                  <img src={iconInfo} alt="" />
                  <h5>
                    {this.props.intl.formatMessage({ id: "welcome_message" })}
                  </h5>
                  <Link className="learn" to={"/about"}>
                    {this.props.intl.formatMessage({ id: "learn_more" })}&gt;
                  </Link>
                </Col>
                <Col sm={{ size: 2 }}>
                  <span
                    className="dismiss"
                    onClick={this.handleDismiss.bind(this)}
                  >
                    {this.props.intl.formatMessage({ id: "got_it" })}
                    {" "}
                    <DismissButton />
                  </span>
                </Col>
              </Row>
            </Container>
          : undefined}
        <Map />
        <SearchResults {...this.props} />
      </div>
    );
  }
}

export default injectIntl(Home);
