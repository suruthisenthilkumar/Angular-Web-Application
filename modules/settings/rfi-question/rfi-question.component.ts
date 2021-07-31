import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/adminActions/admin.service';
import { AuthService } from 'src/app/services/Authentication-services/auth-service';
import { CommonService } from 'src/app/services/shared/common.service';

@Component({
  selector: 'rfi-question',
  templateUrl: './rfi-question.component.html',
  styleUrls: ['./rfi-question.component.css']
})
export class RfiQuestionComponent implements OnInit {
  currentUser: User;
  source: any;
  dataColumns = ['S.No', 'Question', 'Type', 'Actions'];
  fullResponse: any = [];
  types: any = [];

  general: boolean = false; tech: boolean = false; eut: boolean = false;
  name: any;

  constructor(private admin: AdminService, private Auth: AuthService, private dialog: MatDialog) {
    this.currentUser = this.Auth.currentUserValue;
    this.setType("General");
  }

  ngOnInit() {
    this.admin.getRFIQns(this.currentUser.email).subscribe(
      res => {
        console.log(res);
        this.fullResponse = res;
        this.fullResponse.forEach(element => {
          this.types.push(element.name)
        });
        this.setType("General");
      }, err => {
        console.log(err);
      }
    )
  }
  setType(type) {
    this.fullResponse.forEach(element => {
      if (element.name === type) {
        console.log(element.name)
        this.source = new MatTableDataSource(element.questions);
        this.name = element.name;
      }
    });
  }

  editRFI(rfi) {
    this.dialog.open(EditRfiQnsComponent, {
      data: { type: 'edit', info: rfi }
    })
  }
  addQNS() {
    this.dialog.open(EditRfiQnsComponent, {
      data: { type: 'add', info: this.types }
    })
  }
  deleteRFI(data) {
    console.log(data);
    this.admin.deleteRFI(this.currentUser.email, data.id).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    }, err => {
      console.log(err);
    })
  }

  applyFilter(filterValue: string) {
    this.source.filter = filterValue.trim().toLowerCase();
    if (this.source.testerDetailsPaginator) {
      this.source.testerDetailsPaginator.firstPage();
  }}

}


@Component({
  // selector: 'rfi-question',
  templateUrl: './editRFIqns.component.html',
  styleUrls: ['./rfi-question.component.css']
})
export class EditRfiQnsComponent implements OnInit {

  qnDetails: FormGroup;
  csvPattern: any;
  matcher: any;
  edit: boolean = false;
  create: boolean = false;
  info: any;
  question_type: String;

  qnTypeText = {
    "tooltip": "",
    "validation": "none", "validation-error": "none",
    "answerType": "text", "inputType": "text", "maxlength": ""
  };
  qnTypeNum = {
    "tooltip": "",
    "validation": "range", "min": "", "max": "", "validation-error": "Invalid Input",
    "answerType": "text", "inputType": "number"
  }
  qnTypeRadioGrp = {
    "tooltip": "",
    "answerType": "radioGroup", "sub-options": { "value": ["yes", "no"] },
    "entryValue": "yes", "entryValuePlaceholder": "none"
  }
  qnTypeRadio = {
    "answerType": "radio", "sub-options": { "value": ["yes", "no"] }
  }

  currentUser: User;
  constructor(private fb: FormBuilder, private snackbar: MatSnackBar, private common: CommonService, private admin: AdminService, private as: AuthService,
    public dialogRef: MatDialogRef<EditRfiQnsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentUser = this.as.currentUserValue;
    this.csvPattern = this.common.csv;
    this.matcher = common.matcher;
  }

  ngOnInit() {
    console.log(this.data)

    this.qnDetails = this.fb.group({
      question: ['', Validators.required],
      inputType: ['', Validators.required],
      tooltip: [''],
      entryValue: [''],
      condnInputPlaceholder: [''],
      radioValues: ['', Validators.pattern],
      answerType: [''],
      maxlength: [''],
      minValue: [''],
      maxValue: ['']
    })
    if (this.data.type === "edit") {
      this.setFormValues();
      this.info = this.data.info;
    }
  }
  setFormValues() {
    let details = this.data.info.details;
    let input = details.answerType;
    this.qnDetails.get('question').setValue(this.data.info.questions);
    this.qnDetails.get('inputType').setValue(input);
    if (input === "text") {
      let answer = details.inputType;
      this.qnDetails.get('tooltip').setValue(details.tooltip);
      this.qnDetails.get('answerType').setValue(answer);
      if (answer === "text") {
        this.qnDetails.get('maxlength').setValue(details.maxlength)
      } else {
        this.qnDetails.get('minValue').setValue(details.min);
        this.qnDetails.get('maxValue').setValue(details.max);
      }
    } else if (input === "radio") {
      this.qnDetails.get('radioValues').setValue(details['sub-options'].value)
    } else {
      this.qnDetails.get('entryValue').setValue(details.entryValue);
      this.qnDetails.get('condnInputPlaceholder').setValue(details.entryValuePlaceholder);
    }
  }
  submit() {
    console.log(this.qnDetails.value.inputType);
    console.log(this.question_type);

    let input = this.qnDetails.value.inputType;
    let details;
    if (input === "text") {
      let answer = this.qnDetails.value.answerType;
      if (answer === "text") {
        this.qnTypeText.tooltip = this.qnDetails.value.tooltip;
        this.qnTypeText.maxlength = this.qnDetails.value.maxlength;
        details = this.qnTypeText;
      } else {
        this.qnTypeNum.tooltip = this.qnDetails.value.tooltip;
        this.qnTypeNum.min = this.qnDetails.value.minValue;
        this.qnTypeNum.max = this.qnDetails.value.maxValue;
        details = this.qnTypeNum
      }
    } else if (input === "radio") {
      console.log(this.qnDetails.value.radioValues)
      if (this.qnDetails.value.radioValues.length > 0)
        this.qnTypeRadio["sub-options"].value = this.qnDetails.value.radioValues
      else
        this.qnTypeRadio["sub-options"].value = this.qnDetails.value.radioValues.split(",");
      details = this.qnTypeRadio;
    } else {
      this.qnTypeRadioGrp.entryValue = this.qnDetails.value.entryValue;
      this.qnTypeRadioGrp.entryValuePlaceholder = this.qnDetails.value.condnInputPlaceholder;
      details = this.qnTypeRadioGrp;
    }
    if (this.data.type === "edit") {
      this.admin.updateRFIQns(this.currentUser.email, this.qnDetails.value.question, this.info.id, details).subscribe(res => {
        console.log(res);
        this.ngOnInit();
      }, err => {
        console.log(err)
      })
    } else {
      this.admin.addRFIQns(this.currentUser.email, this.qnDetails.value.question, this.question_type, details).subscribe(res => {
        console.log(res);
        this.ngOnInit();
      }, err => {
        console.log(err);
      })
    }
  }

}

