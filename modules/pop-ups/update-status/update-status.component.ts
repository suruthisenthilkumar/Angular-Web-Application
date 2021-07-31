import { Component, OnInit, Inject, Input } from '@angular/core';
import { GetStartedService } from 'src/app/services/get-started-page/get-started.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
}) 
export class UpdateStatusComponent implements OnInit {

  selectedValue:String;
  options = [
    {value: 'Initial Enquiry',name : "Initial Enquiry"},
    {value: 'RFI Submitted',name : "RFI Submitted"},
    {value: 'Proposal Creation - In Progress',name : "Proposal Creation - In Progress"},
    {value: 'Proposal Sent',name : "Proposal Sent"},
    {value: 'JO Signed',name : "JO Signed"},
    {value: 'Round1 In Progress',name : "Round1 In Progress"},
    {value: 'Round1 Completed',name : "Round1 Completed"},
    {value: 'Round2 In Progress',name : "Round2 In Progress"},
    {value: 'Round2 Completed',name : "Round2 Completed"},
    {value: 'Others',name : "Others - Write your own status"},
  ]
  constructor(public dialogRef:MatDialogRef<UpdateStatusComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

 
  ngOnInit() {
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
