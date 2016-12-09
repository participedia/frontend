import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Row, Col, Form, FormGroup, Label } from 'reactstrap'
import imgIcon from '../img/img-icon.png'
import vidIcon from '../img/vid-icon.png'
import locationIcon from '../img/location-icon.png'
import Upload from '../Upload'
import Geosuggest from 'react-geosuggest'
import RaisedButton from 'material-ui/RaisedButton'
import './GeoSuggest.css'

const renderGeoField = ({ input, label, type, meta: { touched, error } }) => {
  const onSuggestSelect = (suggest) => {
    input.onChange(suggest)
  }
  return (
    <Geosuggest
        onSuggestSelect={onSuggestSelect}/>
  )
}

class ItemForm extends Component {
  render() {
    const { handleSubmit } = this.props
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
          <Field name='title' className='title' placeholder='Neighbourhood Safety Jam' component='input' type='text'/>
        </FormGroup>
        <FormGroup>
          <Label>Summary</Label>
          <Field name='summary' className='title' placeholder='Summary placeholder' component='input' type='text'/>
        </FormGroup>
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
            <Field name='vidURL' component='input' type='text' placeholder='Paste YouTube or Vimeo URL here' />
          </Col>
        </Row>
        <Label>Location</Label>
        <Row className='locationField pb-14'>
          <Col xs='2' className='pr-0'>
            <img src={locationIcon} alt=""/>
          </Col>
          <Col xs='10' className='pt-14 pl-0'>
            <span>Add a location</span>
            <Field name="location" component={renderGeoField}  />
          </Col>
        </Row>
        <RaisedButton onClick={handleSubmit} type="submit" label="Submit" primary={true} />
      </Form>
    )
  }
}

// Decorate the form component
ItemForm = reduxForm({
  form: 'contact' // a unique name for this form
})(ItemForm)

export default ItemForm
