import React, { Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import renderDescriptionBox from './renderDescriptionBox'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'

class FormFirstPage extends Component{
 render(){
  const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
          <Row center="xs" style={{height: 360}}>
            <Col xs={10} sm={10} md={3} lg={5}>
                <Field
                  name="campaign_name"
                  type="text"
                  component={renderField}
                  label="Job Campaign Name"
                />
                <Field
                  name="job_description"
                  type="text"
                  component={renderDescriptionBox}
                  label="Job Description"
                />
                <Field
                  name="location"
                  type="text"
                  component={renderField}
                  label="Job Location"
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

export default reduxForm({
  form: 'admin', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormFirstPage)
