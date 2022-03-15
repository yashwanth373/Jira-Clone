import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  constructor(private _dataService : DataService, private router : Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._dataService.isAuthenticate().pipe(
      map((data : any) => {
      if(data.authenticate){
        this.router.navigate(['/Projects']);
        return false;
      }
      else{
        return true;
      }
    }),
    catchError((err : any) => {
      return of(true);
    }))
  }
  
}
