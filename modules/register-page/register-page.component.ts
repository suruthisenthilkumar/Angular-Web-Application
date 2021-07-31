import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NewregistrationService } from 'src/app/services/registerpage/newregistration.service';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { FileUploadModule } from "ng2-file-upload";

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertComponent } from '../pop-ups/alert/alert.component';
import { MatDialog } from '@angular/material/dialog';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from "../../services/shared/apiEndPoint";
import { MatSpinnerComponent } from '../pop-ups/mat-spinner/mat-spinner.component';


import { AppConstant } from "../../services/shared/constant";
import { create } from 'domain';
import { CommonService } from 'src/app/services/shared/common.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
let baseURL = AppConstant.BASE_API_URL;

const UploadURL1 = baseURL + apiUrls.uploadDiagram;
@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent implements OnInit {


  rows; currencies; geography; userLocation; headers; emailPattern; urlPattern;
  destroy$: Subject<boolean> = new Subject<boolean>();
  notSupported: boolean;
  fileNotUploaded: boolean;
  errormsg: boolean;
  message: any;
  directSubmission: boolean = false;
  initialized: boolean = false;
  decimalErr: boolean;

  EUTServer :FormGroup;
  loadBalancerFormGroup: FormGroup;
  applnServerFormGroup: FormGroup;
  miscellaneousFormGroup: FormGroup;
  dbServerFormGroup: FormGroup;
  webServerFormGroup: FormGroup;
  EUT: { name: string; array: any[]; fgname: string; boolean: any; }[];

  constructor(private fb: FormBuilder, public register: NewregistrationService, private router:Router,
    private snack:MatSnackBar,
     public dialog: MatDialog, public http: HttpClient, public _common: CommonService) {
    this.fileNotUploaded = true;
   
    this.register.getRFIQns().subscribe(res => {
      this.manipulate(res);
    })
    this.geography = this._common.geography;
    this.rows = this._common.rows;
    this.emailPattern = this._common.emailPattern;
    this.urlPattern = this._common.urlPattern;
    this.currencies = this._common.currencies;
    this.userLocation = this._common.location;
    this.headers=this._common.headers;
  }

  public uploader1: FileUploader = new FileUploader({
    url: UploadURL1,
    disableMultipart: false,
    autoUpload: false,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['pdf'],
  });

  basicInfo: FormGroup;
  generalDetails: FormGroup;
  techDetails: FormGroup;

  general = []; tech = []; load = []; appln = []; web = []; db = []; misc = [];

  manipulate(data) {
    data.forEach(element => {
      if (element.quest_type_id === 'General') { this.general.push(element) }
      if (element.quest_type_id === 'Technical') { this.tech.push(element) }
      if (element.quest_type_id === 'Load Balancer Details') { this.load.push(element) }
      if (element.quest_type_id === "web Server Details") { this.web.push(element) }
      if (element.quest_type_id === "Database Server Configuration") { this.db.push(element) }
      if (element.quest_type_id === 'Application Server Details') { this.appln.push(element) }
      if (element.quest_type_id === "Miscellaneous Technology  Server Configuration") { this.misc.push(element) }
    });
    let array = [
      { fg: 'general', data: this.general },
      { fg: 'tech', data: this.tech },
      { fg: 'lb', data: this.load },
      { fg: 'ws', data: this.web },
      { fg: 'db', data: this.db },
      { fg: 'app', data: this.appln },
      { fg: 'mc', data: this.misc }]
    this.createFG(array);
  }
  createFG(bulkData) {
    bulkData.forEach(entry => {
      let data = entry.data;
      let form = entry.fg;
      let group: FormGroup = new FormGroup({});
      data.forEach(ques => {
        let fg: FormGroup;
        if (ques.details.answerType === "text" || ques.details.answerType === "radio"  ) {
          if (ques.details.answerType === "text" && ques.details.validation != "none") {
            let min = ques.details.mmin; let max = ques.details.max;
            fg = this.fb.group({
              id: [ques.id], value: ['', [Validators.min(min), Validators.max(max), Validators.required]]
            })
          } else {
            fg = this.fb.group({
              id: [ques.id], value: ['', Validators.required]
            })
          }
          group.addControl(ques.id, fg)
        }
        else if (ques.details.answerType === "radioGroup") {
          let value = this.fb.group({ radioValue: ['', Validators.required], entryValue: [''] })
          fg = this.fb.group({
            id: [ques.id],
            value: value
          })
          group.addControl(ques.id, fg)
        }
        else if (ques.details.answerType == "textarea"||ques.details.answerType==="uploadImage") {
          fg = this.fb.group({
            id: [ques.id],
            value: ['']
          });
          group.addControl(ques.id, fg)
        }
      });
      if (form === 'general') { this.generalDetails = group; }
      else if (form === 'tech') { this.techDetails = group }
      else if (form === 'lb') { this.loadBalancerFormGroup = group }
      else if (form === 'ws') { this.webServerFormGroup = group }
      else if (form === 'db') { this.dbServerFormGroup = group }
      else if (form === 'app') { this.applnServerFormGroup = group }
      else if (form === 'mc') { this.miscellaneousFormGroup = group; this.initialized = true; }
    });
    this.data()
  }

  data() {
    this.EUTServer=this.fb.group({
      loadBalancer:this.loadBalancerFormGroup,
      applicationServer:this.applnServerFormGroup,
      miscellaneous:this.miscellaneousFormGroup,
      databaseServer:this.dbServerFormGroup,
      webServer:this.webServerFormGroup
    })
    this.EUT=[
       {name:"LOAD BALANCER DETAILS",array:this.load,fgname:'loadBalancer',boolean:'check'},
       {name:"APPLICATION SERVER DETAILS",array:this.appln,fgname:'applicationServer',boolean:'check'},
       {name:"WEB SERVER DETAILS",array:this.web,fgname:'webServer',boolean:'check'},
       {name:"DATABASE SERVER CONFIGURATON",array:this.db,fgname:'databaseServer',boolean:'check'},
       {name:"MISCELLANEOUS TECHNOLOGY SERVER",array:this.misc,fgname:'miscellaneous',boolean:this.initialized}]
  }

  ngOnInit() {

    this.uploader1.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader1.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader1.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);

    this.basicInfo = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      user:[''],
      Clientname:[''],
      location: [''],
      Prjname: ['', Validators.required],
      Rqstername: ['', Validators.required],
      Clusterhead: ['', Validators.required],
      Dlt2: ['', Validators.required],
      geography: ['', Validators.required],
      JOstatus: ['', Validators.required],
      projectType: ['', Validators.required],
      symbol: ['', Validators.required],
      JOvalue: ['', [Validators.required]],
      commstatus: ['', [Validators.required]],
      newJOvalue: ['']
    });

    this.checkboxGroup.valueChanges.subscribe(
      res => {
        if (res.loadBalancer === false)
        {
          for (const field in this.loadBalancerFormGroup.controls) { this.loadBalancerFormGroup.controls[field].get('value').reset() }
        }
        if (res.applicationServer === false)
        {
          for (const field in this.applnServerFormGroup.controls) { this.applnServerFormGroup.controls[field].get('value').reset() }
        }
        if (res.webServer === false)
        {
          for (const field in this.webServerFormGroup.controls) { this.webServerFormGroup.controls[field].get('value').reset() }
        }
        if (res.databaseServer === false)
        {
          for (const field in this.dbServerFormGroup.controls) { this.dbServerFormGroup.controls[field].get('value').reset() }
        }
      }
    )
  }

  checkboxGroup = new FormGroup({
    loadBalancer: new FormControl(false),
    applicationServer: new FormControl(false),
    webServer: new FormControl(false),
    databaseServer: new FormControl(false),
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
    this.techDetails.value.diagram = fileInput.target.files[0].name;
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

  onDirectSubmit() {
    for (const field in this.generalDetails.controls) {
      this.generalDetails.controls[field].get('value').reset() 
    }
    for (const field in this.techDetails.controls) {
      this.techDetails.controls[field].get('value').reset() 
    }
    for (const subfield in this.EUTServer.controls) {
      for( const field in this.EUTServer.controls[subfield].value){
        this.EUTServer.controls[subfield].get(field).get('value').reset()
      }
    }
    this.onSubmit();
  }

  initialCheck:boolean=true;
  check(){
    let email=this.basicInfo.value.Email;let loc=this.basicInfo.value.location;
    this.register.checkManager(this.basicInfo.value.Email,this.basicInfo.value.location).pipe(takeUntil(this.destroy$))
    .subscribe(res=>{
      console.log(res);
      if(res.response==="New User"){
        this.basicInfo.get("Email").setValue(email);
        this.basicInfo.get("Email").disable();
        this.basicInfo.get("location").setValue(loc);
        this.basicInfo.get("Clientname").setValue(res.user.name);
        this.basicInfo.get("user").setValue(email);
        this.basicInfo.get("location").disable();
        this.initialCheck=false;
      }
      else
      this.openAlert("User already exists with the portal.Please login to raise another request",'newRequest')
    },err=>{
      console.log(err);
      this.snack.open(err.error.error,'',{duration:5000})
    })
  }

  onSubmit() {
    this.openSpinner();  let answers = [];

    for (const field in this.generalDetails.controls) {
      answers.push(this.generalDetails.value[field])
    }
    for (const field in this.techDetails.controls) {
      answers.push(this.techDetails.value[field])
    }
    for (const subfield in this.EUTServer.controls) {
      for( const field in this.EUTServer.controls[subfield].value){
        answers.push(this.EUTServer.controls[subfield].value[field])
      }
    }
    console.log(answers)
    this.register.registerManager(this.basicInfo.value,answers,this.directSubmission)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          this.dialog.closeAll()
          let requestId = res.RequestID;
          console.log(requestId)
          this.openAlert("Registeration was successful.Please check mail for further details!.",'newRequest')

          // this.uploader1.onBuildItemForm = (file: any, form: any) => {
          //   form.append('reqid', requestId)
          // }
          this.uploader1.uploadAll();
        },
        error => {
          this.dialog.closeAll()
          console.log(error)
          this.openAlert(error.error.error,'newRequest');
        }
      );
  }
  goToLogin(){
    this.router.navigateByUrl('/Portal/login')
  }
  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let data = JSON.parse(response);
    console.log(data) //success server response

  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let error = JSON.parse(response);
    console.log(error) //error server response

  }
  openAlert(result,type) {
    const dialogRef1 = this.dialog.open(AlertComponent, {
      disableClose: true,
      backdropClass: 'backdropBackground',
      data: {
        message: result,
        buttonText: {
          ok: 'OK',
        },
        type: type,
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