import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, from } from 'rxjs';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import{User} from '../../../models/user'
import { AuthService } from 'src/app/services/Authentication-services/auth-service';
import { Role } from 'src/app/models/role';
import { MatSidenav } from '@angular/material';
import { NavbarOpts } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.css']
})
export class MainFrameComponent implements OnInit {

  username:String;
  Role=Role;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  currentUser:User;
  isActiveAdmin=false;

  @ViewChild('sidenav',{static:true}) sidenav: MatSidenav;
  opts: NavbarOpts;

  constructor(private breakpointObserver: BreakpointObserver,private router: Router,private authService:AuthService){
    this.currentUser=this.authService.currentUserValue;
    this.username=this.currentUser.name
    
    if(this.currentUser.admin_status==true){
      this.isActiveAdmin=true;
    }    
   }
   
   ngOnInit() {
    this.opts = {
      sidenav: this.sidenav
    }
  }

  
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
