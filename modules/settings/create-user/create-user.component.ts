import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatPaginator, MatSnackBar, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { element } from 'protractor';
import { toUnicode } from 'punycode';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/adminActions/admin.service';
import { AuthService } from 'src/app/services/Authentication-services/auth-service';
import { AlertComponent } from '../../pop-ups/alert/alert.component';

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  currentUser: User;
  userSource: any;
  dataColumns = ['s.no', 'Username', 'Designation', 'Email', 'Admin Status', 'Actions']
  ph: boolean;
  pl: boolean;
  create: boolean;
  nomatch: boolean;

  constructor(private admin: AdminService, private as: AuthService, private fb: FormBuilder, private dialog: MatDialog,
    private snack: MatSnackBar) {
    this.currentUser = this.as.currentUserValue;
  }
  @ViewChild(MatPaginator, { static: false }) userPaginator: MatPaginator;

  ngOnInit() {
    this.toggelePH()
  }
  fetchData(role) {
    this.admin.getAllPHandPL(this.currentUser.email).subscribe(
      res => {
        console.log(res);
        let data = [];
        res.filter(element => {
          if (element.admin_status === null) element.admin_status = false
          if (element.role === role) data.push(element);

        })
        this.userSource = new MatTableDataSource(data);
        this.userSource.data = data;
        this.userSource.paginator = this.userPaginator;
      }, err => {
        console.log(err);
      }
    )
  }

  toggelePH() {
    this.ph = true; this.pl = false;
    console.log(this.ph)
    console.log(this.pl)
    this.fetchData('performancehead');
  }

  toggelePL() {
    this.pl = true; this.ph = false;
    console.log(this.ph)
    console.log(this.pl)
    this.fetchData('performancelead');
  }

  applyFilter(filterValue: string) {
    this.userSource.filter = filterValue.trim().toLowerCase();
    if (this.userSource.filteredData.length == 0) { this.nomatch = true; }
    else { this.nomatch = false; }
  }

  createUser() {
    this.create=true;
    this.dialog.open(EditUserComponent, {
      disableClose: false, data: { type: "create" }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.snack.open("User has been created successfully"); this.refresh();
      }
      this.create=false;
    })
  }

  deleteUser(user) {
    this.dialog.open(AlertComponent, {
      disableClose: true, data: {
        title: 'Alert!!',
        message: 'Are you sure you want to delete this User?',
        buttonText: {
          ok: 'OK',
          cancel: 'Dismiss'
        },
        type: 'deleteTester',
      }
    }).afterClosed().subscribe(
      res => {
        if (res) {
          this.admin.deleteheadorLead(this.currentUser.email, user.id).subscribe(res => {
            console.log(res); this.snack.open("User Deleted Successfully!")
            this.refresh();
          }, err => {
            console.log(err)
          })
        }
      }
    )
  }

  refresh() {
    if (this.pl) this.toggelePL();
    if (this.ph) this.toggelePH();
  }

  editUser(user) {
    this.dialog.open(EditUserComponent, {
      disableClose: false, data: { type: "edit", user: user }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.snack.open("User Details updated successfully"); this.refresh();
      }
    })
  }
}

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class EditUserComponent implements OnInit {

  userDetails: FormGroup;
  currentUser: User;
  errorMsg: any;
  emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  error: boolean;

  constructor(private admin: AdminService, private as: AuthService, private fb: FormBuilder, private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<EditUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentUser = this.as.currentUserValue;
  }

  ngOnInit() {
    if (this.data.type == "edit") {
      this.userDetails = this.fb.group({
        uid: ['', Validators.required],
        username: ['', Validators.required],
        designation: ['', Validators.required],
        admin_status: ['', Validators.required]
      })

      this.userDetails.get('username').setValue(this.data.user.username);
      this.userDetails.get('uid').setValue(this.data.user.id);
      this.userDetails.get('designation').setValue(this.data.user.designation);

      if (this.data.user.admin_status) this.userDetails.get('admin_status').setValue("true");
      else this.userDetails.get('admin_status').setValue("false");

    }
    else if (this.data.type == "create") {
      this.userDetails = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        location: ['', Validators.required],
        role: ['', Validators.required],
        admin_status: ['', Validators.required]
      })
    }
  }

  save() {
    this.admin.editUserInfo(this.currentUser.email, this.userDetails.value).subscribe(
      res => {
        console.log(res);
        this.dialogRef.close(true);
      }, err => {
        this.error = true;
        this.snackbar.open(err.error.error)
      }
    )
  }

  create() {
    this.admin.createNewLead(this.currentUser.email, this.userDetails.value).subscribe(
      res => {
        console.log(res);
        this.dialogRef.close(true)
      }, err => {
        console.log(err);
        this.snackbar.open(err.error.error)
      }
    )
  }
  cancel() {
    this.dialogRef.close(false);
  }
}
