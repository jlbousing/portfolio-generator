import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Store, Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {UserStateModel} from '../../store/user/user.state';
import { User} from '../../shared/models/user';
import {LoginServiceService} from '../../pages/login/login-service.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Select(state => state.user) userState: Observable<UserStateModel>;
  user: User;

  constructor(private router: Router,
              private loginService: LoginServiceService) {

    this.initializateUser();
  }

  ngOnInit(): void {
      console.log("on init");
  }

  isLogged(){
    this.initializateUser();
    if(JSON.parse(localStorage.getItem("userInfo")) !== null){
      return true;
    }else {
      return false;
    }
  }

  initializateUser(){
    this.user = new User();
    let user = JSON.parse(localStorage.getItem("userInfo"));
    this.user.email = user.email;
    this.user.displayName = user.displayName;
    this.user.emailVerified = user.emailVerified;
  }

  isThereDisplayName(){

    if(this.user !== null && this.user.displayName !== null){
      return true;
    }
    return false;
  }

  logOut(){
    this.loginService.logOut();
  }

}
