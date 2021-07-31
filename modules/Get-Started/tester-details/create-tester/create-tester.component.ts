import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheetRef, MatSnackBar, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { error } from 'protractor';
import { timeout } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/Authentication-services/auth-service';
import { GetStartedService } from 'src/app/services/get-started-page/get-started.service';
import { CommonService } from 'src/app/services/shared/common.service';

@Component({
  selector: 'app-create-tester',
  templateUrl: './create-tester.component.html',
  styleUrls: ['../tester-details.component.css']
})
export class CreateTesterComponent implements OnInit {
  currentUser: User;
  error: boolean;
  emailPattern:any;

  constructor(private bottomSheetRef: MatBottomSheetRef<CreateTesterComponent>,private getStarted:GetStartedService,private common:CommonService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,private formBuilder:FormBuilder,private snackBar:MatSnackBar,
    private as:AuthService
  ) { 
    this.currentUser = this.as.currentUserValue;
    this.emailPattern=this.common.emailPattern;
  }
  testerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    location :['',[Validators.required]]

  })
  msg: string;
  changeBtn: String;
  cancelBtn: any;
  errorMsg:any='empty';

  clearBar(): void {
    this.bottomSheetRef.dismiss({
      message: 'Cancel',
    });
    event.preventDefault();
  }

  create() {
    this.getStarted.createSME(this.currentUser.email,this.testerForm.value).subscribe(res=>{
      console.log(res);
      this.errorMsg=''; this.error=false;
      this.bottomSheetRef.dismiss({
        message: 'SUCCESS'
      });
    },err=>{
      this.errorfun(err)
    })
  }
  errorfun(e){
    console.log(e)
    this.snackBar.open(e.error);
  }

  ngOnInit() {
    console.log('data received', this.data);
    // this.msg = this.data.errorMsg;
    // this.changeBtn = this.data.changeBtn;
  }
}