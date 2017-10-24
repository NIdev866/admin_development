import React, { Component } from 'react';
import _ from 'lodash'
import { fetchAllCampaigns, fetchAllJobseekersByCampaignId, 
  nestJobseekersIntoCampaigns, updateJobseekerJobStatus,
  clearAllJobseekersState,actionCounterOfJobseekersByCampaignIdToFixGlitch,
resetToZeroCounterOfJobseekersByCampaignIdToFixGlitch} from '../../actions'
import { connect } from "react-redux"
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import globalThemes from '../../style/globalThemes.js'
import globalFonts from '../../style/globalFonts.js'
import {red500, yellow500, blue500} from 'material-ui/styles/colors';



const google = window.google

class ApplicantsTabParent extends Component {
  constructor(props){
    super(props)
    this.createDistance = this.createDistance.bind(this)
    this.state = {
      boxesTicked: 0,
    }
  }
  componentWillMount(){
    if(!this.props.allCampaigns){
      this.props.fetchAllCampaigns()
    }
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
  createDistance(campaignLat, campaignLng, campaignIndex, jobseekerLat, jobseekerLng, jobseekerIndex){

    console.log({campaignLat, campaignLng, campaignIndex, jobseekerLat, jobseekerLng, jobseekerIndex})


    let resultDistance
    let DistanceService = new google.maps.DistanceMatrixService();
    DistanceService.getDistanceMatrix({
        origins: [{lat: campaignLat, lng: campaignLng}],
        destinations: [{lat: jobseekerLat, lng: jobseekerLng}],
        travelMode: 'DRIVING',
        avoidHighways: false,
        avoidTolls: false,
      }, (result, status) => { 
        if(result && result.rows[0].elements[0].distance){
          resultDistance = result.rows[0].elements[0].distance.text
          if(this.state[`distance${campaignIndex},${jobseekerIndex}`] !== resultDistance)
          this.setState({    // prevState?
            [`distance${campaignIndex},${jobseekerIndex}`]: resultDistance
          })
        }
    })
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
  render() {
    const cardStyle = {
      marginTop: "20px",
      backgroundColor: globalThemes.blueGrey400
    }
    this.localFetchAllJobseekersByCampaignId()
    this.localNestJobseekersIntoCampaigns()
    return(
      <div style={{margin: '0 auto', backgroundColor: globalThemes.blueGrey500, marginBottom: '30px'}}>
        {this.props.campaignsWithNestedJobseekers && this.props.campaignsWithNestedJobseekers.map((campaign, campaignIndex)=>{
          return(
            <div>
              <Card style={cardStyle}>
                <CardHeader
                  style={{height: "110px", textAlign: "left", backgroundColor: globalThemes.blueGrey400, color: globalThemes.white}}
                  actAsExpander={true}
                  showExpandableButton={true}
                  iconStyle={{position: "relative", left: "12px", color: globalThemes.white}}
                >
                  <p style={{fontFamily: 'Poiret One', fontSize: "18px", margin: "-10px", marginTop: "-30px", padding: "0"}}><b>{campaign.campaign_name}</b></p>
                  <p style={{fontFamily: 'Mukta', fontSize: "15px", margin: "-15px", marginLeft: '0px', marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{campaign.location}</p>
                  <p style={{fontFamily: 'Mukta', fontSize: "15px", margin: "-15px", marginLeft: '0px', marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{this.formatJobType(campaign.job_type)}</p>
                  <p style={{fontFamily: 'Mukta', fontSize: "15px", margin: "-15px", marginLeft: '0px', marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{campaign.salary + " " + this.formatSalaryType(campaign.salary_type)}</p>
                  <p style={{fontFamily: "Mukta", fontSize: "15px", margin: "-15px", marginLeft: '0px', marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{campaign.job_start_date ? `Starting on ${campaign.job_start_date}` : "Starting on 13/07/2017"}</p>
                </CardHeader>
                <CardText expandable={true} style={{color: 'white', paddingBottom: "1px", paddingTop: "1px", backgroundColor: globalThemes.blueGrey400}}>
                  {campaign.jobseekers[0] && campaign.jobseekers[0].map((jobseeker, jobseekerIndex)=>{

                    if(jobseeker.lat && jobseeker.lng){
                      this.createDistance(
                        parseFloat(campaign.lat), 
                        parseFloat(campaign.lng), 
                        campaignIndex,
                        parseFloat(jobseeker.lat),
                        parseFloat(jobseeker.lng),
                        jobseekerIndex
                      )
                    }
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
                          
                          {jobseeker.lat && jobseeker.lng &&

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
                        {jobseeker.job_status == 'applied' ? 
                        <div>
                        <Checkbox
                          disableTouchRipple
                          uncheckedIcon={<ActionFavoriteBorder/>}
                          onCheck={() => {
                            jobseeker.job_status = 'selected'
                            this.props.updateJobseekerJobStatus(jobseeker)
                            this.props.resetToZeroCounterOfJobseekersByCampaignIdToFixGlitch()
                            this.afterClickFetchAllJobseekersByCampaignId()
                          }}
                          style={{position: 'absolute', top:'0px', left: 'calc(100% - 40px)', float: 'right'}}
                        /> 
                        </div>
                        :
                        <div>
                        <Checkbox
                          disableTouchRipple
                          checkedIcon={<ActionFavorite/>}
                          checked={true}
                          style={{position: 'absolute', top:'0px', left: 'calc(100% - 40px)', float: 'right'}}
                        />
                        </div>
                        }
                      </Card>
                    )})
                  }
                </CardText>
              }
            </Card>
            </div>
        )
      })}
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

export default connect(mapStateToProps, { 
  fetchAllCampaigns , 
  fetchAllJobseekersByCampaignId, 
  nestJobseekersIntoCampaigns, 
  updateJobseekerJobStatus, 
  clearAllJobseekersState,
  actionCounterOfJobseekersByCampaignIdToFixGlitch,
  resetToZeroCounterOfJobseekersByCampaignIdToFixGlitch
})(ApplicantsTabParent)