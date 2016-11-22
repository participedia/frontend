import React from 'react';
import { reduxForm } from 'redux-form';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton'
import imgIcon from '../img/img-icon.png'
import vidIcon from '../img/vid-icon.png'
import locationIcon from '../img/location-icon.png'
import Upload from '../Upload'

class ItemForm extends React.Component {
  render() {
    const { fields: {title, summary}, handleSubmit } = this.props;
    return (
      <Form className="quick-submit" onSubmit={handleSubmit} >
        <Row>
          <Col xs={{ size: 10, offset: 1 }}>
            <h2>Add {this.props.pickedItem === 'Organization' ? 'an' : 'a'} {this.props.pickedItem}</h2>
            <h2 className='dismiss' onClick={this.props.closeForm}>X</h2>
          </Col>
        </Row>
        <FormGroup>
          <Label>Title</Label>
          <Input type="textarea" className='title' required placeholder='Neighbourhood Safety Jam' defaultValue='' {...title} />
        </FormGroup>
        <FormGroup>
          <Label>Summary</Label>
          <Input type='textarea' required placeholder='Summary placeholder' defaultValue='' {...summary} />
        </FormGroup>
        <Label>Media</Label>
        <Row className='imgField'>
          <Col xs='2' className='pr-0'>
            <img src={imgIcon} alt=""/>
          </Col>
          <Col xs='10' className='pt-14 pl-0'>
            <span>Add a photo</span>
            <Upload/>
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
        <RaisedButton onClick={handleSubmit} type="submit" label="Submit" primary={true} />
      </Form>
    );
  }
}

ItemForm = reduxForm({
  form: 'contact',                      // the name of your form and the key to
                                        // where your form's state will be mounted
  fields: ['title', 'summary'],         // a list of all your fields in your form
})(ItemForm);

export default ItemForm;