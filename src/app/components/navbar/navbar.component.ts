import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'angular4-social-login';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  collapsed = true;
  isAdmin: boolean;
  isLoggedIn: boolean;

  constructor(private user: UserService,
    private storage: LocalStorageService,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.isAdmin = this.storage.retrieve('isAdmin');
    this.isLoggedIn = this.storage.retrieve('isLoggedIn');
    console.log('isadmin', this.isAdmin);
    console.log('isLoggedIn', this.isLoggedIn);
  }


  logout() {
    if (this.isAdmin) {
      this.storage.clear('isAdmin');
      this.storage.store('isAdmin', false);
      this.user.setUserLoggedIn(false, 'null');
    }

    if (this.isLoggedIn) {
      this.storage.clear('isLoggedIn');
      this.user.setUserLoggedIn(false, null);
      this.storage.store('isLoggedIn', false);
    }
    this.auth.signOut();
    this.user.setUserLoggedIn(false, null);
    this.router.navigate(['/login']);
  }
}
