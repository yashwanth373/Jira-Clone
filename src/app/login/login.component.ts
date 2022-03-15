import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _dataService : DataService) { }

  ngOnInit(): void {
  }

  loginGoogle(){
    this._dataService.loginGoogle();
  }

  loginMicrosoft(){
    this._dataService.loginMicrosoft();
  }

  loginGithub(){
    this._dataService.loginGithub();
  }

}
