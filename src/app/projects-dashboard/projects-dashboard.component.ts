import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-projects-dashboard',
  templateUrl: './projects-dashboard.component.html',
  styleUrls: ['./projects-dashboard.component.css']
})
export class ProjectsDashboardComponent implements OnInit {

  user : any = {}; // change to null in porduction

  dummy_image: string = "";

  constructor(private _dataService : DataService) { }

  ngOnInit(): void {
    this._dataService.getDetails().subscribe((data : any) => {
      this.user = data.user;
      console.log(this.user)
      if(this.user.displayPicture === null)
        this.createDummyImage(this.user.name)
    })
  }

  createDummyImage(name : string){
    let words = name.split(" ")
    let initials = words[0][0] + words[1][0]
    this.dummy_image = initials.toUpperCase()
  }

  logout(){
    console.log("function invoked in ts")
    this._dataService.logout()
  }

}
