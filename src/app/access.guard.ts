import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, of, catchError } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor(private _dataService : DataService, private router : Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._dataService.isAuthorize(route.params['projectId']).pipe(
      map((data : any) => {
      if(data.authorize){
        return true;
      }
      else{
        // this.router.navigate(['your-work']);
        return true;
      }
    }),
    catchError((err : any) => {
      // this.router.navigate(['your-work']);
      return of(true);
    }))
  }
  
}
