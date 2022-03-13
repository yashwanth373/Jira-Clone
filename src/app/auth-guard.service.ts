import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router : Router) { }

  canActivate() {
    if(localStorage.getItem("user-login-token") != null){
      this.router.navigate(['home']);
      return false
    }
    this.router.navigate(['login']);
    return false
  }

}
