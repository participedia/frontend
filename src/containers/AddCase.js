import CaseForm from '../components/CaseForm'
import { reduxForm } from 'redux-form'

const mapStateToProps = (state /* , ownProps */) => {
  return state.form
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (data) => {
    }
  }
}

export const fields = [ 'firstName', 'lastName', 'age', 'color', 'bio' ]

let AddCaseForm = reduxForm({
  form: 'ncase',
  fields: ['firstName', 'lastName', 'email']
}, mapStateToProps, mapDispatchToProps)(CaseForm)

export default AddCaseForm
