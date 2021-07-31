import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../shared/constant';
import { apiUrls } from '../shared/apiEndPoint';

let baseURL = AppConstant.BASE_API_URL;
@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  private refeshToken = apiUrls.refreshtoken;

  constructor(private http: HttpClient) { }

  load() {
    let API_URL = `${baseURL}${this.refeshToken}`;
    let promise = new Promise((resolve, reject) => {
      this.http.get(API_URL)
        .toPromise()
        .then(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  }
  // =======================================================================================
}      