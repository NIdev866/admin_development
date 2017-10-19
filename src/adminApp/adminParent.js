import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Grid, Row, Col } from 'react-flexbox-grid'
import styles from './createCampaignApp/forms/form_material_styles'
import Animation from 'react-addons-css-transition-group'
import { config } from "dotenv"
import { Marker, GoogleMap, DirectionsRenderer } from "react-google-maps"
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import ReactResizeDetector from 'react-resize-detector';
import { Redirect } from 'react-router'
import {connect} from 'react-redux'



import { fetchAllCampaigns, fetchCompanies } from '../actions'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MapComponent from "./mapComponent"
import TabComponent from "./tabComponent"

import globalThemes from '../style/globalThemes.js'
import globalFonts from '../style/globalFonts.js'


config()
const google = window.google




class AdminParent extends Component {
  constructor(props){
    super(props)
    this.state = {
      slider: "closed",
      tabOpen: "workforce",
      jobAdAddClicked: false,
      screenWidth: null,
    }




    this._onResize = this._onResize.bind(this)
    this.workforceClick = this.workforceClick.bind(this)
    this.applicantsClick = this.applicantsClick.bind(this)
    this.clientsClick = this.clientsClick.bind(this)
    this.statisticsClick = this.statisticsClick.bind(this)
    this.jobAdAddClick = this.jobAdAddClick.bind(this)
  }




  _onResize(width) {
    this.setState({screenWidth: width})
  }
  workforceClick(){
    if(this.state.slider == "closed"){
      this.setState({tabOpen: "workforce", slider: "open"})
    }
    else if(this.state.slider == "open" && this.state.tabOpen == "workforce"){
      this.setState({slider: "closed"})
    }
    else if(this.state.slider == "open" && this.state.tabOpen !== "workforce"){
      this.setState({tabOpen: "workforce"})
    }
  }
  applicantsClick(){
    if(this.state.slider == "closed"){
      this.setState({tabOpen: "applicants", slider: "open"})
    }
    else if(this.state.slider == "open" && this.state.tabOpen == "applicants"){
      this.setState({slider: "closed"})
    }
    else if(this.state.slider == "open" && this.state.tabOpen !== "applicants"){
      this.setState({tabOpen: "applicants"})
    }
  }
  clientsClick(){
    if(this.state.slider == "closed"){
      this.setState({tabOpen: "clients", slider: "open"})
    }
    else if(this.state.slider == "open" && this.state.tabOpen == "clients"){
      this.setState({slider: "closed"})
    }
    else if(this.state.slider == "open" && this.state.tabOpen !== "clients"){
      this.setState({tabOpen: "clients"})
    }
  }
  statisticsClick(){
    if(this.state.slider == "closed"){
      this.setState({tabOpen: "statistics", slider: "open"})
    }
    else if(this.state.slider == "open" && this.state.tabOpen == "statistics"){
      this.setState({slider: "closed"})
    }
    else if(this.state.slider == "open" && this.state.tabOpen !== "statistics"){
      this.setState({tabOpen: "statistics"})
    }
  }
  jobAdAddClick(){
    this.setState({jobAdAddClicked: true}, ()=>{setTimeout(()=>{this.setState({timeToReroute: true})}, 500)})
  }









  render() {
    const footerStyle = {
      textAlign: "center",
      position: "fixed",
      left: "0",
      bottom: "0",
      paddingBottom: "2px",
      minHeight: "40px",
      width: "100%",
      borderTop: "1px solid",
      borderColor: "#DCDCDC",
      backgroundColor: "white",
      zIndex: "8000",
      overflow: "hidden"
    }    
    let sliderStyle = {}
    if(this.state.slider == "closed"){
      sliderStyle = {
        overflow: "hidden",
        position: "absolute",
        transition: "all .2s ease-in-out",
        height: "50px",
        backgroundColor: globalThemes.blueGrey500,
        width: "100vw",
        top: "calc(100vh - 51px)",
        zIndex: '3',
      }
    }
    else{
      sliderStyle = {
        overflow: "hidden",
        position: "absolute",
        transition: "all .2s ease-in-out",
        height: "100vh",
        backgroundColor: globalThemes.blueGrey500,
        width: "100vw",
        top: "0px",
        zIndex: '3'
      }
    }
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };
    let adButtonStyle = {}
    let adTextStyle = {}
    let jobAdAddTransitionStyle = {}
    if(this.state.screenWidth > 700){
      adButtonStyle = {
        position: 'absolute',
        bottom: '40px', 
        right: '45vw',
        zIndex: '2',
        color: 'green'
      }
      adTextStyle = {
        position: 'absolute',
        bottom: '51px', 
        right: 'calc(45vw + 14px)',
        zIndex: '4',
        pointerEvents: "none", 
        fontSize: "11px",
        color: "white"
      }
      if(this.state.jobAdAddClicked){
        jobAdAddTransitionStyle = {
          transition: "all .5s ease-in-out",
          pointerEvents: "none", 
          width: "980vw",
          height: "980vw",
          backgroundColor: "white",
          zIndex: "4",
          borderRadius: "50%",
          position: 'absolute',
          bottom: '-450vh', 
          right: '-450vw',
        }
      }
      else{
        jobAdAddTransitionStyle = {
          transition: "all .5s ease-in-out",
          pointerEvents: "none", 
          width: "1px",
          height: "1px",
          backgroundColor: "rgb(0,188,212)",
          zIndex: "4",
          borderRadius: "50%",
          position: 'absolute',
          bottom: '57px', 
          right: 'calc(45vw + 18px)',
        }
      }
    }
    else{      
      adButtonStyle = {
        position: 'absolute',
        bottom: '70px', 
        right: '20px',
        zIndex: '2',
        backgroundColor: 'green'
      }
      adTextStyle = {
        position: 'absolute',
        bottom: '81px', 
        right: '34px',
        zIndex: '2',
        pointerEvents: "none", 
        fontSize: "11px",
        color: "white"
      }
      if(this.state.jobAdAddClicked){
        jobAdAddTransitionStyle = {
          transition: "all .5s ease-in-out",
          pointerEvents: "none", 
          width: "980vh",
          height: "980vh",
          backgroundColor: "white",
          zIndex: "4",
          borderRadius: "50%",
          position: 'absolute',
          bottom: '-450vh', 
          right: '-450vw',
        }
      }
      else{
        jobAdAddTransitionStyle = {
          transition: "all .5s ease-in-out",
          pointerEvents: "none", 
          width: "1px",
          height: "1px",
          backgroundColor: "rgb(0,188,212)",
          zIndex: "4",
          borderRadius: "50%",
          position: 'absolute',
          bottom: '90px', 
          right: '40px',
        }
      }
    }
    return (
      <div style={{position: "relative", width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: globalThemes.blueGrey500, fontFamily: globalFonts.Abel}}>
        <ReactResizeDetector handleWidth handleHeight onResize={this._onResize} />
        {this.state.screenWidth > 700 &&
          <div style={{float: "left", width: "60%", position: "fixed", height: "100vh"}}>
          {this.props.allCampaigns &&
            <MapComponent 
              zoom={10}
              center={{ lat: 51.537452, lng: -0.497681}}
              containerElement={<div style={{height: 100+"%"}} />}
              mapElement={<div style={{height: 100+"%"}} />}
              allCampaigns={this.props.allCampaigns}
            />
          }
          </div>
        }
        {this.state.screenWidth <= 700 &&
            <div style={{position: "absolute", height: "calc(100vh - 50px)", width: "100vw", zIndex: '1'}}>
            {this.props.allCampaigns &&
              <MapComponent 
                zoom={10}
                center={{ lat: 51.537452, lng: -0.497681}}
                containerElement={<div style={{height: 100+"%"}} />}
                mapElement={<div style={{height: 100+"%"}} />}
                allCampaigns={this.props.allCampaigns}
              />
            }
          </div>
        }
        {this.state.screenWidth > 700 &&
          <div style={{width: "calc(40% - 1px)", float: "right", borderLeft: '1px solid grey'}}>
            <TabComponent
              slider={this.state.slider}
              workforceClick={this.workforceClick}
              applicantsClick={this.applicantsClick}
              clientsClick={this.clientsClick}
              statisticsClick={this.statisticsClick}
              tabOpen={this.state.tabOpen}
             />
          </div>
        }
        {this.state.screenWidth <= 700 &&
          <div style={sliderStyle}>
            <TabComponent
              slider={this.state.slider}
              workforceClick={this.workforceClick}
              applicantsClick={this.applicantsClick}
              clientsClick={this.clientsClick}
              statisticsClick={this.statisticsClick}
              tabOpen={this.state.tabOpen}
             />
          </div>
        }
        <FloatingActionButton onClick={this.jobAdAddClick} backgroundColor={globalThemes.blueGrey500} style={adButtonStyle}>
          <div>
            <ContentAdd style={{color: "white"}}></ContentAdd>
          </div>
        </FloatingActionButton>
        <div style={adTextStyle}>JOB AD</div>
        <div style={jobAdAddTransitionStyle}></div>
        {this.state.timeToReroute && <Redirect to="/create-campaign"/>}
      </div>
    )
  }
}

AdminParent.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    allCampaigns: state.main.allCampaigns,
  };
}


export default connect(mapStateToProps, { fetchAllCampaigns, fetchCompanies })(AdminParent)
