import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http : HttpClient) { }

  //Auth related calls

  isAuthenticate():any{
    return this.http.get("/authenticate")
  }

  loginGoogle () {
    window.open('/google','_self')
  }

  loginMicrosoft (){
    window.open('/microsoft','_self')
  }

  loginGithub (){
    window.open('/github','_self')
  }

  
  logout(){
    console.log("function invoked in service")
    window.open('/logout','_self')
  }

//Info related calls
  
  getDetails(){
    console.log("getDetails called")
    return this.http.get("/getDetails")
  }

  // specific for Projects List Component

  getProjectsList(){
    console.log("getProjectsList called")
    return this.http.get("/getProjectsList")
  }
}
