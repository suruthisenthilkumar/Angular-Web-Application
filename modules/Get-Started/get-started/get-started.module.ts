import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatePipe } from '@angular/common';

import { GetStartedRoutingModule } from './get-started-routing.module';
import { GetStartedComponent } from './get-started.component';
import { MaterialModule } from 'src/app/material';

import { TesterDetailsComponent } from '../tester-details/tester-details.component';
import { AssignTesterComponent } from '../../pop-ups/assign-tester/assign-tester.component';
import { RfiansComponent, EditRfiansComponent } from '../../pop-ups/rfians/rfians.component';
import { UpdateStatusComponent } from '../../pop-ups/update-status/update-status.component';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedModule } from 'src/app/services/shared/shared.module';
import { CreateTesterComponent } from '../tester-details/create-tester/create-tester.component';
import { ClientDetailsComponent, EditClientDetails } from '../client-details/client-details.component';


@NgModule({
  declarations: [
    GetStartedComponent,
    ClientDetailsComponent,
    EditClientDetails,
    TesterDetailsComponent,
    AssignTesterComponent,
    RfiansComponent,
    EditRfiansComponent,
    UpdateStatusComponent,
    CreateTesterComponent
  ],
  imports: [
    CommonModule,
    GetStartedRoutingModule,
    MaterialModule,
    FileUploadModule,
    SharedModule
  ],
  providers:[DatePipe],
  entryComponents:[AssignTesterComponent,UpdateStatusComponent,EditClientDetails,CreateTesterComponent,RfiansComponent,EditRfiansComponent]
})
export class GetStartedModule { }
