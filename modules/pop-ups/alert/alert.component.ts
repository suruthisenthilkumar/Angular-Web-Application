import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GetStartedService } from 'src/app/services/get-started-page/get-started.service';
import { takeUntil } from 'rxjs/operators'
import { AuthService } from 'src/app/services/Authentication-services/auth-service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText: any;
  cancelButton: boolean = false;
  Info: String;
  successmessage: any;
  done: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  type: any;
  title: String;
  currentUser: User;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<AlertComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router, private getstarted: GetStartedService
    , private authService: AuthService) {
    this.currentUser = authService.currentUserValue;
    console.log(data)
    if (data) {
      this.title = data.title;
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        if (data.buttonText.cancel) {
          this.cancelButtonText = data.buttonText.cancel;
          this.cancelButton = true;
        }
      }
      if (data.type) {
        this.type = data.type;
        this.Info = data.additionaldata;
      }
    }
  }

  ngOnInit() {
  }

  onConfirmClick(): void {
    if (this.type === 'signOff') {
      this.getstarted.signingoff(this.Info[0], this.Info[1], this.Info[2])
        .pipe(takeUntil(this.destroy$)).subscribe(
          res => {
            this.done = true;
            this.successmessage = "Tester Deleted Successfully!!"
            setTimeout(() => this.dialogRef.close(res.Message), 2000)
          }, err => {
            setTimeout(() => this.dialogRef.close(err.error.error), 1000)
          }
        );
    }
    else if (this.type === 'editRFI') {
      this.dialog.closeAll();
    }
    else if (this.type === 'newRequest') {
      this.dialog.closeAll();
      this.router.navigate(['/Portal/login']);
    }
    else if (this.type === 'newRFI') {
      this.dialog.closeAll();
      this.router.navigate(['/Portal/getstarted']);
    }
    else if (this.type === 'interceptor error') {
      this.dialog.closeAll();
      if (this.currentUser != null) {
        console.log("interceptor")
        this.authService.logout();
      }
      else {
        console.log("loggedout")
        this.authService.logout();
        this.router.navigate(['login']);
        window.location.reload();
      }
    } else if (this.type === "deleteTester") {
      this.dialogRef.close(true)
    }
    else {
      this.dialog.closeAll();
      this.authService.logout();
      // this.dialogRef.close(true);
    }
  }

  onCancelClick() {
    this.dialogRef.close(false);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
