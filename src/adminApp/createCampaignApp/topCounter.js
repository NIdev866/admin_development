import React, { Component } from "react"

const circleStyle = {
  display: "inline-block",
  borderRadius: "50%",
  border: "2px solid",
  width: "23px",
  height: "23px",
  margin: "5px",
  fontSize: "18px",
  boxShadow: "0px 2px 5px 2px rgba(0, 0, 0, 0.2)",
}

const colouredBg = {
  backgroundColor: "#00BCD4"
}

const emptyBg = {
  backgroundColor: "#fff"
}

const arrows = {
  display: "inline-block",
  margin: "-6px"
}

class TopCounter extends Component {
  render(){
    const bgColorOne = this.props.finishedStep <= 0 ? emptyBg : colouredBg
    const bgColorTwo = this.props.finishedStep <= 1 ? emptyBg : colouredBg
    const bgColorThree = this.props.finishedStep <= 2 ? emptyBg : colouredBg
    const bgColorFour = this.props.finishedStep <= 3 ? emptyBg : colouredBg
    const bgColorFive = this.props.finishedStep <= 4 ? emptyBg : colouredBg
    return(
      <div style={{marginLeft: "0px", width: "210px", overflow: "hidden"}}>
        <div style={{...circleStyle, ...bgColorOne}} ><h4 style={{"marginTop": "2px"}}>1</h4></div>
        <div style={arrows}>&#10140;</div>
        <div style={{...circleStyle, ...bgColorTwo}}><h4 style={{"marginTop": "2px"}}>2</h4></div>
        <div style={arrows}>&#10140;</div>
        <div style={{...circleStyle, ...bgColorThree}}><h4 style={{"marginTop": "2px"}}>3</h4></div>
        <div style={arrows}>&#10140;</div>
        <div style={{...circleStyle, ...bgColorFour}}><h4 style={{"marginTop": "2px"}}>4</h4></div>
        <div style={arrows}>&#10140;</div>
        <div style={{...circleStyle, ...bgColorFive}}><h4 style={{"marginTop": "2px"}}>5</h4></div>
      </div>
    )}
}

export default TopCounter