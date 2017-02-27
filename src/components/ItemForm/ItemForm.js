import React, { Component } from 'react'
import { Field } from 'redux-form'
import { Container, Row, Col, Form, FormGroup, Label } from 'reactstrap'
import imgIcon from '../../img/img-icon.png'
import vidIcon from '../../img/vid-icon.png'
import TextField from 'material-ui/TextField'
import AutoComplete from 'material-ui/AutoComplete'
import locationIcon from '../../img/location-icon.png'
import Upload from '../../Upload'
import Geosuggest from 'react-geosuggest'
import RaisedButton from 'material-ui/RaisedButton'
import '../GeoSuggest/GeoSuggest.css'
import '../QuickSubmit/QuickSubmit.css'
import {injectIntl} from 'react-intl'

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
          <h2 className='form-title'>{this.props.intl.formatMessage({id: 'add_' + (this.props.itemType === 'organization' ? 'an' : 'a') + '_' + this.props.itemType})}</h2>
          <FormGroup>
            <Label>{this.props.intl.formatMessage({id: 'title'})}</Label>
            <Field name='title' className='title' placeholder='Neighbourhood Safety Jam' component={renderTextField} type='text'/>
          </FormGroup>
          <FormGroup>
            <Label>{this.props.intl.formatMessage({id: 'summary'})}</Label>
            <Field name='summary' className='title' placeholder='Placeholder for summary' component={renderTextField} type='text'/>
          </FormGroup>
          <Row className='imgField'>
            <Col xs={2} sm={1}>
              <img className="img-fluid" src={imgIcon} alt=""/>
            </Col>
            <Col xs={10} sm={11}>
              <span>{this.props.intl.formatMessage({id: 'add_photo'})}</span>
            </Col>
          </Row>
          <Upload/>
          <Row className='vidField'>
            <Col xs={2} sm={1}>
              <img className="img-fluid" src={vidIcon} alt=""/>
            </Col>
            <Col xs={10} sm={11}>
              <p>{this.props.intl.formatMessage({id: 'add_video'})}</p>
              <Field name='vidURL' component={renderTextField} placeholder={this.props.intl.formatMessage({id: 'paste_video'})}  type='text' />
            </Col>
          </Row>
          <Row className='locationField pb-1'>
            <Col xs={2} sm={1}>
              <img className="img-fluid" src={locationIcon} alt=""/>
            </Col>
            <Col xs={10} sm={11}>
              <span>{this.props.intl.formatMessage({id: 'add_location'})}</span>
              <Field name="location" component={renderGeoField}  />
            </Col>
          </Row>
          <FormGroup className='relatedCases pb-1'>
            <Label>{this.props.intl.formatMessage({id: 'related_cases'})}</Label>
            <AutoComplete hintText={this.props.intl.formatMessage({id: 'search_related_cases'})} dataSource={this.props.cases} />
          </FormGroup>
          <RaisedButton onClick={handleSubmit} type="submit" label={this.props.intl.formatMessage({id: 'submit'})} primary={true} />
        </Form>
      </Container>
    )
  }
}

export default injectIntl(ItemForm)
