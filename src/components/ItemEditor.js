import React, { Component } from "react";
import { Form, Field } from "simple-react-form";
import { Container, Col } from "reactstrap";
import ImageListEditor from "./ImageListEditor";
import Text from "simple-react-form-material-ui/lib/text";
import FloatingActionButton from "material-ui/FloatingActionButton";
import FileUpload from "material-ui/svg-icons/file/file-upload";

// Quiet Jest down (Unnecessary as soon as we upgrade to react-apps 0.10)
if (process.env.NODE_ENV === "test") {
  require.ensure = (deps, cb) => cb(require);
}

class LazyBodyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { BodyEditor: false };
  }
  componentDidMount() {
    // There is probably a cleaner way to do this, but it seems to work
    let component = this;
    require.ensure(["./BodyEditor"], function(require) {
      let BodyEditor = require("./BodyEditor").default;
      component.setState({
        BodyEditor
      });
    });
  }
  render() {
    let BodyEditor = this.state.BodyEditor;
    if (BodyEditor) {
      return <BodyEditor {...this.props} />;
    } else {
      return <div />;
    }
  }
}

export default class ItemEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { thing: props.thing };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ thing: nextProps.thing });
  }

  onSubmit() {
    this.props.onSubmit(this.state.thing);
  }
  render() {
    let { sidebar, type } = this.props;
    let thing = this.state.thing;

    if (!this.state.thing) {
      return <div />;
    }
    let onSubmit = this.onSubmit.bind(this);

    return (
      <Form
        onSubmit={onSubmit}
        state={thing}
        onChange={changes => this.setState({ thing: changes })}
      >
        <div className="main-contents">
          <Container className="detailed-case-component" fluid={true}>
            <Col md="3" className="hidden-sm-down sidepanel hidden-sm-down">
              {sidebar}
            </Col>
            <Col md="8" xs="12" className="main-area">
              <div className="case-box">
                <h2 className="category">
                  {type}
                </h2>
                <h2 className="case-title">
                  {thing.title}
                </h2>
                <ImageListEditor auth={this.props.auth} thing={thing} />
                <div className="title-edit">
                  <label htmlFor="title">Title</label>
                </div>
                <Field
                  fieldName="title"
                  name="title"
                  type={Text}
                  placeholder="case title"
                  fullWidth={true}
                />
                <div>
                  <label htmlFor="body_en">Body</label>
                </div>
                <Field fieldName="body" type={LazyBodyEditor} />
              </div>
              <FloatingActionButton
                onTouchTap={onSubmit}
                className="editButton"
              >
                <FileUpload />
              </FloatingActionButton>
              <button type="submit">Submit</button>
            </Col>
          </Container>
        </div>
      </Form>
    );
  }
}
