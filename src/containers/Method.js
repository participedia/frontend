import React from "react";
import "./Case/Case.css";
import { injectIntl, intlShape } from "react-intl";
import { Link } from "react-router";
import { Container, Row, Col } from "reactstrap";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentPencil from "material-ui/svg-icons/image/edit";
import api from "../utils/api";
import caseIconBookmark from "../img/pp-case-icon-bookmark.png";
import caseIconSettings from "../img/pp-case-icon-settings.png";
import caseIconFB from "../img/pp-case-icon-fb.png";
import caseIconTW from "../img/pp-case-icon-tw.png";
import caseIconShare from "../img/pp-case-icon-share.png";
import moment from "moment";

export class Method extends React.Component {
    componentWillMount() {
        let component = this;
        api.fetchMethodById(this.props.params.nodeID).then(function(data) {
            component.setState({ data: data, htmlBody: data.body });
        });
    }

    getInnerHTML() {
        let input = "";
        if (this.state && this.state.htmlBody) {
            input = this.state.htmlBody;
        }
        return { __html: input };
    }

    render() {
        if (this.state && this.state.data) {
            let methodObject = this.state.data;
            let tags = "";
            let communication_modes = "";
            if (methodObject.specific_topics) {
                tags = methodObject.specific_topics
                    .split(",")
                    .map(function(tag, i) {
                        return <a key={i} href="#">{tag.trim()}</a>;
                    });
            }
            if (methodObject.communication_mode) {
                communication_modes = methodObject.communication_mode
                    .split(",")
                    .map(function(tag, i) {
                        return <a key={i} href="#">{tag.trim()}</a>;
                    });
            }
            let post_date = moment(methodObject.post_date).format("LL");
            let updated_date = moment(methodObject.updated_date).format("LL");
            let locale = this.props.intl.locale;

            let author = methodObject.authors[0];
            let first_author = (author && author.name) || "unknown";
            let first_author_url = author
                ? "/" + locale + "/users/" + author.id
                : "";
            let last_author = methodObject.authors.slice(-1)[0];
            let last_author_name = last_author.name;
            let last_author_url = "/" + locale + "/users/" + last_author.id;
            let id = this.props.params.nodeID;
            let editLink = <Link to={`/${locale}/case/${id}/edit`} />;
            let awsUrl = process.env.REACT_APP_ASSETS_URL;
            if (methodObject.lead_image) {
                var pic = awsUrl +
                    encodeURIComponent(methodObject.lead_image.url);
            }
            if (methodObject.other_images.length) {
                var otherImg = awsUrl +
                    encodeURIComponent(methodObject.other_images[0].url);
            }

            return (
                <div>
                    <div className="main-contents">
                        <Container
                            className="detailed-case-component"
                            fluid={true}
                        >
                            <Row>
                                <Col
                                    md="3"
                                    className="hidden-sm-down sidepanel hidden-sm-down"
                                >
                                    <p className="sub-heading">
                                        Keywords
                                    </p>
                                    <p className="sub-sub-heading">
                                        Tags:
                                    </p>
                                    <div className="tags">
                                        {tags}
                                    </div>
                                    <p className="sub-sub-heading">
                                        Specific Topic(s):
                                    </p>
                                    <div className="tags">
                                        {communication_modes}
                                    </div>
                                    <p className="sub-heading">
                                        Related Content
                                    </p>
                                    <div className="related-content">
                                        <a href="#">Cases</a>
                                        <a href="#">Methods</a>
                                        <a href="#">Surveys</a>
                                        <a href="#">Datasets</a>
                                    </div>
                                </Col>
                                <Col md="8" xs="12" className="main-area">
                                    <div className="case-box">
                                        <div className="category">
                                            Method
                                        </div>
                                        <h2 className="case-title">
                                            {methodObject.title}
                                        </h2>
                                        {pic && pic.length > awsUrl.length
                                            ? <div className="case-images">
                                                  <img
                                                      role="presentation"
                                                      src={pic}
                                                  />
                                              </div>
                                            : otherImg &&
                                                  otherImg.length >
                                                      awsUrl.length
                                                  ? <div
                                                        className="case-images"
                                                    >
                                                        <img
                                                            role="presentation"
                                                            src={otherImg}
                                                        />
                                                    </div>
                                                  : undefined}
                                        <div className="authorship-details">
                                            <p className="author-line">
                                                First submitted by&nbsp;
                                                <a href={first_author_url}>
                                                    {first_author}
                                                </a>
                                            </p>
                                            <p className="date-line">
                                                {post_date}
                                            </p>
                                            <p className="author-line">
                                                Most recent changes by&nbsp;
                                                <a href={last_author_url}>
                                                    {last_author_name}
                                                </a>
                                            </p>
                                            <p className="date-line">
                                                {updated_date}
                                            </p>
                                        </div>
                                        <div
                                            className="case-html"
                                            dangerouslySetInnerHTML={{
                                                __html: methodObject.body
                                            }}
                                        />
                                    </div>
                                </Col>
                                <Col
                                    md="1"
                                    className="case-tools hidden-sm-down"
                                >
                                    <div className="top-icons">
                                        <a href="#">
                                            <img
                                                src={caseIconBookmark}
                                                alt=""
                                            />
                                        </a>
                                        <a href="#">
                                            <img
                                                src={caseIconSettings}
                                                alt=""
                                            />
                                        </a>
                                        <a href="#">
                                            <img src={caseIconFB} alt="" />
                                        </a>
                                        <a href="#">
                                            <img src={caseIconTW} alt="" />
                                        </a>
                                        <a href="#">
                                            <img src={caseIconShare} alt="" />
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <Link to={editLink}>
                            <FloatingActionButton className="editButton">
                                <ContentPencil />
                            </FloatingActionButton>
                        </Link>
                    </div>
                </div>
            );
        } else {
            return <div />;
        }
    }
}

Method.propTypes = {
    intl: intlShape.isRequired
};

export default injectIntl(Method);
