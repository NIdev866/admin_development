import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import globalThemes from '../../style/globalThemes.js'
import globalFonts from '../../style/globalFonts.js'
import {teal300, blueGrey500} from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';
import * as actions from '../../actions'
import FontIcon from 'material-ui/FontIcon';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const google = window.google

class WorkforceTabParent extends Component {
  constructor(props){
    super(props)
    this.state = {
      archiveWorkerModalOpen: false,
    }
    this.closeArchiveWorkerModal = this.closeArchiveWorkerModal.bind(this)
    this.handlArchivingWorker = this.handlArchivingWorker.bind(this)


    this.createDistance = this.createDistance.bind(this)
  }
  componentWillMount(){
    this.props.fetchWorkforce()
  }
  openArchiveWorkerModal(worker){
    this.setState({
      archiveWorkerModalOpen: true,
      workerForArchiving: worker,
      firstNameOfWorkerToArchive: worker.first_name,
      lastNameOfWorkerToArchive: worker.last_name,
    });
  }
  closeArchiveWorkerModal(){
    this.setState({archiveWorkerModalOpen: false});
  }
  handlArchivingWorker(){
    this.state.workerForArchiving.job_status = 'archived'
    this.props.moveWorkerToArchived(this.state.workerForArchiving)
    this.props.resetToZeroCounterOfJobseekersByCampaignIdToFixGlitch()
    this.props.clearAllJobseekersState()
    this.setState({archiveWorkerModalOpen: false});
  }


  //Was getting errors with OVER_QUERY_LIMIT with postcode geocoder. try to add increasing intervals for function calling
  createDistance(workerPostalCode, workerAndCompanyIndex, companyPostalCode){

    let geocoder = new google.maps.Geocoder();
    if(!this.state[`geocodedPostcodeOfWorkerIndexed${workerAndCompanyIndex}`]){

        geocoder.geocode({'address': workerPostalCode }, (results, status)=> {

          if (status === 'OK') {
            this.setState({
              [`geocodedPostcodeOfWorkerIndexed${workerAndCompanyIndex}`]: results[0].geometry.location
            }, ()=>{

              let geocoder = new google.maps.Geocoder();
              if(!this.state[`geocodedPostcodeOfCompanyIndexed${workerAndCompanyIndex}`]){
                geocoder.geocode({'address': companyPostalCode }, (results, status)=> {

                  if (status === 'OK') {
                    this.setState({
                      [`geocodedPostcodeOfCompanyIndexed${workerAndCompanyIndex}`]: results[0].geometry.location
                    }, ()=>{

                      let resultDistance
                      let DistanceService = new google.maps.DistanceMatrixService();
                      DistanceService.getDistanceMatrix({
                          origins: [this.state[`geocodedPostcodeOfWorkerIndexed${workerAndCompanyIndex}`]],
                          destinations: [this.state[`geocodedPostcodeOfCompanyIndexed${workerAndCompanyIndex}`]],
                          travelMode: 'DRIVING',
                          avoidHighways: false,
                          avoidTolls: false,
                        }, (result, status) => { 
                          if(result && result.rows[0].elements[0].distance){
                            resultDistance = result.rows[0].elements[0].distance.text
                            if(!this.state[`distance${workerAndCompanyIndex}`]){
                              this.setState({    // prevState?
                                [`distance${workerAndCompanyIndex}`]: resultDistance
                              })
                            }
                          }
                        })
                      })
                  }
                })
              }
            })
        }
      })
    }
  }
  //Was getting errors with OVER_QUERY_LIMIT with postcode geocoder. try to add increasing intervals for function calling


  render() {
/*    if(this.props.allCampaigns && 
      this.props.allCampaigns.length == this.props.counterOfJobseekersByCampaignIdToFixGlitch && 
      this.props.jobseekersByCampaign && !this.props.allJobseekersByCampaignFlattenedIntoOneArray){
      this.props.flattenAllJobseekersByCampaignIntoOneArray()
    }*/

    const archiveWorkerActions = [
      <FlatButton
        label="No"
        primary={true}
        onClick={this.closeArchiveWorkerModal}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        onClick={this.handlArchivingWorker}
      />,
    ];
    if(this.props.workforce && this.props.companies){
      return (
        <div style={{backgroundColor: globalThemes.blueGrey500, marginTop: "20px", marginBottom: '40px'}}>
          <Dialog
            actions={archiveWorkerActions}
            modal={false}
            open={this.state.archiveWorkerModalOpen}
            onRequestClose={this.closeArchiveWorkerModal}
          >
          {`Are you sure you want to archive ${this.state.firstNameOfWorkerToArchive} ${this.state.lastNameOfWorkerToArchive}?`}
          </Dialog>
          {this.props.workforce.map((worker, workerAndCompanyIndex)=>{


            if(worker.jobseeker_status[0].company_id && worker.postal_code){






              let IdOfCompanyToCalculateDistanceFrom = worker.jobseeker_status[0].company_id

              

              let CompanyToCalculateDistanceFrom = this.props.companies.filter((company)=>{
                return company.company_id == IdOfCompanyToCalculateDistanceFrom
              })


              if(!this.state[`geocodedPostcodeOfWorkerIndexed${workerAndCompanyIndex}`])


              this.createDistance(worker.postal_code, workerAndCompanyIndex, CompanyToCalculateDistanceFrom[0].post_code)




            }


            if(worker.jobseeker_status.job_status !=='archived'){
              return (
              <Card style={{marginBottom: '10px', position: 'relative', backgroundColor: globalThemes.blueGrey400}}>
                <CardHeader
                  style={{color: 'white', textAlign: "left", backgroundColor: globalThemes.blueGrey400}}
                  actAsExpander={true}
                  showExpandableButton={true}
                  iconStyle={{position: "relative", left: "12px", color: 'white'}}
                >
                  <p style={{fontFamily: 'Poiret One', fontSize: "16px", margin: "-10px", marginTop: "-30px", padding: "0"}}><b>{worker.first_name + ' ' + worker.last_name}</b></p>
                  <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{worker.postal_code}</p>
                  <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{'Age range ' + worker.age}</p>


                  {this.state[`distance${workerAndCompanyIndex}`] !== undefined ?

                    <p style={{fontFamily: globalFonts.Abel, 
                      fontSize: "13px", margin: "-10px", marginTop: "10px", 
                      padding: "0", color: "#DEDEDE"}}>
                      Distance: {this.state[`distance${workerAndCompanyIndex}`] + " away"}
                    </p>

                    :

                    <div></div>

/*                    <p style={{fontFamily: globalFonts.Abel, 
                      fontSize: "13px", margin: "-10px", marginTop: "10px", 
                      padding: "0", color: "#DEDEDE"}}>
                      Distance: Calculating...
                    </p>    ...?        */ 

                  }





                  <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{worker.email_id}</p>
                  <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{worker.contact_no}</p>
                
                <div style={{position: 'absolute', top: 0, right: 0, 
                width: '20px', height: '20px',
                margin: '9px'}}>
                  <div style={{marginTop: '-5px'}} onClick={this.openArchiveWorkerModal.bind(this, worker/*, worker.campaign_id*/)}>
                    <FontIcon className="material-icons" color="white">clear</FontIcon>
                  </div>
                </div>

                </CardHeader>
                <CardText expandable={true} style={{color: 'white', textAlign: 'left', paddingBottom: "1px", paddingTop: "1px", backgroundColor: globalThemes.blueGrey400, marginBottom: '5px'}}>
                  <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "0px", padding: "0", color: "#DEDEDE"}}>Nationality: {worker.nationality}</p>
                  <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{worker.when_to_start_work}</p>
                  <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>English level: {worker.english_level}</p>
                </CardText>
              </Card>
              )
            }
            })
          }
        </div>
      )
    }
    else{
      return(
        <div style={{paddingTop: 'calc(50% - 140px)'}}>
          <CircularProgress color="white" size={80}  thickness={7}/>
        </div>
      )
    }
  }
}


function mapStateToProps(state) {
  return {
    jobseekersByCampaign: state.main.jobseekersByCampaign,
    allCampaigns: state.main.allCampaigns,
    counterOfJobseekersByCampaignIdToFixGlitch: state.main.counterOfJobseekersByCampaignIdToFixGlitch,
    //allJobseekersByCampaignFlattenedIntoOneArray: state.main.allJobseekersByCampaignFlattenedIntoOneArray
    workforce: state.main.workforce,
    companies: state.main.companies
  }
}

export default connect(mapStateToProps, actions)(WorkforceTabParent)