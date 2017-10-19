import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import globalThemes from '../../style/globalThemes.js'
import globalFonts from '../../style/globalFonts.js'


import {teal300, blueGrey500} from 'material-ui/styles/colors';

class WorkforceTabParent extends Component {
  render() {
    return (
      <div style={{backgroundColor: globalThemes.blueGrey500, marginTop: "20px"}}>

        {this.props.jobseekersByCampaign && this.props.jobseekersByCampaign[0].map((worker)=>{
          return (
            <Card style={{marginBottom: '10px', position: 'relative', backgroundColor: globalThemes.blueGrey400}}>
              <CardHeader
                style={{color: 'white', height: "90px", textAlign: "left", backgroundColor: globalThemes.blueGrey400}}
                actAsExpander={true}
                showExpandableButton={true}
                iconStyle={{position: "relative", left: "12px", color: 'white'}}
              >
                <p style={{fontFamily: 'Poiret One', fontSize: "16px", margin: "-10px", marginTop: "-30px", padding: "0"}}><b>{worker.first_name + ' ' + worker.last_name}</b></p>
                <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{worker.postal_code}</p>
                <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{'Age range ' + worker.age}</p>
                <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{worker.email_id}</p>
                <p style={{fontFamily: globalFonts.Abel, fontSize: "13px", margin: "-10px", marginTop: "10px", padding: "0", color: "#DEDEDE"}}>{worker.contact_no}</p>
              </CardHeader>
            </Card>
          )})
        }
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    jobseekersByCampaign: state.main.jobseekersByCampaign
  }
}

export default connect(mapStateToProps)(WorkforceTabParent)