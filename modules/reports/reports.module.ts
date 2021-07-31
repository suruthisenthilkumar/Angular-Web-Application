import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { MaterialModule } from 'src/app/material';
import { SharedModule } from 'src/app/services/shared/shared.module';


@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
