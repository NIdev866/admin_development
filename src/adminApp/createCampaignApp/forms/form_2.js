import React, { Component, PropTypes} from 'react'
import { Field, reduxForm, change } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import renderDescriptionBox from './renderDescriptionBox'
import RaisedButton from 'material-ui/RaisedButton'
import styles from './form_material_styles'
import { Row, Col } from 'react-flexbox-grid'

import Editor, { createEditorStateWithText } from 'draft-js';

import RichTextEditor from 'react-rte';

var marked = require('marked');






const renderError = ({ input, meta: { touched, error } }) => (
  <div style={{color: "red"}}>
    {touched ? <span>{error}</span> : ""}
  </div>
)





class MyStatefulEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    valueForEditor: RichTextEditor.createEmptyValue(),
    valueStringified: ''
  }

  onChange = (valueForEditor) => {


    this.props.dispatch(change('admin', 'job_description', valueForEditor.toString('html')));


    this.setState({
      valueForEditor,
      valueStringified: valueForEditor.toString('html')
    });
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        valueForEditor.toString('html')
      );
    }
  };

  render () {

    if(document.getElementById("destination")){
      document.getElementById("destination").innerHTML = marked(this.state.valueStringified)
    }

    return (
      <div>
        <div style={{textAlign: 'left', color: 'rgb(189,189,189)', marginTop: '15px'}}>Job description</div>
        <RichTextEditor
          value={this.state.valueForEditor}
          onChange={this.onChange}
        />
        <div id="destination"></div>
      </div>
    );
  }
}














class FormSecondPage extends Component{

 render(){
  const { handleSubmit, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div style={{height: 'auto'}}>
                <Field
                  name="campaign_name"
                  type="text"
                  component={renderField}
                  label="Job Campaign Name"
                />





<div style={{marginTop: '100px', margin: "0 auto", marginBottom: '30px'}}>
  


    <MyStatefulEditor dispatch={this.props.dispatch}/>

    <Field name="job_description" component={renderError} />


</div>









{/*                <Field
                  name="job_description"
                  type="text"
                  component={renderDescriptionBox}
                  label="Job Description"
                />*/}


                <Field
                  name="location"
                  type="text"
                  component={renderField}
                  label="Job Location"
                />
        </div>
        <div style={{marginTop: '30px'}}>
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
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'admin', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FormSecondPage)