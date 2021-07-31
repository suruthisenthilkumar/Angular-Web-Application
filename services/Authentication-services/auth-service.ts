import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { AppConstant } from '../shared/constant';
import { apiUrls } from '../shared/apiEndPoint';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { RefreshTokenService } from '../RefreshToken/refreshtoken.service';

let baseURL = AppConstant.BASE_API_URL;

@Injectable()
export class AuthService {
    user: User;
    public isTesterDeleted= new BehaviorSubject(false);
    private currentUserSubject = new BehaviorSubject<User>(null);
    public currentUser: Observable<User>;
    destroy$: Subject<boolean> = new Subject<boolean>();

    private authorizeRequester = apiUrls.authorizeRequester;
    private authorizeAdminLogin = apiUrls.authorizeAdminLogin;
    private validatePass = apiUrls.validatePass;
    private deleteSecretKey = apiUrls.deleteSecretKey;
    action: string;

    // public userIdle: UserIdleService,
    constructor(private http: HttpClient,  private router: Router, private rf: RefreshTokenService) {
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public setTesterDeleted(val:boolean){
        this.isTesterDeleted.next(val);
    } 
    setUser() {
        let usr=localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(usr));
        this.currentUser = this.currentUserSubject.asObservable();
        let msg=JSON.stringify(usr)
        if(msg.includes("expired"))
        sessionStorage.setItem('SessionStatus','Terminated')
        else
        sessionStorage.setItem('SessionStatus','InProgress')
    }
    isAuthorized() {
        return !!this.currentUserValue;
    }

    hasRole(role: Role) {
        return this.isAuthorized() && this.currentUserValue.role === role;
    }


    public get loggedIn(): boolean {
        return (localStorage.getItem('access_token') !== null);
    }
   
    authorize(loginDetails:FormGroup): Observable<any> {
        let API_URL = `${baseURL}${this.authorizeRequester}`;
        return this.http.post<any>(API_URL, { loginDetails:loginDetails })
            .pipe(map(user => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    sessionStorage.setItem('SessionStatus','Initiated')
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }


    authorizeAdmin(username: String, password: String): Observable<any> {
        let API_URL = `${baseURL}${this.authorizeAdminLogin}`;
        return this.http.post<any>(API_URL, { email: username, password: password })
            .pipe(map(user => {
                if (user) {
                    localStorage.setItem('access_token', user.token)
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }
  
    validatePassword(userPass: String, email: String, role: String,location:String): Observable<any> {
        let API_URL = `${baseURL}${this.validatePass}`;
        return this.http.post<any>(API_URL, { password: userPass, email: email, role: role ,location:location})
            .pipe(
                map(result => {
                    localStorage.setItem('access_token', result.token);
                    return true;
                })
            );

    }

    deteleSecret(email: String, role: String,action: String): Observable<any> {
        let API_URL = `${baseURL}${this.deleteSecretKey}`;
        // console.log("deleted token")
        return this.http.post<any>(API_URL, { email: email, role: role,action:action });
    }

    logout() {
        this.action='logout';
        this.deteleSecret(this.currentUserValue.email, this.currentUserValue.role,this.action)
            .pipe(takeUntil(this.destroy$)).subscribe(
           
            )
            // this.userIdle.stopTimer();
            this.deleteLocalStorage();
    }


    deleteLocalStorage() {
        this.router.navigate(['/login']);
        localStorage.clear();
        sessionStorage.clear();
        this.currentUserSubject.next(null);
    }



    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
