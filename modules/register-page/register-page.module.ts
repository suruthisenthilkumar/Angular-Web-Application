import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterPageRoutingModule } from './register-page-routing.module';
import { RegisterPageComponent } from './register-page.component';
import { MaterialModule } from 'src/app/material';
import{FileUploadModule} from 'ng2-file-upload';



@NgModule({
  declarations: [
    RegisterPageComponent,
  ],
  imports: [
    CommonModule,
    RegisterPageRoutingModule,
    MaterialModule,
    FileUploadModule
  ]
})
export class RegisterPageModule { }
