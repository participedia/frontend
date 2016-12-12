import React, { Component } from 'react'
import { Field } from 'redux-form'
import { Container, Row, Col, Form, FormGroup, Label } from 'reactstrap'
import imgIcon from '../img/img-icon.png'
import vidIcon from '../img/vid-icon.png'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'
import locationIcon from '../img/location-icon.png'
import Upload from '../Upload'
import Geosuggest from 'react-geosuggest'
import RaisedButton from 'material-ui/RaisedButton'
import './GeoSuggest.css'
import './QuickSubmit.css'

const renderGeoField = ({ input, label, type, meta: { touched, error } }) => {
  const onSuggestSelect = (suggest) => {
    input.onChange(suggest)
  }
  return (
    <Geosuggest
        onSuggestSelect={onSuggestSelect}/>
  )
}

// to avoid the warnings from react about unnecessary props
const renderTextField = field => <TextField {...field.input}/>

class ItemForm extends Component {
  render() {
    const { handleSubmit } = this.props
    return (
      <Container>
        <Form className="quick-submit" onSubmit={handleSubmit} >
          <Row>
            <Col xs={{ size: 10, offset: 1 }}>
              <h2>Add {this.props.itemType === 'Organization' ? 'an' : 'a'} {this.props.itemType}</h2>
            </Col>
          </Row>
          <FormGroup>
            <Label>Title</Label>
            <Field name='title' className='title' placeholder='Neighbourhood Safety Jam' component={renderTextField} type='text'/>
          </FormGroup>
          <FormGroup>
            <Label>Summary</Label>
            <Field name='summary' className='title' placeholder='Summary placeholder' component={renderTextField} type='text'/>
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
              <Field name='vidURL' component={renderTextField} type='text' placeholder='Paste YouTube or Vimeo URL here' />
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
          <Row className='relatedCases pb-14'>
            <AutoComplete hintText="Related cases" dataSource={this.props.cases} />
          </Row>
          <RaisedButton onClick={handleSubmit} type="submit" label="Submit" primary={true} />
        </Form>
      </Container>
    )
  }
}

export default ItemForm
