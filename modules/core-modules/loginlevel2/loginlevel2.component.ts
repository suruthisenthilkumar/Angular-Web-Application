import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BottomSheetComponent } from '../login/login.component';
import { MatBottomSheet } from '@angular/material';
import { AuthService } from 'src/app/services/Authentication-services/auth-service';

@Component({
  selector: 'app-loginlevel2',
  templateUrl: './loginlevel2.component.html',
  styleUrls: ['./loginlevel2.component.css']
})
export class Loginlevel2Component implements OnInit {

  user_password: String;
  currentUser: User;
  user: String;
  action: string;
  constructor(public bottomSheet: MatBottomSheet, public authService: AuthService, public formBuilder: FormBuilder, public router: Router, private snackBar: MatSnackBar) {
    this.currentUser = this.authService.currentUserValue;
    console.log(this.currentUser)
    this.user = this.currentUser.name;
  }
  hide: Boolean = true;
  errorAlert: String;
  error: Boolean;
  admin = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  loginForm = this.formBuilder.group({
    password: ['', [Validators.required]]
  })


  ngOnInit() {
    if (this.authService.loggedIn) {
      this.router.navigate(['/dashboard']);
    }
    let user = [];
    user.push(localStorage.getItem('currentUser'))
    if (user[0] === '{"Message":"You are not logged in!"}' || (localStorage.getItem('currentUser') === null)) {
      this.admin = true;
    }
  }


  signin() {
    this.authService.validatePassword(this.user_password, this.currentUser.email, this.currentUser.role, this.currentUser.location)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/dashboard']);
        },
        error => {
          if (error.error.error === "Looks like you're already logged in elsewhere!") {
            this.openBottomSheet(error.error.error)
          } else {
            console.log(this.errorAlert);
            this.snackBar.open(error.error.error, '', {
              duration: 5000,
              panelClass: ['errorBar']
            })
          }
        }
      )
  }

  openBottomSheet(error) {
    let sheetRef = this.bottomSheet.open(BottomSheetComponent, {
      data: { errorMsg: error, changeBtn: 'Clear Open Sessions?' },
      panelClass: ['sheet']
    });
    sheetRef.afterDismissed().subscribe(data => {
      console.log('after close data :', data);
      if (data && data.message == 'change') {
       this.clearSession();
      }
    });
  }

  clearSession(){
    this.action='clearSession'
    this.authService.deteleSecret(this.currentUser.email,this.currentUser.role,'delteSecret').subscribe(
      res=>{
        console.log(res)
        this.snackBar.open('Please login now. Other sessions have been closed successfullly', '', { duration: 3000, panelClass: ['successBar'] });
      },error=>{
        this.snackBar.open(error, '', { duration: 3000, panelClass: ['successBar'] });
        console.log(error)
      }
    )
  }
}