import { Component, OnInit } from '@angular/core';
import {login } from 'src/app/modal/login';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LocalStorageService } from 'ngx-webstorage';
import { UserService} from 'src/app/services/user.service';
import { AuthService } from 'angular4-social-login';
import { SocialUser } from 'angular4-social-login';
import {HttpService} from 'src/app/services/http.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public Login: login;
  socialUser: SocialUser;

  constructor(private storage: LocalStorageService,
    private router: Router,
    public snackBar: MatSnackBar,
    private user: UserService,
    private auth: AuthService,
    private http:HttpService) { }

  ngOnInit() {
    this.Login = {
      Username: '',
      password: '',
    };
    this.auth.authState.subscribe((user) => {
      this.socialUser = user;
      if (this.socialUser != null) {
        this.user.setUserLoggedIn(true, this.socialUser.name);
        this.router.navigateByUrl('/allbooks');
      }
   
      
    });
  }

 

  
  verfiyLogin() {
    this.http.login(this.Login).subscribe((data)=>{
      console.log("data"+data);
    });
    if ((this.Login.Username === 'admin') && (this.Login.password === 'admin')) {
      console.log('Admin loggedin');
      this.storage.store('isAdmin', true);
      this.storage.store('isLoggedIn', true);
      this.user.setUserLoggedIn(true, 'admin');
      this.router.navigateByUrl('/allbooks');
    } else if (this.Login.Username === this.storage.retrieve('username') &&
      (this.Login.password === this.storage.retrieve('password'))) {
      this.router.navigateByUrl('/allbooks');
      this.storage.store('isAdmin', false);
      this.storage.store('isLoggedIn', true);
      this.user.setUserLoggedIn(true, this.Login.Username);
    } else {
      console.log('login failed');
      this.snackBar.open('Login failed !!!', 'Try again', {
        duration: 2000,
      });
    }
  }

}
