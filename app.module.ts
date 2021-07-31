import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthGuard} from './auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AlertComponent } from './modules/pop-ups/alert/alert.component';
import { MainFrameComponent } from './modules/core-modules/main-frame/main-frame.component';
import { MatSpinnerComponent } from './modules/pop-ups/mat-spinner/mat-spinner.component';
import { AuthService } from './services/Authentication-services/auth-service';
import { HttpErrorInterceptor } from './services/Authentication-services/http-interceptor';
import { UserIdleModule } from 'angular-user-idle';
import { SharedModule } from './services/shared/shared.module';
import { RefreshTokenService } from './services/RefreshToken/refreshtoken.service';
import { CommonService } from './services/shared/common.service';
import { NewRequestComponent } from './modules/new-request/new-request.component';
import { LocationStrategy, Location, PathLocationStrategy } from '@angular/common';
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

export function get_user(appLoadService: RefreshTokenService) {
  var result =()=>appLoadService.load();
  return result;
}

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    MainFrameComponent,
    MatSpinnerComponent,
    NewRequestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UserIdleModule.forRoot({idle: 3600, timeout: 30, ping: 9}),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['localhost:4200/login']
      }
    })
  ],
  providers: [AuthGuard,AuthService,CommonService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  },
  Location, {provide: LocationStrategy, useClass: PathLocationStrategy},
  { provide: APP_INITIALIZER, useFactory: get_user, deps: [RefreshTokenService], multi: true }
],
  bootstrap: [AppComponent],
  entryComponents:[AlertComponent,MatSpinnerComponent]
})

export class AppModule { }
