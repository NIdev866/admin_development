import { SubmissionError } from 'redux-form'
import database from "../../../jobs.json"

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
  return sleep(1000) // simulate server latency
    .then(() => {
      delete values.emailCopy
      delete values.nested_job_sector_id
      database.push(values) //not working (security issue). backend needed.
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
    })
}

export default submit