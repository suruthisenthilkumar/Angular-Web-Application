import { Component, OnInit, Inject } from '@angular/core';

import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material';


import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/Authentication-services/auth-service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, public formBuilder: FormBuilder, public router: Router, private snackBar: MatSnackBar, private bottomSheet: MatBottomSheet) {
    if (this.authService.loggedIn) {
      this.router.navigate(['/dashboard']);
    }
   }
  loginForm :FormGroup;
  user:boolean=true;
  admin:boolean=false;
  hide:boolean=true;
  user_name: String;
  errorAlert: string;
  error: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  errorMessage: string;


  ngOnInit() {
   
    this.user=true;this.admin=false;
    this.loginForm= this.formBuilder.group({
      email: ['', [Validators.required]],
      loginAs: ['', [Validators.required]],
      location: ['', Validators.required]
    })
    //  localStorage.removeItem('currentUser');
  }

  adminLogin(){
    this.user=false;this.admin=true;
    this.loginForm= this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    })

  }
  goBack(){
    this.ngOnInit()
  }
  login() {
    console.log(this.loginForm.value)
    if(this.user){
      this.authService.authorize(this.loginForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => { console.log(res);this.router.navigate(['login/authenticate-usr']);},
        error => {
          console.log(error);
          this.snackBar.open(error.error.error, '', { duration: 5000, panelClass: ['errorBar'] });
        }
      );
    }else if(this.admin){
      this.authService.authorizeAdmin(this.loginForm.value.email,this.loginForm.value.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res=>{ console.log(res);this.router.navigate(['dashboard']);},
        error=>{
          console.log(error);
          this.snackBar.open(error.error.error, '', { duration: 5000, panelClass: ['errorBar'] });
        }
        );
    }
   
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}


@Component({
  selector: 'bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./login.component.css']
})
export class BottomSheetComponent implements OnInit {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  msg: string;
  changeBtn: String;
  cancelBtn: any;

  clearBar(): void {
    this.bottomSheetRef.dismiss({
      message: 'Cancel',
      data: this.data
    });
    event.preventDefault();
  }

  changeStatus() {
    this.bottomSheetRef.dismiss({
      message: 'change',
      data: this.data
    });
  }

  ngOnInit() {
    console.log('data received', this.data);
    this.msg = this.data.errorMsg;
    this.changeBtn = this.data.changeBtn;
  }
}
