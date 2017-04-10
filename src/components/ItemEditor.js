import React, { Component } from "react";
import { Form } from "react-form";
import TextField from "material-ui/TextField";
import { Container, Col } from "reactstrap";
import BodyEditor from "./BodyEditor";
import ImageListEditor from "./ImageListEditor";

export default class ItemEditor extends Component {
  render() {
    let { thing, sidebar, onSubmit } = this.props;

    if (!thing) {
      return <div />;
    }

    return (
      <Form onSubmit={onSubmit}>
        {({ submitForm }) => {
          return (
            <form onSubmit={submitForm}>
              <div className="main-contents">
                <Container className="detailed-case-component" fluid={true}>
                  <Col
                    md="3"
                    className="hidden-sm-down sidepanel hidden-sm-down"
                  >
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
                      <TextField
                        field="title"
                        placeholder="case title"
                        fullWidth={true}
                      />
                      <div>
                        <label htmlFor="body_en">Body</label>
                      </div>
                      <BodyEditor value={thing.body} />
                    </div>
                    <button type="submit">Submit</button>
                  </Col>
                </Container>
              </div>
            </form>
          );
        }}
      </Form>
    );
  }
}
