import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientDetailsService } from 'src/app/services/get-started-page/client-details.service';
import { MatBottomSheetRef, MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material';
import { Role } from 'src/app/models/role';
import { UserRoleClass } from 'src/app/services/Authentication-services/userRoles';
import { AuthService } from 'src/app/services/Authentication-services/auth-service';
@Component({
  selector: 'client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  columns = ['request_id'];
  DataSource= new MatTableDataSource();
  displayedColumns = [];
  currentUser:User
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) MatSort: MatSort;

  noData: boolean;
  errorData: boolean;
  nomatch: boolean;
  Role:Role;
  currentRole: UserRoleClass;

  constructor(private bottomSheet: MatBottomSheet,private clientDetails: ClientDetailsService,public dialog: MatDialog,private authService: AuthService,private snackBar: MatSnackBar ) { 
    this.currentUser=this.authService.currentUserValue;
    this.currentRole = new UserRoleClass(authService);
  }

  ngOnInit() {
   if(this.currentRole.isPH||this.currentRole.isPL||this.currentRole.isAdmin){
    this.displayedColumns = this.columns.concat(['name','email', 'project_name','Commercial_status','project_type','project_billing']); 
   }else if(this.currentRole.isManager||this.currentRole.isGuest){
    this.displayedColumns = this.columns.concat(['requester_name','project_name','Commercial_status','project_type']); 
   }else if(this.currentRole.isSME){
    this.displayedColumns = this.columns.concat(['name','email', 'project_name','project_type']); 
   }
   this.renderTable();
  }


  renderTable() {  
    this.clientDetails.getClientData(this.currentUser.email,this.currentUser.id).pipe(takeUntil(this.destroy$))  
      .subscribe(  
      res => {  
        this.DataSource = new MatTableDataSource(res);  
        this.DataSource.data = res;  
        console.log(res)
        this.DataSource.paginator = this.paginator; 
        if(this.DataSource.data.length===0)
        this.noData=true;
      },  
      error => {  
        console.log('There was an error while retrieving Posts !!!');  
      });  
    }

   
    applyFilter(filterValue: string) {
      this.DataSource.filter = filterValue.trim().toLowerCase();
      if (this.DataSource.paginator) {  
        this.DataSource.paginator.firstPage();
    }}


    viewClientInfo(selectedClient): void {
      this.clientDetails.getClientInformation(selectedClient,this.currentUser.email).pipe(takeUntil(this.destroy$))
      .subscribe(
        res=>{
          console.log(res);
          const ClientInfo = res;
          this.bottomSheet.open(EditClientDetails,{
          panelClass: 'custom-bottomsheet',
          disableClose:false,
          direction:"ltr",
          data: { ClientInfo: ClientInfo },
        }).afterDismissed().subscribe(result=>{
          if(result){
            this.snackBar.open(result, '', {duration: 5000});
            this.ngOnInit();}
        })
    })
  }

 
}

interface Currency {
  value: string;
  viewValue: String;
 }
@Component({
  selector: 'bottom-sheet',
  templateUrl: './edit-client-details.html',
  styleUrls: ['./client-details.component.css'],
})

export class EditClientDetails implements OnInit{

  ph=false;
  sme=false;
  manager=false;
  currentUser:User
  done:Boolean=false;
  message:any;
  editable=false;
  role:string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  
  rateInNewCurrency: number;
  decimalErr: boolean;

  constructor(private bottomSheetRef: MatBottomSheetRef<EditClientDetails>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private authService:AuthService,
  private fb: FormBuilder, private clientDetails:ClientDetailsService) {
    this.currentUser=this.authService.currentUserValue;
    this.role=this.currentUser.role;
    if(this.currentUser.role=="performancehead"){
     this.ph=true;
    }else if(this.currentUser.role=="sme"){
      this.sme=true;
      this.editable=true;
    }else
    this.manager=true;
   }
   
  firstFormGroup: FormGroup;
  public currencies: Currency[] = [
    {value: 'USD', viewValue: 'USD (US$)'},
    {value: 'EUR', viewValue: 'EUR (€)'},
    {value: 'JPY', viewValue: 'JPY (¥)'},
    {value: 'GBP', viewValue: 'GBP (£)'},
    {value: 'CAD', viewValue: 'CAD (C$)'},
    {value: 'NZD', viewValue: 'NZD (NZ$)'},
    {value: 'SGD', viewValue: 'SGD (S$)'},
    {value: 'HKD', viewValue: 'HKD (HK$)'},
    {value: 'MYR', viewValue: 'MYR (RM)'}
  ]
  

  ngOnInit() {
    
    // console.log(this.data);
    this.firstFormGroup = this.fb.group({
      Clientname: [this.data.ClientInfo[0].client_name, Validators.required],
      Email:[this.data.ClientInfo[0].email,[Validators.required,Validators.email]],
      Prjname: [this.data.ClientInfo[0].project_name, Validators.required],
      Rqstername: [this.data.ClientInfo[0].requester_name, Validators.required],
      Clusterhead: [this.data.ClientInfo[0].cluster_head_dlt, Validators.required],
      Geo: [this.data.ClientInfo[0].geography, Validators.required],
      Dlt2: [this.data.ClientInfo[0].dlt2, Validators.required],
      JOstatus: [this.data.ClientInfo[0].jo_status, Validators.required],
      commstatus:[this.data.ClientInfo[0].commercial_status, Validators.required],
      projectType:[this.data.ClientInfo[0].project_type, Validators.required],
      project_billing:[this.data.ClientInfo[0].project_billing],
      JOvalue: [this.data.ClientInfo[0].jo_value, Validators.required],
      symbol: [this.data.ClientInfo[0].currency_symbol, Validators.required],
      newJovalue: [this.data.ClientInfo[0].jo_value_usd, Validators.required]
    });
    
    
    this.firstFormGroup.get('Clientname').disable();
    this.firstFormGroup.get('Email').disable();
    this.firstFormGroup.get('newJovalue').disable();
    this.firstFormGroup.get('projectType').disable();

    if((this.data.ClientInfo[0].jo_status=="Signed")&&(this.currentUser.role=="manager")){
      this.firstFormGroup.get('symbol').disable();
      this.firstFormGroup.get('JOstatus').disable();
      this.firstFormGroup.get('JOvalue').disable();
      this.editable=true;
    }
    if((this.data.ClientInfo[0].project_type=="New Project")&&(this.currentUser.role=="performancehead")){
      this.firstFormGroup.get('project_billing').setValue("Not Applicable");
      this.firstFormGroup.get('project_billing').disable();
      this.firstFormGroup.get('project_billing').setValidators(Validators.required)
    }
  }
  validateNumber(e) {
    let input = e;
    const reg =   /^\d*\.?\d{0,2}$/;
   if(!reg.test(input)){
     this.decimalErr=true;
   }else
   this.decimalErr=false;
  }

  updateClientInfo(){
    this.clientDetails.updateClientInformation(this.data.ClientInfo[0].request_id,this.currentUser.email,this.firstFormGroup.value,this.role)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      res=>{
        this.message="Client Information Updated Successfully!!!";
        this.bottomSheetRef.dismiss(this.message);
  },err=>{
        this.bottomSheetRef.dismiss(err.error.error);
  }
  );
  }
  close() {
      event.preventDefault();
      this.bottomSheetRef.dismiss();
  }
}