import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/models/user';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GetStartedService } from 'src/app/services/get-started-page/get-started.service';
import { UpdateStatusComponent } from '../../pop-ups/update-status/update-status.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssignTesterComponent } from '../../pop-ups/assign-tester/assign-tester.component';
import { RfiansComponent, EditRfiansComponent } from '../../pop-ups/rfians/rfians.component';
import { AlertComponent } from '../../pop-ups/alert/alert.component';
import { Role } from 'src/app/models/role';
import { AuthService } from 'src/app/services/Authentication-services/auth-service';
import { UserRoleClass } from 'src/app/services/Authentication-services/userRoles';
import { MatTabChangeEvent } from '@angular/material';


@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css'],
})
export class GetStartedComponent implements OnInit {
  currentUser: User;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLive:boolean=true;
  columns = ['request_id'];
  DataSource= new MatTableDataSource();
  displayedColumns = [];
  

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) MatSort: MatSort;

  noData: boolean;
  errorData: boolean;
  nomatch: boolean;
  Role = Role;
  currentRole: UserRoleClass;

  
  constructor(private getstarted:GetStartedService,private router:Router,public dialog: MatDialog,private authService: AuthService,public datepipe: DatePipe,private snackBar: MatSnackBar ) { 
    this.currentUser=this.authService.currentUserValue;
    console.log(this.currentUser)
    this.currentRole = new UserRoleClass(authService);
  }

  ngOnInit() {
    this.dataSwitch('auto');
  }
 
  dataSwitch(type){
    if(type==='switch') this.isLive=!this.isLive;
    if((this.currentRole.isPH || this.currentRole.isPL)){
      if(this.isLive){ this.displayedColumns = this.columns.concat(['name', 'email', 'project_name', 'project_status', 'project_status_update','tester', 'assign_Tester', 'sign_off']); }
      else if(!this.isLive) this.displayedColumns = this.columns.concat(['name', 'email', 'project_name', 'Commercial_status', 'project_type']);//sign_off
    }
    else if ((this.currentRole.isManager || this.currentRole.isGuest)) {
      if(this.isLive){ this.displayedColumns = this.columns.concat(['requester_name', 'project_name', 'project_status', 'action']); }
      else if(!this.isLive) {this.displayedColumns = this.columns.concat(['requester_name', 'project_name', 'Commercial_status','project_type']);}
    }
    else if ((this.currentRole.isAdmin)){
      if(this.isLive){ this.displayedColumns = this.columns.concat(['name', 'email', 'project_name', 'project_status', 'project_status_update', 'assign_Tester','tester','action','sign_off']); }
      else if(!this.isLive) this.displayedColumns = this.columns.concat(['name', 'email', 'project_name', 'project_status', 'tester', 'sign_off']);
    }
    else if (this.currentRole.isSME) {
    this.displayedColumns = this.columns.concat(['name', 'email', 'project_name', 'project_status','project_status_update']);
    }
    this.renderTable()
  }

  renderTable() {
    this.noData = false;  
    this.getstarted.getAllProjects(this.currentUser.email,this.currentUser.id)  
    .pipe(takeUntil(this.destroy$))
      .subscribe(  
      res => {  
        console.log(res)
        res.forEach(element =>{
          if(element.tester==""){ element.tester='Unassigned';}
          if(element.tester==null){ element.tester='Unassigned';}
          if(element.project_status==null){ element.project_status='pending'}
        });
      if(this.isLive==true){
         res=res.filter(element => element.signed_off===null);
      }else{
        res=res.filter(element => element.signed_off!=null);
      }       
        this.DataSource.data = res;
        this.errorData = false;
        this.DataSource.sort = this.MatSort;
        this.DataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Rows Per page';
          if (this.DataSource.data.length === 0) this.noData = true;
      },  
      error => {  
        this.errorData=true;
        console.log('There was an error while retrieving Posts !!!');  
      });  
    }

    
    applyFilter(filterValue: string) {
      this.DataSource.filter = filterValue.trim().toLowerCase();
      if(this.DataSource.filteredData.length==0)
      {this.nomatch=true;}
      else{this.nomatch=false;}
     }
    
    updateStatus(i){
      let selectedClient = i;
      let status=""; let newStatus="";
      const dialogConfig = new MatDialogConfig();
      let dialogRef=this.dialog.open(UpdateStatusComponent,{
      disableClose:true,
      width:'600px',height:'330px',
      data: {status: status,newStatus:newStatus}
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
        if(result){
          this.snackBar.open('Project Status Updation is Progress!', '', {duration: 3000});
          let status=""
          if(result[0]==="Others"){status=result[1]}else{status=result[0]}
          this.getstarted.updateStatus(selectedClient,status,this.currentUser.email)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
                   res=>{
                         this.snackBar.open('Project Status Updated Successfully!', '', {
                          duration: 5000
                        });
                        console.log(res)
                        this.ngOnInit();
                        },
                    err=>{
                       this.snackBar.open('Error In Project Status Updation!', '', {
                        duration: 5000
                      });
                    }
                 )
                }
          });
      }   
    
     assignTester(i,tester){
        const selectedClient = i;
        const dialogConfig = new MatDialogConfig();
        let dialogRef=this.dialog.open(AssignTesterComponent,{
          disableClose:true,
        width:'600px',height:'300px',
        data: {selectedClient,tester}}).afterClosed()
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          if(result){
          this.snackBar.open(result, '', {
            duration: 5000
          });
          this.ngOnInit();}
        });
     }

     viewRFI(i,rfi){
       if(rfi==="true"){
        this.snackBar.open("No Answers are available to for viewing.Please update the details and try again!")
       }else{
      const selectedClient = i;
      this.getstarted.getRFI(selectedClient,this.currentUser.email,'view')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res=>{
          const RFIdata = res.result;
          const dialogConfig = new MatDialogConfig();
          let dialogRef=this.dialog.open(RfiansComponent,{
            disableClose:true,
            maxWidth: '100vw',
            maxHeight: '100vh',
            height: '100%',
            width: '100%',
          data: {selectedClient,RFIdata}})
        },
        error => {  
          console.log('There was an error while retrieving RFI Details !!!' + error);  
        });  
      }
      }
      editRFI(i){
        const selectedClient = i;
        this.getstarted.getRFI(selectedClient,this.currentUser.email,'edit')
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          res=>{
            console.log(res);
            const RFIdata = res.result;
            const dialogConfig = new MatDialogConfig();
            let dialogRef=this.dialog.open(EditRfiansComponent,{
              disableClose:true,
              maxWidth: '100vw',maxHeight: '100vh',height: '100%',width: '100%',
            data: {selectedClient,RFIdata}});
          },
          error => {  
            console.log('There was an error while retrieving RFI Details !!!' + error.Message);  
            
          })
        }

        signoff(req_id){
          console.log(req_id)
          let date = new Date();
          let signedOffDate=this.datepipe.transform(date, 'yyyy-MM-dd')
    
          const dialogRef = this.dialog.open(AlertComponent,{
            disableClose:true,
            data:{
              title:'Alert!!',
              message: 'Are you sure you want to Sign-Off this project? You will no longer be able to see this project.',
              buttonText: {
                ok: 'OK',
                cancel:'Dismiss'
              },
              type:'signOff',
              additionaldata:[req_id,this.currentUser.email,signedOffDate]
            },
          }).afterClosed().pipe(takeUntil(this.destroy$))
          .subscribe(result => {
            console.log(result)
            if(result){this.snackBar.open(result, '', {duration:3000});
            this.ngOnInit();}
          });
        }

      clickStopper(event) {
        event.stopPropagation();
        return;
   `` }


    ngOnDestroy() {
      this.destroy$.next(true);
      // Unsubscribe from the subject
      this.destroy$.unsubscribe();
    }

}

