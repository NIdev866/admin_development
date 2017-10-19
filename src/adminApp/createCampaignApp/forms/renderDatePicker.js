import React from 'react'
import DatePicker from 'material-ui/DatePicker'
import Animation from 'react-addons-css-transition-group'

const renderError = ({ input, meta: { touched, error } }) => (
  <div style={{color: "red"}}>
    {touched ? <span>{error}</span> : ""}
  </div>
)

const renderDatePicker = ({ input, label, type, meta: { dirty, touched, error } }) => {
  return(
    <Animation
    transitionName='fade'
    transitionEnterTimeout={500}
    transitionLeaveTimeout={500}
    transitionAppear={true}
    transitionAppearTimeout={500}
    >
      <div>
        <DatePicker
          hintText="Start date"
          
        />
        <div style={{color: "red"}}>
          {(dirty || touched) ? <span>{error}</span> : ""}
        </div>
      </div>
    </Animation>
  )
}

export default renderDatePicker