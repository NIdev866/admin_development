import React, { Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import MenuItem from 'material-ui/MenuItem'
import submit from "./submit"
import renderDatePicker from "./renderDatePicker"
import { connect } from 'react-redux'
import moment from "moment"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types'

const renderError = ({ input, meta: { touched, error } }) => (
  <div style={{color: "red"}}>
    {touched ? <span>{error}</span> : ""}
  </div>
)

class DatePickerParent extends Component {
  static propTypes = {
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.bool,
    }),
    placeholder: PropTypes.string,
  }
  static defaultProps = {
    placeholder: ''
  }
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (date) {
    this.props.input.onChange(moment(date).format('DD-MM-YYYY'))
  }
  render () {
    const {
      input,
      meta: {touched, error}
    } = this.props
    return (
      <div style={{zIndex: "9999999"}}>
        <DatePicker
          {...input}
          placeholderText="Start date"
          dateFormat="DD-MM-YYYY"
          selected={input.value ? moment(input.value, 'DD-MM-YYYY') : null}
          onChange={this.handleChange}
        />
        {touched && error && <span style={{color: "red"}}>{error}</span>}
      </div>
    )
  }
}

class formFive extends Component{
 render(){
  const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Row center="xs" style={{height: 360}}>
          <Col xs={10} sm={10} md={3} lg={5}>

          <h1>FINALIZATION</h1>

          <p>After submitting, applicants will automatically be able to apply for this position.</p>

          </Col>
        </Row>
        <Row center="xs">
          <RaisedButton
            type="button"
            label="Prev"
            primary={true}
            onClick={previousPage}
            style={styles.raisedButtonStyle}
          />
          <RaisedButton
            type="submit"
            label="Submit"
            primary={true}
            style={styles.raisedButtonStyle}
          />
        </Row>
      </form>
    )
  }
}

export default reduxForm({
  form: 'admin',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  onSubmit: submit,
  enableReinitialize: true
})(formFive);