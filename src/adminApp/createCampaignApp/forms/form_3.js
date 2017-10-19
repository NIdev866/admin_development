import React, { Component} from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'
import { RadioButtonGroup, SelectField } from "redux-form-material-ui"
import MenuItem from 'material-ui/MenuItem'
import { connect } from 'react-redux'
import renderField from './renderField'


const renderError = ({ input, meta: { touched, error } }) => (
  <div style={{color: "red"}}>
    {touched ? <span>{error}</span> : ""}
  </div>
)




class PerHourChosen extends Component{
  render(){
    return(
      <span>
      £
        <span style={{display: "inline-block", width: "150px", marginLeft: "5px"}}>
        <Field
          name="salary"
          type="text"
          component={renderField}
          label="Enter salary"
        />
        </span>
        Per Hour
      </span>
    )
  }
}

class DailyChosen extends Component{
  render(){
    return(
      <span>
      £
        <span style={{display: "inline-block", width: "150px", marginLeft: "5px"}}>
        <Field
          name="salary"
          type="text"
          component={renderField}
          label="Enter salary"
        />
        </span>
        Per Day
      </span>
    )
  }
}

class WeeklyChosen extends Component{
  render(){
    return(
      <span>
      £
        <span style={{display: "inline-block", width: "150px", marginLeft: "5px"}}>
        <Field
          name="salary"
          type="text"
          component={renderField}
          label="Enter salary"
        />
        </span>
        Per Week
      </span>
    )
  }
}

class PerAnnumChosen extends Component{
  render(){
    return(
      <span>
      £
        <span style={{display: "inline-block", width: "150px", marginLeft: "5px"}}>
        <Field
          name="salary"
          type="text"
          component={renderField}
          label="Enter salary"
        />
        </span>
        Per Annum
      </span>
    )
  }
}




class FormFirstPage extends Component{

  constructor(props){
    super(props)
    this.salaryTypeChosen = this.salaryTypeChosen.bind(this)
  }

  salaryTypeChosen(){
    if(this.props.salary_type === "PER_ANNUM"){
      return <PerAnnumChosen/>
    }
    else if(this.props.salary_type === "PER_WEEK"){
        return <WeeklyChosen/>
    }
    else if(this.props.salary_type === "PER_DAY"){
      return <DailyChosen/>
    }
    else if(this.props.salary_type === "PER_HOUR"){
      return <PerHourChosen/>
    }
  }


  render(){
    const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Row center="xs" style={{height: 360}}>
          <Col xs={10} sm={10} md={3} lg={5}>
            <Field name="job_type" component={SelectField} 
                selectedMenuItemStyle={{color: "#00BCD4"}} 
                underlineStyle={{display: "none"}} errorStyle={{display: "none"}} 
                hintText="Job type">
              <MenuItem value="FULL_TIME" primaryText="Full-time"/>
              <MenuItem value="PART_TIME" primaryText="Part-time"/>
              <MenuItem value="TEMPORARY" primaryText="Temporary"/>
              <MenuItem value="CONTRACT" primaryText="Contract"/>
            </Field>
            <Field name="job_type" component={renderError} />
                        <div style={{marginTop: "30px", marginBottom: "30px", color: 'white'}}>
              <Field name="salary_type" component={SelectField} 
                  selectedMenuItemStyle={{color: "#00BCD4"}} 
                  underlineStyle={{display: "none"}} errorStyle={{display: "none"}} 
                  hintText="Salary type">
                <MenuItem value="PER_ANNUM" primaryText="Per Annum"/>
                <MenuItem value="PER_WEEK" primaryText="Per Week"/>
                <MenuItem value="PER_DAY" primaryText="Per Day"/>
                <MenuItem value="PER_HOUR" primaryText="Per Hour"/>
              </Field>
              <Field name="salary_type" component={renderError} />
            </div>
            {this.salaryTypeChosen()}
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






FormFirstPage = reduxForm({
  form: 'admin',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormFirstPage)

const selector = formValueSelector('admin') // <-- same as form name
FormFirstPage = connect(
  state => {
    const salary_type = selector(state, 'salary_type')
    return {
      salary_type
    }
  }
)(FormFirstPage)

export default FormFirstPage
