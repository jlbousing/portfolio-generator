import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Store, Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {UserStateModel} from '../../store/user/user.state';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Select(state => state.user) userState: Observable<UserStateModel>;
  isLoged: boolean;
  nameUser: string;

  constructor(private router: Router) {
    this.isLogged();
  }


  ngOnInit(): void {

  }

  isLogged(){

    if(localStorage.getItem("userInfo")){
      console.log("logeado");
      this.isLoged = true;
      this.nameUser = JSON.parse(localStorage.getItem("userInfo")).displayName;
    }else{
      console.log("no logeado");
      this.isLoged = false;
    }
  }

  logOut(){
    localStorage.setItem("userInfo",null);
    this.isLoged = false;
    this.router.navigate(["/login"]);
  }

}
