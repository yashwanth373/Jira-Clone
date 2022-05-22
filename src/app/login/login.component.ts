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
    console.log("login component returnUrl",this.route.snapshot.queryParams);
  }

  loginGoogle(){
    if(this.route.snapshot.queryParams['returnUrl'] != null){
      this._dataService.loginGoogle(this.route.snapshot.queryParams['returnUrl']);
    }
    else{
      this._dataService.loginGoogle(' ');
    }
  }

  loginMicrosoft(){
    if(this.route.snapshot.queryParams['returnUrl'] != null){
      this._dataService.loginMicrosoft(this.route.snapshot.queryParams['returnUrl']);
    }
    else{
      this._dataService.loginMicrosoft(' ');
    }
  }

  loginGithub(){
    if(this.route.snapshot.queryParams['returnUrl'] != null){
      this._dataService.loginGithub(this.route.snapshot.queryParams['returnUrl']);
    }
    else{
      this._dataService.loginGithub(' ');
    }
  }

}
