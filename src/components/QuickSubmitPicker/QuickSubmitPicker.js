import React from 'react'
import {Link} from 'react-router'
import { Container, Row, Col } from 'reactstrap'
import {injectIntl} from 'react-intl'
import './QuickSubmitPicker.css'

const QuickSubmitPicker = (props) =>
  <div>
    <Container>
      <Row className='select-type' >
        <h2>Select type</h2>
        <Col xs={{ size: 10, offset: 1 }} lg={{ size: 4, offset: 4 }} md={{ size: 6, offset: 3 }}>
          <Link to={`${props.location.pathname}/case`}><p>{this.props.intl.formatMessage({id: 'case'})}</p></Link>
          <Link to={`${props.location.pathname}/method`}><p>{this.props.intl.formatMessage({id: 'method'})}</p></Link>
          <Link to={`${props.location.pathname}/organization`}><p>{this.props.intl.formatMessage({id: 'organization'})}</p></Link>
          <Link to={`${props.location.pathname}/survey`}><p>{this.props.intl.formatMessage({id: 'survey'})}</p></Link>
          <Link to={`${props.location.pathname}/dataset`}><p>{this.props.intl.formatMessage({id: 'dataset'})}</p></Link>
        </Col>
      </Row>  
    </Container>
  </div>

export default injectIntl(QuickSubmitPicker)
