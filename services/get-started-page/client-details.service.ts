
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {  Form } from '@angular/forms';
import { apiUrls } from "../shared/apiEndPoint";
import {AppConstant} from "../shared/constant";

let baseURL=AppConstant.BASE_API_URL;
@Injectable({
  providedIn: 'root'
})
export class ClientDetailsService {

  constructor(private http: HttpClient) { }
  private getclientData=apiUrls.getAllDetails;
  private getClientInfo =apiUrls.getClientInfo
  private updateClientInfo = apiUrls.updateClientInfo;

  getClientData(email:String,id:String):Observable<any> {
    let API_URL = `${baseURL}${this.getclientData}`;
    return this.http.post<any>(API_URL,{email:email,id:id});
    
  }
  getClientInformation(req_id:any,email:String):Observable<any> {
    let API_URL = `${baseURL}${this.getClientInfo}`;
    return this.http.post<any>(API_URL,{request_id:req_id,email:email});
  }

  updateClientInformation(req_id:any,email:String,info:Form,role:String):Observable<any> {
    let API_URL = `${baseURL}${this.updateClientInfo}`;
    return this.http.post<any>(API_URL,{request_id:req_id,email:email,clientinfo:info,role:role})
  }
  
   
}
