import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { apiUrls } from "../shared/apiEndPoint";
import {AppConstant} from "../shared/constant";

let baseURL=AppConstant.BASE_API_URL;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http:HttpClient) { }
  private configCheck=apiUrls.configCheck;
  private configDetails=apiUrls.configDetails;
  private configUpdate=apiUrls.configUpdate;
  private getAllUser=apiUrls.getAllUser;
  private editUsers=apiUrls.editUsers;
  private deleteUsers=apiUrls.deleteUsers;
  private createUser=apiUrls.createUser;
  private getRFIqn=apiUrls.getRFIqn;
  private updateRFIqn=apiUrls.updateRFIqn;
  private addRFIqn=apiUrls.addRFIqn;
  private deleteRFIqn=apiUrls.deleteQNS;

  getRFIQns(email):Observable<any> {
    let API_URL = `${baseURL}${this.getRFIqn}`;
    return this.http.post<any>(API_URL, {email:email});
  }
  updateRFIQns(email:string,question:String,qid:String,details:any):Observable<any> {
    let API_URL = `${baseURL}${this.updateRFIqn}`;
    return this.http.post<any>(API_URL, {email:email,question:question,qid:qid,details:details});
  }
  addRFIQns(email:string,question:String,question_type:String,details:any):Observable<any> {
    let API_URL = `${baseURL}${this.addRFIqn}`;
    return this.http.post<any>(API_URL, {email:email,question:question,question_type:question_type,details:details});
  }
  deleteRFI(email:String,qid:String):Observable<any> {
    let API_URL = `${baseURL}${this.deleteRFIqn}`;
    return this.http.post<any>(API_URL, {email:email,qid:qid});
  }
  getConfigCheck(email:String,adminPassword:any):Observable<any> {
    let API_URL = `${baseURL}${this.configCheck}`;
    return this.http.post<any>(API_URL, {email:email,adminPassword:adminPassword});
  }
  
  getConfigDetails(email:any):Observable<any> {
    let API_URL = `${baseURL}${this.configDetails}`;
    return this.http.post<any>(API_URL, {email:email});
  }

  ConfigUpdate(email:String,configDetails:FormGroup):Observable<any>{
    let API_URL = `${baseURL}${this.configUpdate}`;
    return this.http.post<any>(API_URL, {email:email,configDetails:configDetails});
  }
  
  getAllPHandPL(email:String):Observable<any>{
    let API_URL = `${baseURL}${this.getAllUser}`;
    return this.http.post<any>(API_URL, {email:email});
  }

  editUserInfo(email:String,user:FormGroup):Observable<any>{
    let API_URL = `${baseURL}${this.editUsers}`;
    return this.http.post<any>(API_URL, {email:email,user:user});
  }
  
  createNewLead(email:String,user:FormGroup):Observable<any>{
    let API_URL = `${baseURL}${this.createUser}`;
    return this.http.post<any>(API_URL, {email:email,user:user});
  }
    
  deleteheadorLead(email:String,id:String):Observable<any>{
    let API_URL = `${baseURL}${this.deleteUsers}`;
    return this.http.post<any>(API_URL, {email:email,userID:id});
  }

}
