import React from 'react'
import {Link} from 'react-router'
import { Container, Row, Col } from 'reactstrap'
import './QuickSubmitPicker.css'

const QuickSubmitPicker = (props) =>
  <div>
    <Container>
      <Row className='select-type' >
        <h2>Select type</h2>
        <Col xs={{ size: 10, offset: 1 }}>
          <Link to={`${props.location.pathname}/case`}><p>Case</p></Link>
          <Link to={`${props.location.pathname}/method`}><p>Method</p></Link>
          <Link to={`${props.location.pathname}/organization`}><p>Organization</p></Link>
          <Link to={`${props.location.pathname}/survey`}><p>Survey</p></Link>
          <Link to={`${props.location.pathname}/datase`}><p>Data Set</p></Link>
        </Col>
      </Row>  
    </Container>
  </div>

export default QuickSubmitPicker
