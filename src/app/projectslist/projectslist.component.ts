import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
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

  createDummyImage(name : string){
    let words = name.split(" ")
    let initials = words[0][0] + words[1][0]
    return initials.toUpperCase()
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
