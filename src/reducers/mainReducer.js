import _ from 'lodash'
import { COMPANIES, 
  ALL_CAMPAIGNS, 
  ALL_JOBSEEKERS_BY_CAMPAIGN, 
  UPDATE_JOBSEEKERSTATUS_TO_SELECTED,
  NEST_JOBSEEKERS_INTO_CAMPAIGNS,
  CLEAR_ALL_JOBSEEKERS_STATE,
  NESTED_JOB_SECTORS,
  WORKFORCE } from '../actions/types.js';

export default function(state = {}, action){
    switch(action.type){
        case COMPANIES:
            return { ...state, companies: action.payload}

        case ALL_CAMPAIGNS:
          return { ...state, allCampaigns: action.payload }

        case ALL_JOBSEEKERS_BY_CAMPAIGN:
          if(state.jobseekersByCampaign){
            let stateHardCopy = Object.assign({}, state)
            stateHardCopy.jobseekersByCampaign.push(action.payload.data) 
            let result = stateHardCopy.jobseekersByCampaign
            return { ...stateHardCopy, jobseekersByCampaign: result }
          }
          else{
            return { ...state, jobseekersByCampaign: [action.payload.data] }
          }

        case NEST_JOBSEEKERS_INTO_CAMPAIGNS:
          let nestedCampaigns = state.allCampaigns.map((campaign)=>{
            let correctJobseekers = state.jobseekersByCampaign.filter((jobseekerGroup)=>{
              if(jobseekerGroup.length > 0){
                return (jobseekerGroup[0].campaign_id === campaign.campaign_id)
              }
            })
            campaign.jobseekers = correctJobseekers
            return campaign
          })
          return { ...state, campaignsWithNestedJobseekers: nestedCampaigns }
        case CLEAR_ALL_JOBSEEKERS_STATE:
          return { ...state, jobseekersByCampaign: null }


        case NESTED_JOB_SECTORS:
          return { ...state, nestedJobSectors: action.payload }

        case UPDATE_JOBSEEKERSTATUS_TO_SELECTED:
          let stateHardCopy = Object.assign({}, state)
          stateHardCopy.jobseekersByCampaign.push(action.payload.data) 
          let result = stateHardCopy.jobseekersByCampaign
          return { ...stateHardCopy, jobseekersByCampaign: result }
        case WORKFORCE:
  
          return { ...state , workforce: action.payload}
    }

    return state;
}
