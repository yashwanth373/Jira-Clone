import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _dataService : DataService,private route : ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams);
  }

  loginGoogle(){
    this._dataService.loginGoogle(this.route.snapshot.queryParams['returnUrl']);
  }

  loginMicrosoft(){
    this._dataService.loginMicrosoft();
  }

  loginGithub(){
    this._dataService.loginGithub();
  }

}
