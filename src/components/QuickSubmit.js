import React, { Component } from 'react';
import ItemForm from './ItemForm';
import { Container, Row, Col } from 'reactstrap';
import './QuickSubmit.css'

class QuickSubmit extends React.Component {

  constructor(props) {
    super(props);
    // getinitialState
    this.state = {
      pickedItem: undefined,
    };
  }

  handleSubmit = (values) => {
    // Do something with the form values
    console.log(values);
  }

  resetItem(event) {
    this.setState({pickedItem: undefined})
  }

  render() {
    return (
      <div>
        <Container>
        { this.state.pickedItem ? 
            <ItemForm closeForm={this.resetItem.bind(this)} pickedItem={this.state.pickedItem} onSubmit={this.handleSubmit}/>
            :
          <Row className='select-type' >
            <h2>Select type</h2>
            <Col xs={{ size: 10, offset: 1 }}>
              <p onClick={() => {this.setState({pickedItem: 'Case'})}}>Case</p>
              <p onClick={() => {this.setState({pickedItem: 'Method'})}}>Method</p>
              <p onClick={() => {this.setState({pickedItem: 'Organization'})}}>Organization</p>
              <p onClick={() => {this.setState({pickedItem: 'Survey'})}}>Survey</p>
              <p onClick={() => {this.setState({pickedItem: 'Data Set'})}}>Data Set</p>
            </Col>
          </Row>  
        }
        </Container>
      </div>
    );
  }
}

export default QuickSubmit;