import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from 'src/app/services/shared/shared.module';
import { MaterialModule } from 'src/app/material';
import { ChangeConfigDialog, SettingsComponent } from './settings.component';
import { CreateUserComponent, EditUserComponent } from './create-user/create-user.component';
import { EditRfiQnsComponent, RfiQuestionComponent } from './rfi-question/rfi-question.component';


@NgModule({
  declarations: [
    SettingsComponent,
    ChangeConfigDialog,
    CreateUserComponent,
    EditUserComponent,
    RfiQuestionComponent,
    EditRfiQnsComponent
  ],
  imports: [
    CommonModule,SharedModule,
    SettingsRoutingModule,MaterialModule,
    SettingsRoutingModule
  ],
  entryComponents:[ChangeConfigDialog,EditUserComponent,EditRfiQnsComponent]
})
export class SettingsModule { }
 