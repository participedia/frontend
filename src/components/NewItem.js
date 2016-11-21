import React from 'react';
import ItemForm from '../components/ItemForm'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton'
import './NewItem.css'
import preventDefault from 'react-prevent-default'
import imgIcon from '../img/img-icon.png'
import vidIcon from '../img/vid-icon.png'
import locationIcon from '../img/location-icon.png'


class NewItem extends React.Component {
  constructor(props) {
    super(props);
    // getinitialState
    this.state = {
      pickedItem: undefined,
      title: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({title: event.target.value});
  }

  handleSubmit(event) {
    // event.preventDefault();
    //grab text from box
    // console.log(this,'e');
    // const itemId = this.titleInput.value;
    // const prueba = this.SummaryInput.value;
    // console.log(itemId, 'ok');
    // console.log(prueba, 'okno');
    alert('A name was submitted: ' + this.state.title);
    event.preventDefault();
    //go to case URL
    // this.context.router.push(`/en-US/case/${itemId}`);
  }

  setItemType(type) {
     this.setState({ pickedItem : type} );
  }

  render() {
    return (
      <div>
        <Container>
        { this.state.pickedItem ? 
          <Form className="quick-submit" onSubmit={this.handleSubmit} >
            <Row>
              <Col xs={{ size: 10, offset: 1 }}>
                <h2>Add {this.state.pickedItem === 'Organization' ? 'an' : 'a'} {this.state.pickedItem}</h2>
                <h2 className='dismiss' onClick={() => {this.setState({pickedItem: undefined})}}>X</h2>
              </Col>
            </Row>
            <FormGroup>
              <Label>Title</Label>
              <input type="textarea" className='title' required placeholder='Neighbourhood Safety Jam' defaultValue='' value={this.state.title} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label>Summary</Label>
              <Input type='textarea' required placeholder='Summary placeholder' defaultValue='hello' ref={(input) => {this.SummaryInput = input}} />
            </FormGroup>
            <Label>Media</Label>
            <Row className='imgField'>
              <Col xs='2' className='pr-0'>
                <img src={imgIcon} alt=""/>
              </Col>
              <Col xs='10' className='pt-14 pl-0'>
                <span>Add a photo</span>
              </Col>
            </Row>
            <Row className='vidField'>
              <Col xs='2' className='pr-0'>
                <img src={vidIcon} alt=""/>
              </Col>
              <Col xs='10' className='pt-14 pl-0'>
                <span>Add a video</span>
              </Col>
            </Row>
            <Label>Location</Label>
            <Row className='locationField pb-14'>
              <Col xs='2' className='pr-0'>
                <img src={locationIcon} alt=""/>
              </Col>
              <Col xs='10' className='pt-14 pl-0'>
                <span>Add a location</span>
              </Col>
            </Row>
            <RaisedButton type="submit" label="Submit" primary={true} />
          </Form>
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
    )
  }
}

NewItem.contextTypes = {
  router: React.PropTypes.object
}

export default NewItem;
