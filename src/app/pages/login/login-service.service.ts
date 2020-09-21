import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Observable} from 'rxjs';
import { Router} from '@angular/router';
import { User} from '../../shared/models/user';
import { UserStateModel} from '../../store/user/user.state';
import { Store, Select} from '@ngxs/store';
import { AddUser, GetUser } from '../../store/user/user.actions';
import { AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService  {

  private userData: Observable<firebase.User>;
  @Select(state => state.user) userState: Observable<UserStateModel>;

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router,
              private store: Store,
              private firestore: AngularFirestore) {
    this.userData = angularFireAuth.authState;
  }

  // tslint:disable-next-line:typedef
  login(email: string, password: string){
    this.angularFireAuth
      .signInWithEmailAndPassword(email,password)
      .then((response) => {

          this.firestore.collection("users")
              .get().subscribe((querySnapshot) => {
                console.log("probando conexion con firebase",querySnapshot);
          });
          console.log("te has logeado ",response.user.uid);
          if(response.user){
            let user = new User();
            user.uid = response.user.uid;
            user.photoUrl = response.user.photoURL;
            user.emailVerified = response.user.emailVerified;
            user.displayName = response.user.displayName;
            user.email = response.user.email;
            localStorage.setItem("userInfo",JSON.stringify(user));

            this.store.dispatch(new AddUser(user));
            this.userState.subscribe((data) => {
              if(data != undefined && data != null){
                console.log("mostrando user desde el state ",data.user.payload);
              }
            });

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
        localStorage.setItem("userInfo",JSON.stringify(this.saveUserInfo(response.user)));
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

  logOut(){
    //SE BORRA LA INFORMACIÓN DEL USUARIO
    this.store.dispatch(new AddUser(null))
    localStorage.setItem("userInfo",null);
    this.userState.subscribe((data) => {
      console.log("deslogeando usuario en el state ",data);
      this.router.navigate(["/login"]);
    });
  }


}
