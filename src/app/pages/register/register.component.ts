import { Component, OnInit } from '@angular/core';
import { LoginServiceService} from '../login/login-service.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  password2: string;

  constructor(private loginService: LoginServiceService,
              private router: Router) { }

  ngOnInit(): void {
  }

  register(){
    if(this.password === this.password2){
      this.loginService.registerWithEmailPass(this.email,this.password);
    }else{
      alert("The passwords are not the same");
    }
  }

  login(){
    this.router.navigate(["/login"]);
  }

  loginGoolge(){
    this.loginService.loginGoogle();
  }

}
