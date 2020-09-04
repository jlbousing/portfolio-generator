import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatCardModule} from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent} from './login.component';
import { AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { LoginServiceService} from './login-service.service';
import { environment} from '../../../environments/environment';

const routes: Routes = [
  {path: "login", component: LoginComponent}
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    LoginServiceService
  ]
})
export class LoginModule { }
