import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router'

const style = {
  margin: 12
}

const Add = () => (
  <div styleName='addForm'>
    <h3>Adding new cases to Participedia</h3>
    <RaisedButton label='New Case'
      style={style} primary
      linkButton containerElement={<Link to='/en-US/add/case' />} />
    <RaisedButton label='New Method' style={style} primary />
    <RaisedButton label='New Organization' style={style} primary />
  </div>
)

export default Add
