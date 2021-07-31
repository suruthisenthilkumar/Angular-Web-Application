import { HttpEvent,HttpInterceptor,HttpHandler,HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, timeout } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlertComponent } from 'src/app/modules/pop-ups/alert/alert.component';
import { AuthService } from './auth-service';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class HttpErrorInterceptor implements HttpInterceptor {
  href: String;
  constructor(public router: Router, private authService: AuthService,public dialog: MatDialog) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('access_token')) {
      request = request.clone({
        setHeaders: {
          Authorization: localStorage.getItem('access_token')
        }
      });
    }
    return next.handle(request)
      .pipe(
        // retry(1),  
        timeout(30000),

        catchError(error => {
          let errorMessage = '';
          // console.log('status');
          console.log(error);
          if (error.status == 403) {
            errorMessage = `Error: ${error.statusText}`;

          }
          if (error.error.error === "Your session has expired") {
            this.openAlert("Your session has expired. Please login again!")
          }
          if (error.status === 401 && error.error.Message === "Invalid User") {
            this.openAlert("Invalid User credentials!! Please login again!")
          }
          if (error.status === 401 && error.error.error === "Access Denied!") {
            this.openAlert("Your session has expired. Please login again!")
          }
          if (error.status === 401 && error.error.Message === "Unauthorized") {
            this.openAlert("Unauthorised Token! Please login again!")
          } 
          if (error.statusText === "Unauthorized") {
            this.openAlert("Unauthorised Entry! Please login again!")
          }
          if (error.status === 500 && error.error.error === "Error during token authentication") {
            this.openAlert("Unauthorised Token! Please login again!")
          }
          return throwError(error);
        })
      )
  }

  
  openAlert(msg){
    const dialogRef = this.dialog.open(AlertComponent,{
      disableClose:true,
      data:{
        message: msg,
        // title:'Error',
        type:"interceptor error",
        buttonText: {
          ok: 'OK',
        }
      },
    });
  }

  logout() {
    // console.log("interceptor")
    this.authService.logout();
    // this.router.navigate(['/login']);
  }
}