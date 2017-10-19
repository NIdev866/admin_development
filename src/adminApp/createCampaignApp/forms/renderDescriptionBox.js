import React from 'react'
import TextField from 'material-ui/TextField'
import {blue500, grey400} from 'material-ui/styles/colors'
import Animation from 'react-addons-css-transition-group'

const styles = {
  floatingLabelStyle: {
    color: grey400,
  },
  floatingLabelFocusStyle: {
    color: blue500,
  }
};

const renderField = ({ input, label, type, meta: { dirty, touched, error } }) => {
  return(
    <Animation
    transitionName='fade'
    transitionEnterTimeout={500}
    transitionLeaveTimeout={500}
    transitionAppear={true}
    transitionAppearTimeout={500}
    >
      <div>
        <TextField
          style={{textAlign: 'left'}}
          floatingLabelText={label}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          fullWidth={true}
          primary={true}
          multiLine={true}
          rows={6}
          {...input}
        />
        <div style={{color: "red"}}>
          {(dirty || touched) ? <span>{error}</span> : ""}
        </div>
      </div>
    </Animation>
  )
}

export default renderField
