import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DashboardComponent} from './dashboard.component';
import { RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path: "dashboard", component: DashboardComponent}
];


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class DashboardModule { }