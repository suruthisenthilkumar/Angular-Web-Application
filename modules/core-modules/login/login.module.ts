import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { MaterialModule } from 'src/app/material';
import { Loginlevel2Component } from '../loginlevel2/loginlevel2.component';
import { LoginComponent, BottomSheetComponent } from './login.component';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';


@NgModule({
  declarations: [
    LoginComponent,
    Loginlevel2Component,
    BottomSheetComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule
  ],
  providers:[
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
    { provide: MatBottomSheetRef, useValue: {} }
  ],
  entryComponents:[BottomSheetComponent]
})
export class LoginModule { }
