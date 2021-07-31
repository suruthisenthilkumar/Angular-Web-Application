import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import { UserRoleDirective } from 'src/app/directives/userRole.directive';
import { CurrentUserDirective } from 'src/app/directives/currentUser.directive';
import { MaterialModule } from 'src/app/material';
import { ToolbarComponent } from 'src/app/modules/core-modules/toolbar/toolbar.component';

@NgModule({
  imports: [CommonModule,MaterialModule],
  declarations: [
      UserRoleDirective,
    CurrentUserDirective,
    ToolbarComponent
  ],
  exports: [
      UserRoleDirective,
    CurrentUserDirective,
    ToolbarComponent
  ]
})
  export class SharedModule { }