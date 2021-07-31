import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';

import { AuthService } from 'src/app/services/Authentication-services/auth-service';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {

  constructor(private router: Router,private location: PlatformLocation,private authService:AuthService) { 
    this.location.onPopState(()=> {
      history.forward();
    })
  }
  
  ngOnInit() {
    this.authService.logout()
  }

}
