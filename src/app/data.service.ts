import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http : HttpClient) { }

  //Auth related calls

  isAuthenticate():any{
    return this.http.get("/authenticate")
  }

  loginGoogle () {
    window.open('/google','_self')
  }

  loginMicrosoft (){
    window.open('/microsoft','_self')
  }

  loginGithub (){
    window.open('/github','_self')
  }

  
  logout(){
    console.log("function invoked in service")
    window.open('/logout','_self')
  }

//Info related calls
  
  getDetails(){
    console.log("getDetails called")
    return this.http.get("/getDetails")
  }

  // specific for Projects List Component

  getProjectsList(){
    console.log("getProjectsList called")
    return this.http.get("/getProjectsList")
  }

  deleteProject(id : any){
    console.log("deleteProject called")
    return this.http.delete("/deleteProject/" + id)
  }

  createProject(project_name : any, project_key : any){
    console.log("createProject called")
    return this.http.post("/createProject", {'project_name' : project_name, 'project_key' : project_key})
  }


  //Specific for People list Component

  getProjectsMembers(){
    return this.http.get("/getProjectsMembers")
  }

  //Specific for Your Work Component

  getWork(){
    return this.http.get("/getYourWork")
  }

  //Specific for Project Dashboard Component

  getBasicprojectDetails(project_id : any){
    return this.http.get("/getBasicprojectDetails/" + project_id)
  }

  //Specific for Project Board Component
  getProjectDetails(project_id : any){
    return this.http.get("/getProjectDetails/" + project_id)
  }

  updateIssue(project_id : any, issue : any){
    console.log("updating issue",project_id,issue)
    return this.http.put("/updateIssue/" + project_id, { issue : issue})
  }
}
