import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http : HttpClient) { }

  isAuthenticate():any{
    return this.http.get("/authenticate")
  }

  loginGoogle () {
    window.open('/google','_self')
  }

  loginMicrosoft (){
    window.open('/microsoft','_self')
  }

  getDetails(){
    console.log("getDetails called")
    return this.http.get("/getDetails")
  }
}