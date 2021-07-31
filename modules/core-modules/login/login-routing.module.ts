import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { Loginlevel2Component } from '../loginlevel2/loginlevel2.component';


const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'authenticate-usr',
   component:Loginlevel2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
