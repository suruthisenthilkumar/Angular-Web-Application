import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { GetStartedService } from 'src/app/services/get-started-page/get-started.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/Authentication-services/auth-service';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { CreateTesterComponent } from './create-tester/create-tester.component';
import { AlertComponent } from '../../pop-ups/alert/alert.component';

@Component({
  selector: 'tester-details',
  templateUrl: './tester-details.component.html',
  styleUrls: ['./tester-details.component.css']
})
export class TesterDetailsComponent implements OnInit {

  
  TesterInfoSource:any;
  displayedTesterDetails=['s.no','name','email','designation','delete'];
  currentUser:User
  destroy$: Subject<boolean> = new Subject<boolean>();
  noData: boolean =false; 
  PH: boolean;

  constructor(private getstartedservice: GetStartedService,public dialog: MatDialog,private snackBar:MatSnackBar,
    private bottomSheet:MatBottomSheet, private authService: AuthService ) { 
    this.currentUser=this.authService.currentUserValue;
  }
  @ViewChild(MatPaginator,{static:false}) testerDetailsPaginator: MatPaginator;

  ngOnInit() {
    this.renderTesterDetailsTable();
  }

  renderTesterDetailsTable(){
    this.getstartedservice.getAllSMEDetails(this.currentUser.email)
    .pipe(takeUntil(this.destroy$))  
    .subscribe(  
    res => {  
      console.log(res)
      this.TesterInfoSource = new MatTableDataSource(res);  
      this.TesterInfoSource.data = res;  
      this.TesterInfoSource.paginator = this.testerDetailsPaginator; 
      if(this.TesterInfoSource.data.length===0)
      this.noData=true;
    },  
    error => {  
      console.log('There was an error while retrieving Posts !!!' + error);  
    });  
  }

  applyTesterFilter(filterValue: string) {
    this.TesterInfoSource.filter = filterValue.trim().toLowerCase();
    if (this.TesterInfoSource.testerDetailsPaginator) {
      this.TesterInfoSource.testerDetailsPaginator.firstPage();
  }}


  openCreateTester() {
    let sheetRef = this.bottomSheet.open(CreateTesterComponent, {
      panelClass: ['createSME-bottomsheet'],disableClose:false
    });
    sheetRef.afterDismissed().subscribe(data => {
      console.log('after close data :', data);
      if(data.message==="SUCCESS"){
        this.snackBar.open("SME Created Successfully!");
        this.ngOnInit();
      }
   });
  }

  deleteTester(i){
    this.dialog.open(AlertComponent,{
      disableClose:true,
      data:{
        title:'Alert!!',
        message: 'Are you sure you want to delete this SME?',
        buttonText: {
          ok: 'OK',
          cancel:'Dismiss'
        },
        type:'deleteTester',
      }
    }).afterClosed().subscribe(
      result=>{if(result){
        console.log(i)
        this.getstartedservice.deleteSME(this.currentUser.email,i).subscribe(res=>{
          console.log(res);
          this.snackBar.open("SME Removed Successfully!");
          this.ngOnInit();
        },err=>{
          console.log(err)
          this.snackBar.open("Error while Removing SME!!");
        })
      }}
    )
  }
}
