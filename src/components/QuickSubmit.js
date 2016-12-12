import React from 'react'
import { connect } from 'react-redux'
import ItemForm from './ItemForm'
import { Container, Row, Col } from 'reactstrap'
import './QuickSubmit.css'

class _QuickSubmit extends React.Component {

  constructor(props) {
    super(props)
    // getinitialState
    this.state = {
      pickedItem: undefined,
    }
  }

  handleSubmit = (values) => {
    // Do something with the form values
    console.log("this.props", this.props)
    // return api.fetchNouns(noun)
    //   .then(function (response) {
    //     dispatch(receiveNouns(noun, response))
    //   },
    //   function (err) {
    //     console.log('got an error in loadNouns', err)
    //   })
    // console.log(values)
  }

  resetItem() {
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
    )
  }
}


const mapStateToProps = (state) => {
  let props =  {
    quicksubmit: state.form.quicksubmit
  }
  return props
}

export default connect(
  mapStateToProps
)(_QuickSubmit)

