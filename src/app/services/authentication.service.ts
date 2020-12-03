import { Injectable } from '@angular/core';
import { UserService} from 'src/app/services/user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate{

  constructor(private user: UserService, private router: Router) { }
  canActivate(): boolean {
    if (!this.user.getUserLoggedIn()) {
      this.router.navigate(['allbooks']);
      return false;
    }
    return true;
  }

}
