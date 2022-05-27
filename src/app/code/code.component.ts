import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  constructor(private _dsService : DataService) { }

  ngOnInit(): void {
    this._dsService.getRepoDetails("yashwanth373","Jira-Clone").subscribe((data)=>{
      console.log(data)
    })
  }

}
