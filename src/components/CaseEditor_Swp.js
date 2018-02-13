import React, { Component } from "react";
import {
  FormattedMessage,
  FormattedHTMLMessage,
  intlShape,
  injectIntl
} from "react-intl";
import { Form, Field } from "simple-react-form";
import BodyEditor from "./BodyEditor";
import { Container, Col } from "reactstrap";
import ImageListEditor from "./ImageListEditor";
import Text from "simple-react-form-material-ui/lib/text";
import Textarea from "simple-react-form-material-ui/lib/textarea";
import Checkbox from "simple-react-form-material-ui/lib/checkbox";
import tags_json from "../autocomplete_data/tags.json";
import "./CaseEditor.css";
import "./GeoSuggest/GeoSuggest.css";
import RelatedEditor from "./RelatedEditor";
import RaisedButton from "material-ui/RaisedButton";
import { encodeLocation } from "./geoutils";
import PublishIcon from "material-ui/svg-icons/editor/publish";
import preventDefault from "react-prevent-default";
import {
  makeLocalizedChoiceField,
  makeLocalizedMultiChoiceField,
  makeLocalizedBooleanField,
  makeLocalizedDateField,
  makeLocalizedNumberField,
  makeLocalizedTextField,
  makeLocalizedLocationField,
  makeLocalizedListField
} from "./PropEditors";

const tags = tags_json["tags"];

const buttonStyle = {
  margin: "1em"
};

class CaseEditor extends Component {
  constructor(props) {
    super(props);
    let thing = props.thing;
    if (!thing.images) {
      thing.images = [];
    }
    if (!thing.body) {
      thing.body = props.intl.formatMessage({
        id: "case_description_placeholder"
      });
    }
    this.state = { thing };
    this.updateBody = this.updateBody.bind(this);
  }

  updateBody(body) {
    let updatedThing = Object.assign({}, this.state.thing, { body: body });
    this.setState({ thing: updatedThing });
  }

  componentWillReceiveProps(nextProps) {
    let thing = nextProps.thing;
    if (!thing.body) {
      thing.body = nextProps.intl.formatMessage({
        id: "case_description_placeholder"
      });
    }
    if (
      thing.number_of_meeting_days === null ||
      thing.number_of_meeting_days === "null"
    ) {
      thing.number_of_meeting_days = 0;
    }
    this.setState({ thing });
  }

  onSubmit() {
    let thing = this.state.thing;
    this.props.onSubmit(thing);
  }

  render() {
    let { cases, methods, organizations, isQuick, onExpand, intl } = this.props;
    let thing = this.state.thing;
    if (!thing.location) {
      thing.location = "";
    }
    if (typeof thing.location !== typeof "") {
      thing.location = encodeLocation(thing.location);
    }

    if (!this.state.thing) {
      return <div />;
    }
    let onSubmit = this.onSubmit.bind(this);
    let tagseditor = (
      <Field
        fieldName="tags"
        type={RelatedEditor}
        maxSearchResults={30}
        dataSource={tags}
        placeholder={intl.formatMessage({
          id: "tags_placeholder"
        })}
      />
    );
    let process_methods = (
      <Field
        fieldName="process_methods"
        type={RelatedEditor}
        dataSource={methods}
        dataSourceConfig={{ text: "text", value: "value" }}
        placeholder={intl.formatMessage({
          id: "process_methods_placeholder"
        })}
      />
    );
    let primary_organizer = (
      <Field
        fieldName="primary_organizer"
        type={RelatedEditor}
        dataSource={organizations}
        dataSourceConfig={{ text: "text", value: "value" }}
        placeholder={intl.formatMessage({
          id: "primary_organizer_placeholder"
        })}
      />
    );
    let incomplete = thing.title ? false : true;
    let issues = this.state.thing.issues;
    let doFullVersion = this.props.new
      ? "do_full_version"
      : "edit_full_version";
    let quickSubmitText = "publish";
    let fullSubmitText = "publish";
    return (
      <Form
        onSubmit={onSubmit}
        state={thing}
        onChange={changes => this.setState({ thing: changes })}
      >
        <div className="main-contents">
          <Container className="detailed-case-component" fluid>
            <Col
              md="3"
              className="d-none d-sm-block d-md-block d-lg-block d-xl-block sidepanel"
            />
            <Col md="6" className="ml-auto mr-auto">
              <div className="case-box">
                <div className="form-section">
                  <div className="field-case top">
                    <h2 className="sub-heading">
                      <FormattedMessage id="overview" />
                    </h2>
                    <h3 className="sub-heading">
                      <label htmlFor="title">
                        <FormattedMessage id={thing.type + "_title_label"} />
                      </label>
                    </h3>
                    <p className="explanatory-text">
                      <FormattedHTMLMessage
                        id={intl.formatMessage({
                          id: thing.type + "_title_explanatory"
                        })}
                      />
                    </p>
                    <Field
                      fieldName="title"
                      name="title"
                      className="custom-field"
                      type={Text}
                      placeholder=""
                      fullWidth
                    />
                  </div>
                  {makeLocalizedMultiChoiceField(
                    intl,
                    "relationship",
                    "relationship",
                    "relationship",
                    true,
                    3
                  )}
                  {makeLocalizedMultiChoiceField(
                    intl,
                    "relationship",
                    "relationship",
                    "relationship",
                    true,
                    3
                  )}
                </div>
              </div>
            </Col>
          </Container>
        </div>
      </Form>
    );
  }
}

CaseEditor.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(CaseEditor);
