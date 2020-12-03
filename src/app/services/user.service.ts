import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isUserLoggedIn: boolean;
  public username: string;

  constructor() {
    this.isUserLoggedIn = false;
    this.username = null;
  }

  /**
   * Set user login status
   * @param status
   * @param user
   */
  setUserLoggedIn(status: boolean, user: string) {
    this.isUserLoggedIn = status;
    this.username = user;
  }

 
  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  /**
   * Get login username
   */
  getUserName() {
    return this.username;
  }
}
