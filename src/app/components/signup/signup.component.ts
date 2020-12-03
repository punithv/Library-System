import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import { User} from 'src/app/modal/user';
import { Router } from '@angular/router';
import { UserService} from 'src/app/services/user.service';
import {HttpService} from 'src/app/services/http.service';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user: User;

  constructor(private storage: LocalStorageService, private router: Router,public http:HttpService) { }

  ngOnInit() {
    this.user = {
      Username: '',
      password: '',
      confirmpassword: '',
      Email:''
    };
  }

 
  saveValue() {
    this.http.signUp(this.user).subscribe((data)=>{
      console.log("dateaaa"+this.user)
    })
    this.storage.store('username', this.user.Username);
    this.storage.store('email', this.user.Email);
    this.storage.store('password', this.user.password);
    this.storage.store('retyepassword', this.user.confirmpassword);
    console.log('saved successfully');
   
    this.router.navigateByUrl('/login');
  }
}



