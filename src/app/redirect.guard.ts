import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  constructor(private _dataService : DataService, private router : Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._dataService.isAuthenticate().subscribe((data: any) => {
      if(data.authenticate){
        this.router.navigate(['/ProjectsDashboard'])
        return false;
      }
      else{
        this.router.navigate(['/login']);
        return false;
      }
    })
  }
  
}
