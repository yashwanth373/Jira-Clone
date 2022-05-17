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

  isAuthorize(project_id : any){
    return this.http.get("/authorize/" + project_id)
  }

  loginGoogle (redirectUrl : any) {
    window.open('/googleauth/'+encodeURIComponent(redirectUrl), '_self');
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

  //Specific for Project Dashboard Component as well as part of Settings Component

  getBasicprojectDetails(project_id : any){
    return this.http.get("/getBasicprojectDetails/" + project_id)
  }

  //Specific for Project Board Component and Project Backlog Component
  getProjectDetails(project_id : any){
    return this.http.get("/getProjectDetails/" + project_id)
  }

  updateIssue(project_id : any, issue : any){
    console.log("updating issue",project_id,issue)
    return this.http.put("/updateIssue/" + project_id, { issue : issue})
  }

  deleteIssue(project_id : any, issue_id : any, sprint_id : any){
    console.log("deleting issue",project_id,issue_id)
    return this.http.delete("/deleteIssue/" + project_id + "/" + issue_id + "/" + sprint_id)
  }

  updateBoard(project_id : any, board : any){
    console.log("updating board",project_id,board)
    return this.http.put("/updateBoard/" + project_id, { board : board})
  }

  updateSprint(project_id : any, sprint : any){
    console.log("updating sprint",project_id,sprint)
    return this.http.put("/updateSprint/" + project_id, { sprint : sprint})
  }

  // Specific for Members Component
  getMembersDetails(project_id : any){
    return this.http.get("/getMembersDetails/" + project_id)
  }

  removeMember(project_id : any, user_id : any){
    return this.http.delete("/removeMember/" + project_id + "/" + user_id)
  }

  inviteUser(project : any,mails:any){
    console.log("sending invites to",project,mails)
    let emailsList: any[] = []
    mails.forEach((element:any) => {
      emailsList.push(element.mail)
    });
    return this.http.post("/inviteUser", {'mails' : emailsList,'project' : project})
  }

  // Specific for Settings Component
  updateProjectDetails(project_id : any,project : any){
    console.log("updating project",project)
    return this.http.put("/updateProjectDetails/"+project_id, project)
  }

  // Specific for Project Backlog Component
  updateBacklog(project_id : any, backlog : any){
    console.log("updating backlog",project_id,backlog)
    return this.http.put("/updateBacklog/" + project_id, { backlog : backlog})
  }

  updateIssues(project_id : any,issues : any){
    console.log("updating issues",project_id,issues)
    return this.http.put("/updateIssues/" + project_id, { Issues : issues})
  }
}
