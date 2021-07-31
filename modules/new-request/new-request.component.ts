import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/Authentication-services/auth-service';
import { NewregistrationService } from 'src/app/services/registerpage/newregistration.service';
import { CommonService } from 'src/app/services/shared/common.service';
import { AlertComponent } from '../pop-ups/alert/alert.component';
import { MatSpinnerComponent } from '../pop-ups/mat-spinner/mat-spinner.component';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent implements OnInit {

  DetailsFormGroup: FormGroup;
  currentUser: User;
  decimalErr: boolean;
  emailPattern;
  urlPattern;
  currencies;
  constructor(private authService:AuthService,private fb: FormBuilder,private common:CommonService,private registration: NewregistrationService, public router: Router, public dialog: MatDialog) {
    this.currentUser = this.authService.currentUserValue;

    this.DetailsFormGroup = this.fb.group({
      Rqstername: ['', Validators.required],
      Prjname: ['', Validators.required],
      JOstatus: ['', Validators.required],
      projectType: ['', Validators.required],
      symbol: ['', Validators.required],
      JOvalue: ['', [Validators.required]],
      commstatus: ['', [Validators.required]],
    });
    this.currencies=this.common.currencies;
    this.urlPattern=this.common.urlPattern;
    this.emailPattern=this.common.emailPattern;
  }
 
  ngOnInit() {
  }

  public errormsg: Boolean = false;
  public message: String;
  validateNumber(e) {
    let input = e;
    const reg = /^\d*\.?\d{0,2}$/;
    if (!reg.test(input)) {
      this.decimalErr = true;
    } else
      this.decimalErr = false;
  }
  dialogRef:any;

  onSubmit() {
    this.dialogRef = this.dialog.open(MatSpinnerComponent, {
      backdropClass: 'backdropBackground'
    });
    this.registration.newRequest(this.currentUser.email,this.DetailsFormGroup.value).subscribe(
      res => {
        this.dialogRef.close();
        this.openAlert(res.Message)
      },
      error => {
        this.dialog.closeAll();
        this.dialogRef.close();
        this.errormsg = true;
        this.message = error.error.error;
      }
    );
  }

  openAlert(result) {
    this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        message: result,
        buttonText: {
          ok: 'OK',
        },
        type: 'newRFI',
        additionaldata: 'null'
      },
    });
  }

}
