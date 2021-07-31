import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { apiUrls } from "../../../services/shared/apiEndPoint";
import { AppConstant } from "../../../services/shared/constant";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { GetStartedService } from 'src/app/services/get-started-page/get-started.service';

import { User } from 'src/app/models/user';
import { takeUntil } from 'rxjs/operators';
import { AlertComponent } from '../alert/alert.component';
import { MatSpinnerComponent } from '../mat-spinner/mat-spinner.component';
import { MatRadioChange, MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/services/Authentication-services/auth-service';
import { element } from 'protractor';
import { count, table } from 'console';

let baseURL = AppConstant.BASE_API_URL;

const UploadURL1 = baseURL + apiUrls.editRFIFile;

@Component({
  selector: 'app-viewrfians',
  templateUrl: './view-rfians.component.html',
  styleUrls: ['./rfians.component.css']
})

export class RfiansComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  currentUser: User;
  Answers: any = [];
  general:Boolean=true;tech:Boolean=true;eut:Boolean=true;
  constructor(public dialogRef: MatDialogRef<RfiansComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private getStarted: GetStartedService, private snackBar: MatSnackBar) {
    this.currentUser = this.authService.currentUserValue;
  }

  displayedColumns = ['questions', 'answers'];
  displayTable = [];
  dataSource = new MatTableDataSource();
  ngOnInit() {
    this.Answers = this.data.RFIdata;
    console.log(this.Answers);

    this.open('tab1');
  }
  tab1: boolean; tab2: boolean; tab3: boolean; activeButton: string;
  open(tab) {
    this.displayTable = [];
    if (tab.includes('tab1')) {
      this.tab1 = true; this.tab2 = false; this.tab3 = false;
      this.dataSetting(["General"])
    }
    else if (tab.includes('tab2')) {
      this.tab1 = false; this.tab2 = true; this.tab3 = false;
      this.dataSetting(["Technical"])
    }
    else {
      this.tab1 = false; this.tab2 = false; this.tab3 = true;
      this.dataSetting(["Load Balancer Details", "web Server Details", "Database Server Configuration", "Application Server Details", "Miscellaneous Technology  Server Configuration"])
    }
    this.activeButton = tab;
  }
  dataSetting(type) {
    for (let i = 0; i < type.length; i++) {
      for (let j = 0; j < this.Answers.length; j++) {
        if (this.Answers[j].name === type[i]) {
          this.displayTable.push(this.Answers[j])
        }
      }
    }
  }

  downloadFile(filename) {
    this.getStarted.downloadFile(this.currentUser.email, this.data.selectedClient, filename).pipe(takeUntil(this.destroy$))
      .subscribe(
        res => { console.log(res) },
        err => { console.log(err), err => { console.log(err), this.snackBar.open('Error In Downloading The File! Please contact support Team.', '', { duration: 2000 }) } }
      )
  }

  isActive = function (buttonName) {
    return this.activeButton === buttonName;
  }

}




@Component({
  selector: 'app-editrfians',
  templateUrl: './edit-rfians.component.html',
  styleUrls: ['./rfians.component.css']
})
export class EditRfiansComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  notSupported: boolean;
  fileNotUploaded: boolean;
  decimalErr: boolean;
  currentUser: User;
  fileName: String = '';
  Answers: any;
  displayTable: any = [];
  loaded: boolean = false;

  constructor(public dialogRef: MatDialogRef<EditRfiansComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private fb: FormBuilder, private getstarted: GetStartedService, private authService: AuthService, private snackBar: MatSnackBar) {
    this.fileNotUploaded = true;
    this.currentUser = this.authService.currentUserValue;

  }
  public uploader1: FileUploader = new FileUploader({
    url: UploadURL1,
    disableMultipart: false,
    autoUpload: false,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['pdf'],
    headers: [{ name: 'Authorization', value: localStorage.getItem('access_token') }]
  });

  ngOnInit() {
    console.log(this.data)
    this.Answers = this.data.RFIdata;
    this.uploader1.onBuildItemForm = (file: any, form: any) => {
      form.append('reqid', this.data.selectedClient)
    }

    this.uploader1.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader1.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader1.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);


    this.checkboxGroup.valueChanges.subscribe(
      res => {
        // if(res.loadBalancer===false)
        // // this.loadBalancerFormGroup.reset()
        // if(res.applicationServer===false)
        // // this.applnServerFormGroup.reset()
        // if(res.webServer===false)
        // // this.webServerFormGroup.reset()
        // if(res.databaseServer===false)
        // this.dbServerFormGroup.reset()
      }
    )
    this.createArray();

  }
  group: FormGroup = new FormGroup({});
  rfiFormGroup: FormGroup = new FormGroup({});

  async createArray() {
    let count = 0; let subArr = [];
    let subgroup: FormGroup = new FormGroup({});
    await this.Answers.forEach(async element => {
      count++; let fgname = element.name.replace(/\s/g, '')
      this.group = new FormGroup({});
      if (element.name === "General" || element.name === "Technical") {
        for (let i = 0; i < element.answers.length; i++) {
          this.createFG(element.answers[i])
        }
        this.rfiFormGroup.addControl(fgname, this.group);
        this.displayTable.push({ name: element.name, fg: fgname, subarray: element.answers, type: "singleForm" })
      } else {
        for (let i = 0; i < element.answers.length; i++) {
          this.createFG(element.answers[i])
        }
        subgroup.addControl(fgname, this.group);
        if (element.name.includes("Miscellaneous"))
          subArr.push({ name: element.name, fg: fgname, subarray: element.answers, boolean: this.loaded })
        else {
          subArr.push({ name: element.name, fg: fgname, subarray: element.answers, boolean: 'check' })
          var result = element.answers.filter(ans => (ans.answers !== '' && ans.answers !== null && !ans.answers.includes("entryValue")));
          console.log(element.name, result)
          if (result.length > 0)
            this.checkboxGroup.controls[fgname].setValue(true);
        }
        if (count === this.Answers.length) {
          this.rfiFormGroup.addControl("EUT", subgroup);
          this.displayTable.push({ name: "EUT Server Details", fg: 'EUT', subarray: subArr, type: "multiform" })
        }
      }
    });
    this.table()
  }

  createFG(ques) {
    let fg: FormGroup;
    if (ques.details.answerType === "text" || ques.details.answerType === "radio") {
      if (ques.details.answerType === "text" && ques.details.validation != "none") {
        let min = ques.details.mmin; let max = ques.details.max;
        fg = this.fb.group({
          id: [ques.id], value: [ques.answers, [Validators.min(min), Validators.max(max), Validators.required]]
        })
      } else {
        fg = this.fb.group({
          id: [ques.id], value: [ques.answers, Validators.required]
        })
      }
      this.group.addControl(ques.id, fg)
    }
    else if (ques.details.answerType === "radioGroup") {
      let ans = JSON.parse(ques.answers);let radVal=null;let entVal=null;
      if(ans!=null)
      { radVal = ans.radioValue; entVal  = ans.entryValue;}
      let value = this.fb.group({ radioValue: [radVal, Validators.required], entryValue: [entVal] })
      fg = this.fb.group({
        id: [ques.id],
        value: value
      })
      this.group.addControl(ques.id, fg)
    }
    else if (ques.details.answerType == "textarea" || ques.details.answerType === "uploadImage") {
      fg = this.fb.group({
        id: [ques.id],
        value: [ques.answers]
      });
      this.group.addControl(ques.id, fg)
    }
  }

  radioGroupChange(form, id) {
    let fid = id.toString();
    this.rfiFormGroup.controls[form].get(fid).get('value').get('entryValue').reset();
  }
  radioChange(subform, id) {
    let fid = id.toString();
    this.rfiFormGroup.controls["EUT"].get(subform).get(fid).get('value').get('entryValue').reset();
  }
  table() {
    this.loaded = true;
  }

  checkboxGroup = new FormGroup({
    ApplicationServerDetails: new FormControl(false),
    DatabaseServerConfiguration: new FormControl(false),
    LoadBalancerDetails: new FormControl(false),
    webServerDetails: new FormControl(false),
  });

  validateNumber(e) {
    let input = e;
    const reg = /^\d*\.?\d{0,2}$/;
    if (!reg.test(input)) {
      this.decimalErr = true;
    } else
      this.decimalErr = false;
  }

  fileChangeEvent(fileInput: any) {
    // this.techQnsFormGroup.value.diagram=fileInput.target.files[0].name;
  }

  public onFileSelected(imgInput) {
    this.fileNotUploaded = false;
    if (imgInput[0]) {
      const File: File = imgInput[0];
      if (!(File.type === "application/pdf")) {
        console.log("not image")
        this.notSupported = true;
      } else {
        this.notSupported = false;
      }
    }
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let data = JSON.parse(response);
    console.log(data) //success server response

  }
  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let error = JSON.parse(response);
    console.log(error) //error server response

  }

  downloadFile(filename) {
    this.getstarted.downloadFile(this.currentUser.email, this.data.selectedClient, filename).pipe(takeUntil(this.destroy$))
      .subscribe(
        err => { console.log(err), this.snackBar.open('Error In Downloading The File! Please contact support Team.', '', { duration: 2000 }) }
      )
  }

  onSubmit() {
    this.openSpinner()
    // this.uploader1.uploadAll();
    let answers = [];

    for (const subfield in this.rfiFormGroup.controls) {
      for (const field in this.rfiFormGroup.controls[subfield].value) {
        if (/\d/.test(field)) {
          answers.push(this.rfiFormGroup.controls[subfield].value[field])
        } else {
          for (const infield in this.rfiFormGroup.controls[subfield].get(field).value) {
            answers.push(this.rfiFormGroup.controls[subfield].get(field).get(infield).value)
          }
        }
      }
    }
    console.log('submitted')
    this.getstarted.updateRFIAns(this.data.selectedClient,this.currentUser.email,answers)
    .pipe(takeUntil(this.destroy$)).subscribe(
      result=>{
        this.dialog.closeAll()
        console.log(result);
        this.openAlert(result.Message)

      },error=>{
        console.log(error.error.error);
        this.openAlert(error.error.error)
      }
    );
  }
  openAlert(result) {
    const dialogRef = this.dialog.open(AlertComponent, {
      disableClose: true,
      data: {
        // title: 'Message!!',
        message: result,
        buttonText: {
          ok: 'OK',
        },
        type: 'editRFI',
        additionaldata: 'null'
      },
    });
  }
  openSpinner() {
    const dialogRef2 = this.dialog.open(MatSpinnerComponent, {
      backdropClass: 'backdropBackground'
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
