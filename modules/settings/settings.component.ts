import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/adminActions/admin.service';
import { AuthService } from 'src/app/services/Authentication-services/auth-service';
import { CommonService, CrossFieldErrorMatcher } from 'src/app/services/shared/common.service';


export interface DialogData {
  email: string;
  name: string;
}


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  gsacmail: string;
  gsacpass: string;
  managermail: string;
  message: any;
  adminpass: String;
  done: boolean;
  done2: boolean;
  emailPattern :any;passpattern :any;matcher :any;confirmPassMatcher :any;
  hide1 = true;hide2 = true;hide = true;
  currentUser: User
  disable = false;
  Role = Role;
  destroy$: Subject<boolean> = new Subject<boolean>(); 

  constructor(public common:CommonService ,public dialog: MatDialog, public changeconfig: AdminService, public router: Router, public authService: AuthService, public formBuilder: FormBuilder) {
    this.currentUser = this.authService.currentUserValue;
    this.matcher=common.matcher;
    this.confirmPassMatcher=common.confirmPassMatcher;
    this.emailPattern=common.emailPattern;
    this.passpattern=common.passpattern;
  }

  configDetails = this.formBuilder.group({
    gsacmail: ['', [Validators.required, Validators.email]],
    oldpass: ['', Validators.required],
    gsacmailpass: ['', [Validators.required, Validators.minLength(8), Validators.pattern]],
    gsac_confirm_password: [''],
    managermail: ['', [Validators.required, Validators.email]],
  }, { validator: [this.checkPasswords] })

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let condition = group.get('gsacmailpass').value != group.get('gsac_confirm_password').value;
    return condition ? { passwordsDoNotMatch: true } : null;
  }
  

  ngOnInit() {
    if (this.currentUser.admin_status != true) {
      this.authService.logout();
    }


    this.changeconfig.getConfigDetails(this.currentUser.email).pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          console.log(res);
          this.gsacmail = res.admin_email;
          this.gsacpass = res.admin_password;
          this.managermail = res.manager_email;
        }
      )
    this.configDetails.disable();
  }

  edit() {
    this.disable = true;
    this.configDetails.enable();
    this.gsacpass = "";
    this.configDetails.get('oldpass').reset();
    this.done = this.done2 = false;
  }

  store() {
    const dialogRef = this.dialog.open(ChangeConfigDialog,
      {
        disableClose: true,
        width: '650px',
        data: { adminpass: '' }
      });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$))
      .subscribe(
        result => {
          if (result) {
            this.changeconfig.ConfigUpdate(this.currentUser.email, this.configDetails.value).pipe(takeUntil(this.destroy$))
            .subscribe(
              res => {
                // console.log(res)
                this.message = res.Message;
                this.done = true;
                this.done2 = false;
              }, error => {
                this.message = error.error.error;
                // console.log(error)
                this.done2 = true;
                this.done = false;
              }
            )
          }
        });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}

@Component({
  selector: 'change-config-dialog',
  templateUrl: 'change-config-dialog.html',
  styleUrls: ['./settings.component.css']
})
export class ChangeConfigDialog {
  message: any;
  done: boolean;
  currentUser: User;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public changeconfig: AdminService, public authService: AuthService,
    public dialogRef: MatDialogRef<ChangeConfigDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentUser = this.authService.currentUserValue

  }

  gsacPass: String = null;
  hide: Boolean = true;
  result: String;
  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    // console.log(this.gsacPass)
    this.changeconfig.getConfigCheck(this.currentUser.email, this.gsacPass).pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          this.dialogRef.close({ result: res });
        }, error => {
          this.message = error.error.error;
          console.log(error)
          this.done = true;
        }
      )

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

