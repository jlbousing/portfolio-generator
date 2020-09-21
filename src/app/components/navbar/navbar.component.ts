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
      this.userState.subscribe((data: any) => {
        if(data != null && data.user != null){
          if(data.user.payload instanceof User){
            this.user = data.user.payload;
          }
        }
      });
  }

  isThereUser(){
    if(this.user !== undefined && this.user !== null && this.user.displayName !== null){
      return true;
    }else{
      return false;
    }
  }

  isLogged(){

    if(JSON.parse(localStorage.getItem("userInfo")) === null){
      return false;
    }else {
      return true;
    }
  }

  initializateUser(){
    this.user = new User();
    this.user.email = null;
    this.user.displayName = null;
    this.user.emailVerified = null;
  }

  logOut(){
    this.loginService.logOut();
  }

}
