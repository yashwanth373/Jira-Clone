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

  searchQuery : any = null;

  ngOnInit(): void {
    this._dataService.getProjectsMembers().subscribe((data : any)=>{
      this.projectsMembers = data.data
      this.projectsMembers = this.projectsMembers.filter((value : any, index : any, self : any) =>
        index === self.findIndex((t : any) => (
          t.user_id === value.user_id
        ))
      )
      for(var i = 0;i<this.projectsMembers.length;i++){
        if(this.projectsMembers[i].img === null){
          this.projectsMembers[i].dummy_img = this.createDummyImage(this.projectsMembers[i].name)
        }
      }
      
      this.prepareProjectsMembers();
    })

  }

  createDummyImage(name : string){
    let words = name.split(" ")
    let initials = ""
    for(var i = 0;i<words.length;i++){
      initials = initials.concat(words[i].charAt(0).toUpperCase())
    }
    return initials
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
