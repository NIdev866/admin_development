import React, { Component } from 'react';
import { fetchCompanies } from '../../actions'
import { connect } from "react-redux"
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import globalThemes from '../../style/globalThemes.js'
import globalFonts from '../../style/globalFonts.js'

import CircularProgress from 'material-ui/CircularProgress';

class ClientsTabParent extends Component {
  componentWillMount(){
    this.props.fetchCompanies()
  }
  render() {

    const cardStyle = {
      marginTop: "20px",
    }


    return (
      <div style={{margin: '0 auto', marginBottom: '40px'}}>
      {this.props.companies ? this.props.companies.map((company)=>{
          return(
            <Card style={cardStyle}>
              <CardHeader
                style={{height: "50px", textAlign: "left", backgroundColor: globalThemes.blueGrey400}}
                actAsExpander={true}
                showExpandableButton={true}
                iconStyle={{position: "relative", left: "12px", color: globalThemes.white}}
              >
                <p style={{fontSize: "18px", margin: "-10px", marginTop: "-30px", padding: "0", color: globalThemes.white}}><b>{company.company_name}</b></p>
                <p style={{color: 'grey', fontSize: "14px", margin: "-10px", marginTop: "10px", padding: "0",  color: "#DEDEDE"}}>{company.post_code}</p>
              </CardHeader>
          </Card>
          )
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
    companies: state.main.companies
  };
}

export default connect(mapStateToProps, { fetchCompanies })(ClientsTabParent)