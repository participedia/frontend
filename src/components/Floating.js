import React from 'react' // eslint-disable-line no-unused-vars
// import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router'
import './Floating.css'

const style = {
  margin: 12
}

const Floating = (props) => (
  <div className='floating-button'>
  	<Link to={props.link}>
  		P
  	</Link>
  </div>
)

export default Floating
