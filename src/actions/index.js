import React from 'react';
import axios from 'axios';
import _ from 'lodash'

import { SUBMIT_BANK_DETAILS } from './types.js';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  NESTED_JOB_SECTORS,
  COMPANIES,
  ALL_CAMPAIGNS,
  ALL_JOBSEEKERS_BY_CAMPAIGN,
  UPDATE_JOBSEEKERSTATUS_TO_SELECTED,
  LOCALLY_UPDATE_JOBSEEKERSTATUS_TO_SELECTED,
  NEST_JOBSEEKERS_INTO_CAMPAIGNS,
  CLEAR_ALL_JOBSEEKERS_STATE,
  WORKFORCE
} from './types.js';



/*============================================

REASON FOR SUCH SHORT SYNTAX ON ACTIONS:


in the main index.js file 'promise' middleware from
'redux-promise' is used which allows for not having
to use 'then' and 'catch' of typical promise and
does everything magically in the background.


=============================================*/





const ROOT_URL = 'http://localhost:3000';





export function fetchNestedJobSectors(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/admin/get-nested-job-sectors`)
      .then(response => {
        dispatch({ type: NESTED_JOB_SECTORS, payload: response.data });
      })
      .catch((err)=>{
        console.log(err)

      })
  }
}
















export function fetchWorkforce(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/workforce/all`)
      .then(response => {
        dispatch({ type: WORKFORCE, payload: response.data });
      })
      .catch((err)=>{
        console.log(err)

      })
  }
}



//'GET admin/workforce/all'

























export function fetchCompanies(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/admin/companies`)
      .then(response => {
        dispatch({ type: COMPANIES, payload: response.data });
      })
      .catch((err)=>{
        console.log(err)

      })
  }
}


export const updateJobseekerJobStatus = ({job_status, jobseeker_id, campaign_id})=>(
  dispatch=>dispatch({ type: UPDATE_JOBSEEKERSTATUS_TO_SELECTED, 
  payload: axios.put(`${ROOT_URL}/jobseeker/select?jobseeker_id=${jobseeker_id}&campaign_id=${campaign_id}`, {job_status}) })
)


export function fetchAllCampaigns(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/campaigns/all`)
      .then(response => {
        dispatch({ type: ALL_CAMPAIGNS, payload: response.data });
      })
      .catch((err)=>{
        console.log(err)

      })
  }
}

export const fetchAllJobseekersByCampaignId = campaign_id=>(
  dispatch=>dispatch({ type: ALL_JOBSEEKERS_BY_CAMPAIGN, 
  payload: axios.get(`${ROOT_URL}/campaigns/jobseekers/${campaign_id}`) })
)

export const nestJobseekersIntoCampaigns = ()=>{
  return {
    type: NEST_JOBSEEKERS_INTO_CAMPAIGNS
  }
}


export const clearAllJobseekersState = ()=>{
  return {
    type: CLEAR_ALL_JOBSEEKERS_STATE
  }
}