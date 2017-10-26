import React, { Component } from 'react';
import _ from 'lodash'
import * as actions from '../../actions'
import { connect } from "react-redux"
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import globalThemes from '../../style/globalThemes.js'
import globalFonts from '../../style/globalFonts.js'
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';


import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import ReactHtmlParser from 'react-html-parser'

const google = window.google

class ApplicantsTabParent extends Component {
  constructor(props){
    super(props)
    this.createDistance = this.createDistance.bind(this)
    this.state = {
      boxesTicked: 0,
      archiveCampaignModalOpen: false,
      heartButtonModalOpen: false,
      banJobseekerModalOpen: false,

      campaignDescriptionModalOpen: false,
      currectCampaignDescription: null,

      jobseekerForHeartButton: null
    }
    this.closeArchiveCampaignModal = this.closeArchiveCampaignModal.bind(this)
    this.handleArchivingCampaign = this.handleArchivingCampaign.bind(this)
    this.openHeartButtonModal = this.openHeartButtonModal.bind(this)
    this.closeHeartButtonModal = this.closeHeartButtonModal.bind(this)
    this.handleHeartButton = this.handleHeartButton.bind(this)
    this.openBanJobseekerModal = this.openBanJobseekerModal.bind(this)
    this.closeBanJobseekerModal = this.closeBanJobseekerModal.bind(this)
    this.handleJobseekerBanning = this.handleJobseekerBanning.bind(this)

    this.openCampaignDescriptionModal = this.openCampaignDescriptionModal.bind(this)
    this.closeCampaignDescriptionModal = this.closeCampaignDescriptionModal.bind(this)
  }
  localFetchAllJobseekersByCampaignId(){
    if(this.props.allCampaigns && !this.props.jobseekersByCampaign){
      let allCampaignsToBeMapped = this.props.allCampaigns
      allCampaignsToBeMapped.map((campaign)=>{
        this.props.fetchAllJobseekersByCampaignId(campaign.campaign_id)
      })
    }
  }
  localNestJobseekersIntoCampaigns(){
    if(this.props.allCampaigns && this.props.jobseekersByCampaign){
      if(this.props.allCampaigns.length == this.props.counterOfJobseekersByCampaignIdToFixGlitch){
        if(!this.props.campaignsWithNestedJobseekers){
          this.props.nestJobseekersIntoCampaigns()
        }
      }
    }
  }
  afterClickFetchAllJobseekersByCampaignId(){
    this.props.clearAllJobseekersState()
  }
  formatSalaryType(salary_type){
    switch(salary_type){
      case 'PER_HOUR':
        return 'per hour'
      case 'PER_DAY':
        return 'per day'
      case 'PER_WEEK':
        return 'per week'
      case 'PER_ANNUM':
        return 'per annum'
    }
  }
  formatJobType(job_type){
    switch(job_type){
      case 'FULL_TIME':
        return 'Full-Time'
      case 'PART_TIME':
        return 'Part-Time'
      case 'TEMPORARY':
        return 'Temporary'
      case 'CONTRACT':
        return 'Contract'
    }
  }
  openArchiveCampaignModal(campaign){
    this.setState({
      archiveCampaignModalOpen: true,
      campaign_nameImArchiving: campaign.campaign_name,
      campaignImArchiving: campaign
    });
  }
  closeArchiveCampaignModal(){
    this.setState({archiveCampaignModalOpen: false});
  };


 //WILL probably have to pass whole campaign object and change campaign.campaign_status to 'archived'

  handleArchivingCampaign(){
    this.props.resetToZeroCounterOfJobseekersByCampaignIdToFixGlitch()
    setTimeout(()=>{this.props.clearAllCampaigns()},400)
    this.props.archiveCampaign(this.state.campaignImArchiving)
    this.props.clearNestedCampaignsWithJobseekersState()
    //this.props.resetToZeroCounterOfJobseekersByCampaignIdToFixGlitch()
    //this.afterClickFetchAllJobseekersByCampaignId()
  }


/*  handleArchivingCampaign(){
    this.props.resetToZeroCounterOfJobseekersByCampaignIdToFixGlitch()
    setTimeout(()=>{this.props.clearAllCampaigns()},400)
    this.props.archiveCampaign(this.state.campaignImArchiving)
    this.props.clearNestedCampaignsWithJobseekersState()
    //this.props.resetToZeroCounterOfJobseekersByCampaignIdToFixGlitch()
    //this.afterClickFetchAllJobseekersByCampaignId()
  }*/

  openHeartButtonModal(jobseeker){
    this.setState({
      heartButtonModalOpen: true,
      jobseekerForHeartButton: jobseeker,
      firstNameOfPersonToLike: jobseeker.first_name,
      lastNameOfPersonToLike: jobseeker.last_name,
    });
  }
  closeHeartButtonModal(){
    this.setState({heartButtonModalOpen: false});
  }
  handleHeartButton(){
    this.state.jobseekerForHeartButton.job_status = 'selected'
    this.props.updateJobseekerJobStatus(this.state.jobseekerForHeartButton)
    this.props.resetToZeroCounterOfJobseekersByCampaignIdToFixGlitch()
    this.afterClickFetchAllJobseekersByCampaignId()
    this.setState({heartButtonModalOpen: false});
    this.props.fetchWorkforce()
  }
  openBanJobseekerModal(jobseeker){
    this.setState({
      banJobseekerModalOpen: true,
      jobseekerForBanning: jobseeker,
      firstNameOfPersonToBan: jobseeker.first_name,
      lastNameOfPersonToBan: jobseeker.last_name,
    });
  }
  closeBanJobseekerModal(){
    this.setState({banJobseekerModalOpen: false});
  }
  handleJobseekerBanning(){
    this.state.jobseekerForBanning.job_status = 'banned'
    this.props.updateJobseekerJobStatus(this.state.jobseekerForBanning)
    this.props.resetToZeroCounterOfJobseekersByCampaignIdToFixGlitch()
    this.afterClickFetchAllJobseekersByCampaignId()
    this.setState({banJobseekerModalOpen: false});
  }
  createDistance(campaignLat, campaignLng, campaignIndex, postal_code, jobseekerIndex){
    let geocoder = new google.maps.Geocoder();
    if(!this.state[`geocodedPostcode${campaignIndex},${jobseekerIndex}`]){
      geocoder.geocode({'address': postal_code}, (results, status)=> {
        if (status === 'OK') {
          this.setState({
            [`geocodedPostcode${campaignIndex},${jobseekerIndex}`]: results[0].geometry.location
          }, ()=>{
            let resultDistance
            let DistanceService = new google.maps.DistanceMatrixService();
            DistanceService.getDistanceMatrix({
                origins: [{lat: campaignLat, lng: campaignLng}],
                destinations: [this.state[`geocodedPostcode${campaignIndex},${jobseekerIndex}`]],
                travelMode: 'DRIVING',
                avoidHighways: false,
                avoidTolls: false,
              }, (result, status) => { 
                if(result && result.rows[0].elements[0].distance){
                  resultDistance = result.rows[0].elements[0].distance.text
                  if(!this.state[`distance${campaignIndex},${jobseekerIndex}`]){
                    this.setState({    // prevState?
                      [`distance${campaignIndex},${jobseekerIndex}`]: resultDistance
                    })
                  }
                }
              })
            })
        }
        else{
          //console.log('error in postcode decoding')
        }
      })
    }
  }
  openCampaignDescriptionModal(campaign){
    this.setState({
      campaignDescriptionModalOpen: true,
      currectCampaignDescription: campaign.job_description
    })
  }
  closeCampaignDescriptionModal(){
    this.setState({campaignDescriptionModalOpen: false})
  }
  render() {
    const archiveCampaignActions = [
      <FlatButton
        label="No"
        primary={true}
        onClick={this.closeArchiveCampaignModal}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        onClick={this.handleArchivingCampaign}
      />,
    ];
    const heartButtonActions = [
      <FlatButton
        label="No"
        primary={true}
        onClick={this.closeHeartButtonModal}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        onClick={this.handleHeartButton}
      />,
    ];
    const banJobseekerActions = [
      <FlatButton
        label="No"
        primary={true}
        onClick={this.closeBanJobseekerModal}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        onClick={this.handleJobseekerBanning}
      />,
    ];
    const campaignDescriptionActions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.closeCampaignDescriptionModal}
      />
    ]
    const cardStyle = {
      marginTop: "20px",
      backgroundColor: globalThemes.blueGrey400
    }
    if(!this.props.allCampaigns){
      this.props.fetchAllCampaigns()
    }
    this.localFetchAllJobseekersByCampaignId()
    this.localNestJobseekersIntoCampaigns()
    return(
      <div style={{margin: '0 auto', backgroundColor: globalThemes.blueGrey500, marginBottom: '30px'}}>
        <Dialog
          actions={archiveCampaignActions}
          modal={false}
          open={this.state.archiveCampaignModalOpen}
          onRequestClose={this.closeArchiveCampaignModal}
        >
        {`Are you sure you want to archive the campaign titled "${this.state.campaign_nameImArchiving}"?`}
        </Dialog>
        <Dialog
          actions={heartButtonActions}
          modal={false}
          open={this.state.heartButtonModalOpen}
          onRequestClose={this.closeHeartButtonModal}
        >
        {`Are you sure you like ${this.state.firstNameOfPersonToLike} ${this.state.lastNameOfPersonToLike}?`}
        </Dialog>
        <Dialog
          actions={banJobseekerActions}
          modal={false}
          open={this.state.banJobseekerModalOpen}
          onRequestClose={this.closeBanJobseekerModal}
        >
        {`Are you sure you want to ban ${this.state.firstNameOfPersonToBan} ${this.state.lastNameOfPersonToBan}?`}
        </Dialog>
        <Dialog
          actions={campaignDescriptionActions}
          modal={false}
          open={this.state.campaignDescriptionModalOpen}
          onRequestClose={this.closeCampaignDescriptionModal}
        >
        <div style={{textAlign: 'left'}}>
        {ReactHtmlParser(this.state.currectCampaignDescription)}
        </div>
        </Dialog>
        {this.props.campaignsWithNestedJobseekers ? this.props.campaignsWithNestedJobseekers.map((campaign, campaignIndex)=>{
          if(campaign.campaign_status !== 'archived'){
            return(
              <div>
                <Card style={cardStyle}>
                  <CardHeader
                    style={{textAlign: "left", backgroundColor: globalThemes.blueGrey400, color: globalThemes.white}}
                    actAsExpander={true}
                    showExpandableButton={true}
                    iconStyle={{position: "relative", left: "12px", color: globalThemes.white}}
                  >
                {this.props.width > 700 
                  ?
                  <p style={{fontFamily: 'Poiret One', fontSize: "18px", margin: "-10px", marginTop: "-30px", padding: "0"}}><b>{campaign.campaign_name}</b></p>
                  :
                  <div style={{width: '50px'}}>
                    <p style={{fontFamily: 'Poiret One', fontSize: "18px", margin: "-10px", marginTop: "-30px", padding: "0"}}><b>{campaign.campaign_name.substring(0,30)}</b></p>
                    <p style={{fontFamily: 'Poiret One', fontSize: "18px", margin: "-10px", marginTop: "10px", padding: "0"}}><b>{campaign.campaign_name.substring(30)}</b></p>
                  </div>
                }
                    <p style={{fontFamily: 'Mukta', fontSize: "15px", margin: "-15px", marginLeft: '0px', marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{campaign.location}</p>
                    <p style={{fontFamily: 'Mukta', fontSize: "15px", margin: "-15px", marginLeft: '0px', marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{this.formatJobType(campaign.job_type)}</p>
                    <p style={{fontFamily: 'Mukta', fontSize: "15px", margin: "-15px", marginLeft: '0px', marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{campaign.salary + " " + this.formatSalaryType(campaign.salary_type)}</p>
                    <p style={{fontFamily: "Mukta", fontSize: "15px", margin: "-15px", marginLeft: '0px', marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{campaign.job_start_date ? `Starting on ${campaign.job_start_date}` : "Starting on 13/07/2017"}</p>
                  <div style={{position: 'absolute', top: 0, right: 0, 
                  width: '20px', height: '20px',
                  margin: '9px', zIndex: 3}}>
                    <div style={{marginTop: '-5px', zIndex: 3}} onClick={this.openArchiveCampaignModal.bind(this, campaign)}>
                      <FontIcon className="material-icons" color="white">clear</FontIcon>
                    </div>
                  </div>








                  <div>
                    <FlatButton
                      style={{fontFamily: 'Mukta', position: 'absolute', right: 0, bottom: 0, 
                      zIndex: 3, textAlign: 'left', paddingLeft: '7px', 
                      color: 'white', border: '1px solid white', height: '30px', 
                      lineHeight: 0, margin: '5px'}}
                      onClick={this.openCampaignDescriptionModal.bind(this, campaign)}
                    >
                    Description
                    </FlatButton>
                  </div>







                  </CardHeader>
                  <CardText expandable={true} style={{color: 'white', paddingBottom: "1px", paddingTop: "1px", backgroundColor: globalThemes.blueGrey400}}>
                    {campaign.jobseekers[0] && campaign.jobseekers[0].map((jobseeker, jobseekerIndex)=>{
                      if(jobseeker.postal_code){
                        this.createDistance(
                          parseFloat(campaign.lat), 
                          parseFloat(campaign.lng), 
                          campaignIndex,
                          jobseeker.postal_code,
                          jobseekerIndex
                        )
                      }
                      if(jobseeker.job_status !== 'banned' && 
                         jobseeker.job_status !== 'archived' && 
                         jobseeker.job_status !== 'selected'){
                        return (
                          <Card style={{marginBottom: '10px', position: 'relative', backgroundColor: globalThemes.blueGrey300}}>
                            <CardHeader
                              style={{color: 'white', textAlign: "left", backgroundColor: globalThemes.blueGrey300, paddingBottom: '10px'}}
                              actAsExpander={true}
                              showExpandableButton={true}
                              iconStyle={{position: "relative", left: "12px", color: 'white'}}
                            >
                              <p style={{fontFamily: 'Poiret One', fontSize: "16px", margin: "-10px", marginTop: "-30px", padding: "0"}}><b>{jobseeker.first_name + ' ' + jobseeker.last_name}</b></p>
                              <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{'Age range ' + jobseeker.age}</p>
                              {jobseeker.postal_code && this.state[`distance${campaignIndex},${jobseekerIndex}`] !== undefined &&
                                <p style={{fontFamily: globalFonts.Abel, 
                                  fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", 
                                  color: "#DEDEDE"}}>Distance: {this.state[`distance${campaignIndex},${jobseekerIndex}`] + " away"}</p>
                              }
                              <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{jobseeker.email_id}</p>
                              <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{jobseeker.contact_no}</p>
                            </CardHeader>
                            <CardText expandable={true} style={{color: 'white', textAlign: 'left', paddingBottom: "11px", paddingTop: "1px", backgroundColor: globalThemes.blueGrey300}}>
                              <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "0px", padding: "0", color: "#DEDEDE"}}>Nationality: {jobseeker.nationality}</p>
                              <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{jobseeker.when_to_start_work}</p>
                              <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>English level: {jobseeker.english_level}</p>
                            </CardText>
                            <div>
                              {jobseeker.job_status !== 'shortlisted' ?
                                <div style={{position: 'absolute', top: 0, right: '50px', zIndex: '2', cursor: 'pointer'}}
                                  onClick={() => {
                                  jobseeker.job_status = 'shortlisted'
                                  this.props.updateJobseekerJobStatus(jobseeker)
                                  this.props.resetToZeroCounterOfJobseekersByCampaignIdToFixGlitch()
                                  this.afterClickFetchAllJobseekersByCampaignId()
                                }}>
                                  <FontIcon className="material-icons" color="rgb(185,185,185)">call</FontIcon>
                                </div>
                                :
                                <div style={{position: 'absolute', top: 0, right: '50px'}}>
                                  <FontIcon className="material-icons" color="white">call</FontIcon>
                                </div>
                              }
                            </div>
                            <div>
                            {jobseeker.job_status === 'applied' || jobseeker.job_status === 'shortlisted'? 
                            <div 
                              style={{position: 'absolute', top:'0px', right: '20px', width: '30px', zIndex: '2', cursor: 'pointer'}}
                              onClick={() => {
                                this.openHeartButtonModal(jobseeker)
                              }}>
                              <ActionFavorite color="rgb(185,185,185)"/>
                            </div>
                            :
                            <div style={{position: 'absolute', top:'0px', right: '20px', width: '30px'}}>
                              <ActionFavorite color="white"/>
                            </div>
                            }
                            </div>
                            <div>
                            {jobseeker.job_status !== 'banned' ? 
                              <div style={{position: 'absolute', top: 0, right: 0, width: '20px', height: '20px',margin: '5px', cursor: 'pointer', zIndex: 2}}
                                onClick={() => {
                                  this.openBanJobseekerModal(jobseeker)
                                }}>
                                <div style={{marginTop: '-5px'}}>
                                  <FontIcon className="material-icons" color="rgb(185,185,185)">clear</FontIcon>
                                </div>
                              </div>
                              :
                              <div style={{position: 'absolute', top: 0, right: 0, 
                                width: '20px', height: '20px',
                                margin: '5px'}}>
                                <div style={{marginTop: '-5px'}}>
                                  <FontIcon className="material-icons" color="white">clear</FontIcon>
                                </div>
                              </div>
                            }
                            </div>
                          </Card>
                        )
                      }
                      })
                    }
                  </CardText>
                }
              </Card>
            </div>
          )
        }
      })
      :
        <div style={{paddingTop: 'calc(50% - 140px)'}}>
          <CircularProgress color="white" size={80}  thickness={7}/>
        </div>
      }
      </div>
    )
  }
}



function mapStateToProps(state) {
  return {
    allCampaigns: state.main.allCampaigns,
    jobseekersByCampaign: state.main.jobseekersByCampaign,
    campaignsWithNestedJobseekers: state.main.campaignsWithNestedJobseekers,
    counterOfJobseekersByCampaignIdToFixGlitch: state.main.counterOfJobseekersByCampaignIdToFixGlitch
  };
}

export default connect(mapStateToProps, actions)(ApplicantsTabParent)