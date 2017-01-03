import React, { Component } from 'react'
import { Field } from 'redux-form'
import { Container, Row, Col, Form, FormGroup, Label } from 'reactstrap'
import imgIcon from '../img/img-icon.png'
import vidIcon from '../img/vid-icon.png'
import locationIcon from '../img/location-icon.png'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'
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
const renderTextField = field => <TextField hintText={field.placeholder}  {...field.input}/>

class ItemForm extends Component {
  render() {
    const { handleSubmit } = this.props
    return (
      <Container>
        <Form className='quick-submit' onSubmit={handleSubmit} >
          <h2 className='form-title'>Add {this.props.itemType === 'organization' ? 'an' : 'a'} {this.props.itemType}</h2>
          <FormGroup>
            <Label>Title</Label>
            <Field name='title' className='title' placeholder='Neighbourhood Safety Jam' component={renderTextField} type='text'/>
          </FormGroup>
          <FormGroup>
            <Label>Summary</Label>
            <Field name='summary' className='title' placeholder='Placeholder for summary ' component={renderTextField} type='text'/>
          </FormGroup>
          <Row className='imgField'>
            <Col xs={2} sm={1}>
              <img className="img-fluid" src={imgIcon} alt=""/>
            </Col>
            <Col xs={10} sm={11}>
              <span>Add a photo</span>
            </Col>
          </Row>
          <Upload/>
          <Row className='vidField'>
            <Col xs={2} sm={1}>
              <img className="img-fluid" src={vidIcon} alt=""/>
            </Col>
            <Col xs={10} sm={11}>
              <p>Add a video</p>
              <Field name='vidURL' component={renderTextField} placeholder='Paste YouTube or Vimeo URL here'  type='text' />
            </Col>
          </Row>
          <Row className='locationField pb-1'>
            <Col xs={2} sm={1}>
              <img className="img-fluid" src={locationIcon} alt=""/>
            </Col>
            <Col xs={10} sm={11}>
              <span>Add a location</span>
              <Field name="location" component={renderGeoField}  />
            </Col>
          </Row>
          <FormGroup className='relatedCases pb-1'>
            <Label>Related cases</Label>
            <AutoComplete hintText="Search for related cases" dataSource={this.props.cases} />
          </FormGroup>
          <RaisedButton onClick={handleSubmit} type="submit" label="Submit" primary={true} />
        </Form>
      </Container>
    )
  }
}

export default ItemForm
