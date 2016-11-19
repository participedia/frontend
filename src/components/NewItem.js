import React from 'react';
import ItemForm from '../components/ItemForm'
import { Container, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './NewItem.css'

class NewItem extends React.Component {
  constructor() {
    super();
    // this.goToStore = this.goToStore.bind(this);

    // getinitialState
    this.state = {
      pickedItem: null,
    };
  }

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
      <div>
        { this.state.pickedItem ? 
        <Container>
          <ItemForm />
        </Container>
        :
        <h2>ok</h2>
        }
      </div>
		)
	}
}

NewItem.contextTypes = {
  router: React.PropTypes.object
}

export default NewItem;