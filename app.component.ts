import { Component, HostListener } from '@angular/core';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { UserIdleService } from 'angular-user-idle';
import { AlertComponent } from './modules/pop-ups/alert/alert.component';
import { AuthService } from './services/Authentication-services/auth-service';
import { IconRegistryClass } from './services/shared/iconRegistry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Icons: any;
  constructor(private authService:AuthService, private userIdle: UserIdleService,private matIconRegistry:MatIconRegistry,private domSanitizer: DomSanitizer,
    public dialog: MatDialog){
    authService.setUser();
    if(sessionStorage.getItem("SessionStatus")==="Terminated")
     this.openAlert();
    this.Icons=new IconRegistryClass(matIconRegistry,domSanitizer); 
  }

  ngOnInit(){
    if(sessionStorage.getItem('InactiveSession')&&(this.authService.loggedIn)){
      this.dialog.closeAll();
      this.openAlert()
    } 
  }

  @HostListener('window:mousemove') restart() {
    this.userIdle.resetTimer();
  }
  @HostListener('window:keypress') restartTimer() {
    this.userIdle.resetTimer();
  }
  openAlert(){
    const dialogRef = this.dialog.open(AlertComponent,{
      disableClose:true,
      data:{
        message: 'Your session has expired! Please login again',
        buttonText: {
          ok: 'OK',
        }
      },
    });
  }
}
