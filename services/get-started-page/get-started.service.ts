import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, Form } from '@angular/forms';
import { apiUrls } from "../shared/apiEndPoint";
import {AppConstant} from "../shared/constant";
import { tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';

let baseURL=AppConstant.BASE_API_URL;

@Injectable({
  providedIn: 'root'
})
export class GetStartedService { 

  constructor(public http:HttpClient) { }
  private getProjects=apiUrls.getAllDetails;
  private getSMEInfo=apiUrls.getSMEInfo;
  private updateProjStatus=apiUrls.updateProjStatus;
  private allSME=apiUrls.allSME;
  private assignSME=apiUrls.assignSME;
  private getRFIANS = apiUrls.getRFIAns;
  private updateRFIAnswer=apiUrls.updateRFIAnswer;
  private signOffProj = apiUrls.signoffProj;
  private downloadRFIImage = apiUrls.downloadRFIImage;
  private createNewTester =apiUrls.createNewTester;
  private deleteTester =apiUrls.deleteTester;
  
  getAllProjects(email:String,id:String):Observable<any> {
    let API_URL = `${baseURL}${this.getProjects}`;
    return this.http.post<any>(API_URL,{email:email,id:id});
  }
 
  getAllSMEDetails(email:String):Observable<any> {
    let API_URL = `${baseURL}${this.getSMEInfo}`;
    return this.http.post<any>(API_URL,{email:email});
  }

  updateStatus(request_id:String,project_status:String,email:String):Observable<any>{
    let API_URL = `${baseURL}${this.updateProjStatus}`;
    return this.http.post<any>(API_URL,{email:email,request_id:request_id,project_status:project_status});
  }

  updateRFIAns(request_id:any,email:string,answers:any):Observable<any>{
    let API_URL = `${baseURL}${this.updateRFIAnswer}`;
    return this.http.post<any>(API_URL,{request_id:request_id,email:email,answers:answers});
  }

  getSMEs(email:string):Observable<any>{
    let API_URL = `${baseURL}${this.allSME}`;
    return this.http.post<any>(API_URL,{email:email})
  }
  assignSMEs(req_id:any,smeList:any,newList:any,removedList:any,email:string):Observable<any>{
    let API_URL = `${baseURL}${this.assignSME}`;
    return this.http.post<any>(API_URL,{request_id:req_id,sme:smeList,newList:newList,removedList:removedList,email:email})
  }
  getRFI(data: any,email:String,type:String):Observable<any> {
    let API_URL = `${baseURL}${this.getRFIANS}`;
    return this.http.post<any>(API_URL,{request_id:data,email:email,type:type});
  }
  signingoff(request_id:string,email:String,signoff:String):Observable<any>{
    let API_URL = `${baseURL}${this.signOffProj}`;
    return this.http.post<any>(API_URL,{email:email,request_id:request_id,signoff:signoff})
  }
  downloadFile(email:String,request_id:string,fileName:string):Observable<any>{
    console.log("yess")
    let API_URL = `${baseURL}${this.downloadRFIImage}`;
    return this.http.post(API_URL,{email:email,request_id:request_id,fileName:fileName},{ observe:'response',responseType: 'blob'})
    .pipe(
      tap(
        data=>saveAs(data.body,`${fileName}`),
        error => console.log(error)
      )
    );}

    createSME(email:string,tester:FormGroup):Observable<any> {
      let API_URL = `${baseURL}${this.createNewTester}`;
      return this.http.post<any>(API_URL,{email:email,createTester:tester});
    }
    deleteSME(email:string,testerEmail:String):Observable<any> {
      let API_URL = `${baseURL}${this.deleteTester}`;
      return this.http.post<any>(API_URL,{email:email,testerEmail:testerEmail});
    }
  }

