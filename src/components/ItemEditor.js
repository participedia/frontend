import React, { Component } from "react";
import { Form, Field } from "simple-react-form";
import { Container, Col } from "reactstrap";
import BodyEditor from "./BodyEditor";
import ImageListEditor from "./ImageListEditor";
import Text from "simple-react-form-material-ui/lib/text";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Send from "material-ui/svg-icons/content/send";

export default class ItemEditor extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(props.thing);
  }
  onSubmit() {
    this.props.onSubmit(this.state);
  }
  render() {
    let { thing, sidebar } = this.props;

    if (!thing) {
      return <div />;
    }
    let onSubmit = this.onSubmit.bind(this);

    return (
      <Form
        onSubmit={onSubmit}
        state={this.state}
        onChange={changes => this.setState(changes)}
      >
        <div className="main-contents">
          <Container className="detailed-case-component" fluid={true}>
            <Col md="3" className="hidden-sm-down sidepanel hidden-sm-down">
              {sidebar}
            </Col>
            <Col md="8" xs="12" className="main-area">
              <div className="case-box">
                <h2 className="category">
                  Case
                </h2>
                <h2 className="case-title">
                  {thing.title}
                </h2>
                <ImageListEditor thing={thing} />
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
                <BodyEditor value={thing.body} />
              </div>
              <FloatingActionButton
                onTouchTap={onSubmit}
                className="editButton"
              >
                <Send />
              </FloatingActionButton>
              <button type="submit">Submit</button>
            </Col>
          </Container>
        </div>
      </Form>
    );
  }
}
