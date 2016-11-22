import React from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import { Container, Row, Col } from 'reactstrap';
import ItemForm from '../components/ItemForm'
import './QuickSubmit.css'

class QuickSubmit extends React.Component {
  constructor(props) {
    super(props);
    // getinitialState
    this.state = {
      pickedItem: undefined,
    };
  }

  handleSubmit(data) {
    console.log('Submission received!', data);
    this.props.dispatch(initialize('contact', {})); // clear form
  }

  resetItem(event) {
    this.setState({pickedItem: undefined})
  }

  render() {
    return (
      <div>
        <Container>
        { this.state.pickedItem ? 
            <ItemForm closeForm={this.resetItem.bind(this)} pickedItem={this.state.pickedItem} onSubmit={this.handleSubmit.bind(this)}/>
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

export default connect()(QuickSubmit);