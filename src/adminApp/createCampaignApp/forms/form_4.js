import React, { Component} from 'react'
import { Field, reduxForm, formValueSelector, change } from 'redux-form'
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import MenuItem from 'material-ui/MenuItem'
import { connect } from "react-redux"
import submit from "./submit"
import DatePicker from 'material-ui/DatePicker';

const renderError = ({ input, meta: { touched, error } }) => (
  <div style={{color: "red"}}>
    {touched ? <span>{error}</span> : ""}
  </div>
)

class ParentSalary extends Component{

  constructor(props) {
    super(props);
    this.handleStartDateChange = this.handleStartDateChange.bind(this)
    this.handleAdvertFinishChange = this.handleAdvertFinishChange.bind(this)
    this.formatDate = this.formatDate.bind(this)

    this.state = {
      jobStartDate: null,
      jobStartDateFormatted: null,
      jobAdvertFinishDate: null,
      jobAdvertFinishDateFormatted: null
    };
  }


  formatDate(date){
    return date.getFullYear() + "-" + ('0' + (date.getMonth()+1)).slice(-2) + "-" + ('0' + (date.getDate()+1)).slice(-2);
  }


  handleStartDateChange(event, date){
    this.setState({
      jobStartDate: date
    }, ()=>{
      this.setState({
        jobStartDateFormatted: this.formatDate(this.state.jobStartDate)
      }, ()=>{
        this.props.dispatch(change('admin', 'job_start_date', this.state.jobStartDateFormatted));
      })
    })
  }

  handleAdvertFinishChange(event, date){
    this.setState({
      jobAdvertFinishDate: date
    }, ()=>{
      this.setState({
        jobAdvertFinishDateFormatted: this.formatDate(this.state.jobAdvertFinishDate)
      }, ()=>{
        this.props.dispatch(change('admin', 'job_advert_finish_date', this.state.jobAdvertFinishDateFormatted));
      })
    })
  }

  render(){
    const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Row center="xs" style={{height: 360}}>
          <Col xs={10} sm={10} md={3} lg={5}>
            <DatePicker
              hintText="Job start date"
              value={this.state.jobStartDate}
              onChange={this.handleStartDateChange}
              formatDate={this.formatDate}
            />
            <DatePicker
              hintText="Job advert finish date"
              value={this.state.jobAdvertFinishDate}
              onChange={this.handleAdvertFinishChange}
              formatDate={this.formatDate}
            />
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
            label="Next"
            primary={true}
            style={styles.raisedButtonStyle}
          />
        </Row>
      </form>
    )
  }
}

ParentSalary = reduxForm({
  form: 'admin',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  onSubmit: submit,
})(ParentSalary)

const selector = formValueSelector('admin') // <-- same as form name
ParentSalary = connect(
  state => {
    const salaryType = selector(state, 'salaryType')
    return {
      salaryType
    }
  }
)(ParentSalary)

export default ParentSalary
