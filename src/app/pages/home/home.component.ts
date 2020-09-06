import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
    this.isLogged();
  }

  ngOnInit(): void {
  }

  isLogged(){

    if(localStorage.getItem("userInfo")){
      this.router.navigate(["/"]);
    }else{
      this.router.navigate(["/login"]);
    }
  }

}
