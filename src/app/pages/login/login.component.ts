import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from './login-service.service';
import { ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   email: string;
   password: string;

  constructor(private loginService: LoginServiceService) {
  }

  ngOnInit(): void {

  }

  loginEmailPass(){

    if(this.loginService.validateCredential(this.email)
      && this.loginService.validateCredential(this.password)){
        this.loginService.login(this.email, this.password);
    }else{
      console.log("Credenciales invalidas");
    }
  }

  loginGoogle(){
    this.loginService.loginGoogle();
  }

}
