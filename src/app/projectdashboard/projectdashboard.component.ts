import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-projectdashboard',
  templateUrl: './projectdashboard.component.html',
  styleUrls: ['./projectdashboard.component.css']
})
export class ProjectdashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _dataService : DataService) { }

  project : any = {
    project_name : "Hello 5",
    project_id : "348673485",
    icon : "../../assets/project-dummy-logo.svg"
  };
  ngOnInit(): void {
    this._dataService.getBasicprojectDetails(this.route.snapshot.paramMap.get('projectId')).subscribe((data : any)=>{
      this.project = data.data
      console.log(this.project)
    });
  }

}
