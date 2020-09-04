import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private userData: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }

  // tslint:disable-next-line:typedef
  login(email: string, password: string){
    this.angularFireAuth
      .signInWithEmailAndPassword(email,password)
      .then((response) => {
          console.log("te has logeado");
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
    this.angularFireAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  validateCredential(text: string): Boolean{

    if(text === undefined && false && text === ""){
      return false;
    }
    return true;
  }


}
