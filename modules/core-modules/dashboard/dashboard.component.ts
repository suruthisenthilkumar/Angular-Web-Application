import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Authentication-services/auth-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser:User;
  username: String;

  constructor(private authService:AuthService,private router:Router){
    this.currentUser=this.authService.currentUserValue;
    this.username=this.currentUser.name
  }
  
  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
