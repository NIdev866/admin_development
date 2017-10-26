import { SubmissionError } from 'redux-form'
import axios from 'axios'

import {
  CREATE_CAMPAIGN_SUBMITTING_STARTED,
  CREATE_CAMPAIGN_SUBMITTING_SUCCESSFUL,
  CREATE_CAMPAIGN_SUBMITTING_FAILED
} from '../../../actions/types.js';


function submit(values, dispatch) {

  dispatch({ type: CREATE_CAMPAIGN_SUBMITTING_STARTED })

  delete values.emailCopy
  delete values.nested_job_sector_id

  const ROOT_URL = 'http://localhost:3000';

  axios.post(`${ROOT_URL}/campaigns/add-campaign`,values)
      .then(function (response) {

        dispatch({ type: CREATE_CAMPAIGN_SUBMITTING_SUCCESSFUL })



        setTimeout(()=>{window.location.replace('/')},4000) 
      })
      .catch(function (err) {
        console.log('ERROR FROM SERVER '+err);

        dispatch({ type: CREATE_CAMPAIGN_SUBMITTING_FAILED })




        setTimeout(()=>{window.location.replace('/')},4000) 

/*         throw new SubmissionError({
           _error: JSON.stringify(err)
         })*/
      });

}

export default submit
