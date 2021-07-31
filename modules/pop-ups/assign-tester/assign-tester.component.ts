import { Component, OnInit, Inject } from '@angular/core';

import { User } from '../../../models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetStartedService } from 'src/app/services/get-started-page/get-started.service';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/Authentication-services/auth-service';
import { SnackBarConfig } from 'src/app/services/shared/snackbarConfig';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-assign-tester',
  templateUrl: './assign-tester.component.html',
  styleUrls: ['./assign-tester.component.css']
})
export class AssignTesterComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  currentUser:User;
  snackBarConfig:any;
  public checked = true;
  public SMEList: any[]=[] ;
  public selectedSME: any[]=[];
  itr: number;
  count:number=0;
  public SMEList1: any[]=[];

  done:boolean=false;
  sme = new FormControl();
  finalvalue:String=null;
  newSMEs:String=null;
  removedSMEs:String=null;
  i:number=0;
  constructor(private authService:AuthService,public dialogRef:MatDialogRef<AssignTesterComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private snackbar:MatSnackBar,private getStarted:GetStartedService) { 
    this.currentUser=this.authService.currentUserValue;
    this.snackBarConfig=new SnackBarConfig(snackbar);

  }

  ngOnInit() {
    this.getStarted.getSMEs(this.currentUser.email).pipe(takeUntil(this.destroy$))
    .subscribe(
      res=>{
        this.selectedSME=this.data.tester.split(",")
        for(let i=0;i<this.selectedSME.length;i++){
          if(this.selectedSME[i]==='Unassigned')this.selectedSME.splice(i,1)
        }
        console.log(this.selectedSME)
        if(this.selectedSME.length!=0) {
        for(this.itr=0;this.itr<res.length;this.itr++){
          this.count=0;
          for(this.i=0;this.i<this.selectedSME.length;this.i++)
          {
            if(res[this.itr].username==this.selectedSME[this.i]){
              this.SMEList.push({
                name:res[this.itr].username,
                checked:true
              })
           
            }else{
              this.count++;
              if(this.count==this.selectedSME.length){
                this.SMEList.push({
                  name:res[this.itr].username,
                  checked:false})
              }
            }
          }
        }
        for(this.i=0;this.i<this.SMEList.length;this.i++){
          if(this.SMEList[this.i].checked==true){
            this.SMEList1.push(
              this.SMEList[this.i],
            )
          } }
        
          this.sme.setValue(this.SMEList1)
      }
  else{
            for(let itr=0;itr<res.length;itr++){
              this.SMEList.push({
                name:res[itr].username,
                checked:false
              })
            }
      }
    },
    err=>{
          console.log(err);
          this.snackBarConfig.errorMsg('Error While Fetching SWE Details!')

    })
}
  

submit(){
  this.finalvalue=null;this.newSMEs=null;this.removedSMEs=null;
  for(this.i=0;this.i<this.sme.value.length;this.i++){
    if(this.finalvalue===null)
      this.finalvalue=this.sme.value[this.i].name
    else
      this.finalvalue=this.finalvalue+','+this.sme.value[this.i].name 
  }

  if(this.selectedSME.length>0){
    for(let itr=0;itr<this.sme.value.length;itr++){
      this.count=0;
      for(let itr2=0;itr2<this.selectedSME.length;itr2++){
        if(this.sme.value[itr].name===this.selectedSME[itr2])
          {}
        else
        {
        this.count++;
            if(this.count==this.selectedSME.length){
               if(this.newSMEs===null)
                  this.newSMEs=this.sme.value[itr].name
               else
                  this.newSMEs=this.newSMEs+','+this.sme.value[itr].name
              }
        }
      }
    }
  }

  if(this.selectedSME.length>0){
    for(let itr=0;itr<this.selectedSME.length;itr++){
      this.count=0;
      for(let itr2=0;itr2<this.sme.value.length;itr2++){
        if(this.selectedSME[itr]===this.sme.value[itr2].name)
          {}
        else
        {
        this.count++;
            if(this.count==this.sme.value.length){
               if(this.removedSMEs===null)
                  this.removedSMEs=this.selectedSME[itr]
               else
                  this.removedSMEs=this.removedSMEs+','+this.selectedSME[itr]
              }
        }
      }
    }
  }
  console.log(this.finalvalue)
  console.log("got ittt")
  console.log(this.newSMEs)
  console.log(this.removedSMEs)
  this.getStarted.assignSMEs(this.data.selectedClient,this.finalvalue,this.newSMEs,this.removedSMEs,this.currentUser.email).pipe(takeUntil(this.destroy$))
    .subscribe(
      res=>{ 
        console.log(res)
        let message="Tester Assigned Successfully!!"
        this.dialogRef.close(message)
      },err=>{
        let error="Error in assigning Tester"
        this.dialogRef.close(error)
        // this.snackBarConfig.errorMsg('Error While Assigning Tester!')
      }
    )
  
}

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
}
