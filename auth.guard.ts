import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from './models/role';
import { AuthService } from './services/Authentication-services/auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanLoad {
  constructor(private router: Router,private authService:AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['/login']);
      return false;
    }
    const roles = route.data.roles as Role[];
    if (roles && !roles.some(r => this.authService.hasRole(r))) {
      this.router.navigate(['/404']);
      return false;
    }

    return true;
  }
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthorized()) {
        return false;
    }

    const roles = route.data && route.data.roles as Role[];
    if (roles && !roles.some(r => this.authService.hasRole(r))) {
        return false;
    }

    return true;
  }

}
