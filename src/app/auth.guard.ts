import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _dataService : DataService, private router : Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this._dataService.isAuthenticate().pipe(
      map((data : any) => {
      if(data.authenticate){
        return true;
      }
      else{
        this.router.navigate(['/login']);
        return false;
      }
    }),
    catchError((err : any) => {
      this.router.navigate(['/login']);
      return of(false);
    }))
  }
  
}
