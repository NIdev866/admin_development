import { SubmissionError } from 'redux-form'
import axios from 'axios'


function submit(values) {

  delete values.emailCopy
  delete values.nested_job_sector_id

  const ROOT_URL = 'http://localhost:3000';

  axios.post(`${ROOT_URL}/campaigns/add-campaign`,values)
      .then(function (response) {

        window.location.replace('/');

      })
      .catch(function (err) {
        console.log('ERROR FROM SERVER '+err);
         throw new SubmissionError({
           _error: JSON.stringify(err)
         })
      });

}

export default submit
