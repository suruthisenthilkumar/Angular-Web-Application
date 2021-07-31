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
export class NewregistrationService {

  constructor(public http:HttpClient) { }
  private register=apiUrls.initialRegistration;
  private userCheck=apiUrls.initialUserCheck;
  private getQns=apiUrls.getQns;
  private raiseNewReq=apiUrls.raiseNewReq;

  registerManager(prsnl:FormGroup,answers:any,directSubmission:Boolean):Observable<any> {
    let API_URL = `${baseURL}${this.register}`;
    return this.http.post<any>(API_URL, {prsnl:prsnl,answers:answers,directSubmission:directSubmission
    });
  }

  checkManager(email:String,location:String):Observable<any> {
    let API_URL = `${baseURL}${this.userCheck}`;
    return this.http.post<any>(API_URL, {email:email,location:location}
    );
  }

  newRequest(email:String,details:FormGroup):Observable<any> {
    let API_URL = `${baseURL}${this.raiseNewReq}`;
    return this.http.post<any>(API_URL, {email:email,details:details}
    );
  }
  
  getRFIQns():Observable<any> {
    let API_URL = `${baseURL}${this.getQns}`;
    return this.http.get<any>(API_URL);
  }
}
// prsnl:FormGroup,general:FormGroup,technical:FormGroup,load:FormGroup,appln:FormGroup,
    // miscellaneous:FormGroup,web:FormGroup,db:FormGroup
    // prsnl:prsnl,general:general,technical:technical
    //   ,load:load,appln:appln,miscellaneous:miscellaneous,db:db