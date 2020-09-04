import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Observable} from 'rxjs';
import { Router} from '@angular/router';
import { User} from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private userData: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router) {
    this.userData = angularFireAuth.authState;
  }

  // tslint:disable-next-line:typedef
  login(email: string, password: string){
    this.angularFireAuth
      .signInWithEmailAndPassword(email,password)
      .then((response) => {
          console.log("te has logeado ",response.user.uid);
          if(response.user){
            localStorage.setItem("userInfo",JSON.stringify(this.saveUserInfo(response.user)));
          }
          this.router.navigate(["/"]);
      }).catch((err) => {
        console.log("something is wrong ",err);
    });
  }

  registerWithEmailPass(email: string, password: string){
    this.angularFireAuth
      .createUserWithEmailAndPassword(email,password)
      .then((response) => {
        console.log("usuario creado ",response);
      }).catch((err) => {
       console.log("something is wrong ",err);
    });
  }

  loginGoogle(){
    this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then((result) => {
        console.log(result);
      }).catch((err) => console.log(err));
  }

  validateCredential(text: string): Boolean{

    if(text === undefined && false && text === ""){
      return false;
    }
    return true;
  }

  saveUserInfo(data){
    let user = new User();
    user.uid = data.uid;
    user.email = data.email;
    user.displayName = data.displayName;
    user.emailVerified = data.emailVerified;
    user.photoUrl = data.photoURL;

    return user;
  }


}
