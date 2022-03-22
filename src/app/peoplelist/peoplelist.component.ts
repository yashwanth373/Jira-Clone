import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-peoplelist',
  templateUrl: './peoplelist.component.html',
  styleUrls: ['./peoplelist.component.css']
})
export class PeoplelistComponent implements OnInit {

  constructor(private _dataService : DataService) { }

  projectsMembers : any = null;

  formattedProjectMembers : any = [];

  ngOnInit(): void {
    this._dataService.getProjectsMembers().subscribe((data : any)=>{
      this.projectsMembers = data.data
      this.prepareProjectsMembers();
    })

  }

  prepareProjectsMembers(){
    let formattedProjectMembersListItem : any = []
    for(var i = 0;i<this.projectsMembers.length;i++){
      
      if(i % 6 === 0 && i != 0){
        this.formattedProjectMembers.push(formattedProjectMembersListItem);
        formattedProjectMembersListItem = []
      }
      formattedProjectMembersListItem.push(this.projectsMembers[i])
    }
    this.formattedProjectMembers.push(formattedProjectMembersListItem);
    console.log("foramatedProjectMembers ", this.formattedProjectMembers)
  }

}
