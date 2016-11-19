import React from 'react';
import { Container, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './ItemForm.css'

class ItemForm extends React.Component {
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }

	handleSubmit(event) {
    event.preventDefault();
		//grab text from box
    const storeId = this.titleInput.value;
    const prueba = this.SummaryInput.value;
    console.log('prueba',prueba);
    console.log(`Going to ${storeId}`);
    console.log(`/en-US/case/${storeId}`);
    //go to store URL
    this.context.router.push(`/en-US/case/${storeId}`);
    // this.context.router.transitionTo(`/en-US/store/${storeId}`);
	}

	render() {
		return (
      <Container>
  			<Form className="quick-submit" onSubmit={this.handleSubmit.bind(this)}>
  				<h2>Add a Case</h2>
          <FormGroup>
            <Label>Title</Label>
    				<Input type="text" required placeholder="Title placeholder" defaultValue="hello" ref={(input) => {this.titleInput = input}} />
          </FormGroup>
          <FormGroup>
            <Label>Summary</Label>
            <Input type="text" required placeholder="Summary placeholder" defaultValue="hello" ref={(input) => {this.SummaryInput = input}} />
          </FormGroup>
          <FormGroup>Media
            <Label>Images</Label>
            <Label>Videos</Label>
          </FormGroup>
            <label>Location</label>
  				<button type="submit">Submit</button>
  			</Form>
      </Container>
		)
	}
}

ItemForm.contextTypes = {
  router: React.PropTypes.object
}

export default ItemForm;