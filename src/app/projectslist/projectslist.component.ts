import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-projectslist',
  templateUrl: './projectslist.component.html',
  styleUrls: ['./projectslist.component.css']
})
export class ProjectslistComponent implements OnInit {

  constructor(private _dataService : DataService, private router : Router) {
    console.log("ProjectsList constructor")
   }

  projectList : any = null;

  searchQuery : any = null;

  newProjectName : any = null;

  newProjectKey : any = null;

  showEmptyNameError : boolean = false;

  showNameTakenError : boolean = false;

  showEmptyKeyError : boolean = false;

  @ViewChild('close') closebtn: ElementRef | undefined;

  NameSubtitle : any = "Project Name should be unique among all your projects.";

  KeySubtitle : any = "Project key will be used as a prefix for all issues/tasks.";

  ngOnInit(): void {
    this.getProjectsList()
  }

  getProjectsList(){
    this._dataService.getProjectsList().subscribe((data : any) => {
      this.projectList = data.data;
      this.projectList.forEach((project : any) => {
        if(project.owner_img === null)
          project.dummy_img = this.createDummyImage(project.owner_name)
      });
      console.log("ProjectsList ", this.projectList)
    })
  }

  getInitialKey(){
    if(this.newProjectName.length > 2) 
      this.newProjectKey = this.newProjectName.substring(0,3).toUpperCase()
    if(this.newProjectName === "")
      this.newProjectKey = ""
    if(this.newProjectName === null)
      this.newProjectKey = null
  }

  refresh(){
    this.newProjectName = null;
    this.newProjectKey = null;
    this.showEmptyNameError = false;
    this.showNameTakenError = false;
  }

  updateNameSubtitle(){
    if(this.showEmptyNameError)
      this.NameSubtitle = "Please enter a valid project name."
    if(this.showNameTakenError)
      this.NameSubtitle =  "Project name is already taken."
  }

  updateKeySubtitle(){
    if(this.showEmptyKeyError)
      this.KeySubtitle = "Please enter a valid project key."
  }

  createDummyImage(name : string){
    let words = name.split(" ")
    let initials = ""
    for(var i = 0;i<words.length;i++){
      initials.concat(words[i].charAt(0).toUpperCase())
    }
    return initials
  }

  createProject(){
    if(this.newProjectName === null || this.newProjectName.length === 0){
      this.showEmptyNameError = true
      this.updateNameSubtitle()
    }
    else{
      this.showEmptyNameError = false
      let NameExists = this.checkNameExists();

      if(NameExists){
        this.showNameTakenError = true
        this.updateNameSubtitle()
      }
      else{
        this.showNameTakenError = false
      }

    }
    if(this.newProjectKey === null || this.newProjectKey.length === 0){
      this.showEmptyKeyError = true
      this.updateKeySubtitle()
    }
    if(!this.showEmptyKeyError && !this.showEmptyNameError && !this.showNameTakenError){
      

      this._dataService.createProject(this.newProjectName, this.newProjectKey.toUpperCase()).subscribe((data : any) => {
        if(data.status === "success"){
          this.closebtn?.nativeElement.click();
          this.getProjectsList()
        } 
      })
      
    }
  }

  checkNameExists(){
    console.log(this.projectList)
    for(var i=0;i<this.projectList.length;i++){
      if(this.projectList[i].name === this.newProjectName){
        return true
      }
    }
    return false
  }

  deleteProject(i : any){
    var removeIndex = this.projectList.map((item : any) => item.id).indexOf(i);

    this._dataService.deleteProject(i).subscribe((data : any) => {
      if(data.status === "success"){
        this.projectList.splice(removeIndex, 1);
      }
    })
  }

  gotoProject(i : any){
    this.router.navigate(['/Projects/' + i])
  }

  gotoSettings(i :any){
    // this.router.navigate(['/Settings/' + i])
    console.log("Settings routing")
  }

}
