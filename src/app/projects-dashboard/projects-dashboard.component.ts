import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-projects-dashboard',
  templateUrl: './projects-dashboard.component.html',
  styleUrls: ['./projects-dashboard.component.css']
})
export class ProjectsDashboardComponent implements OnInit {

  user : any = {};

  constructor(private _dataService : DataService) { }

  ngOnInit(): void {
    this._dataService.getDetails().subscribe((data) => {
      this.user = data;
      console.log(this.user)
    })
  }

}
