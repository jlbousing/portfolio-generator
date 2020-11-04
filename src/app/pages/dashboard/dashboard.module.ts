import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DashboardComponent} from './dashboard.component';
import { RouterModule, Routes} from '@angular/router';

import { MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';


const routes: Routes = [
  {path: "dashboard", component: DashboardComponent}
];


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ]
})
export class DashboardModule { }
