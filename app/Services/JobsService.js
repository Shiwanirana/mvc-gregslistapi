
import { ProxyState } from "../AppState.js"
import Job from "../Models/Job.js"
import { swapi } from "./AxiosService.js"

class JobsService {

  async getJobs(){
    let res = await swapi.get("jobs")
    console.log(res.data)
    ProxyState.jobs = res.data.map(j=> new Job(j))
  }
  async deleteJob(id) {
    let res = await swapi.delete("jobs/"+id)
    console.log(res)
    ProxyState.jobs = ProxyState.jobs.filter(job => job.id != id)
  }
  async createJob(newJob) {
    let job = await swapi.post("jobs", newJob)
    console.log(job)
    this.getJobs()
    // let job = new Job(newJob)
    // ProxyState.jobs = [...ProxyState.jobs, job]
  }

  async wantJob(id, newRate){
    let jobData = {rate: newRate}
    let res = await swapi.put("jobs/"+id, jobData)
    console.log(res)
    let oldJobIndex = ProxyState.jobs.findIndex(j=> j.id == id)

    let temp = ProxyState.jobs
    temp.splice(oldJobIndex,1,new Job(res.data))
    ProxyState.jobs = temp
  }

}
// Singleton Pattern
export const jobsService = new JobsService()