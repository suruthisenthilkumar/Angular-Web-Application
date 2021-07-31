import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog, MatSidenav, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/Authentication-services/auth-service';
import { AlertComponent } from '../../pop-ups/alert/alert.component';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['../main-frame/main-frame.component.css']
})
export class ToolbarComponent implements OnInit {
  
  @Input() opts: NavbarOpts;
  username: any;
  currentUser: any;
  counter: number = 0;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  
  isActiveAdmin: boolean=false;
  href: string;
  
  constructor(private breakpointObserver: BreakpointObserver,private authService:AuthService,
    private router:Router,private userIdle: UserIdleService,private snackBar:MatSnackBar,private dialog:MatDialog){
    this.currentUser=this.authService.currentUserValue;
    this.username=this.currentUser.name;
    this.href = this.router.url;

    if(this.currentUser.admin_status==true){ this.isActiveAdmin=true;}
  
    if (!(sessionStorage.getItem('InactiveSession')) && this.authService.loggedIn) { //Start watching for user inactivity.
      this.userIdle.startWatching();
      // Start watching when user idle is starting.
      this.userIdle.onTimerStart()
        .subscribe(count => {
          if (count != null && count != 0) { 
            if (this.authService.loggedIn) snackBar.open("Your session is about to end in " + (30 - count)) 
          }
          else this.snackBar.dismiss()
        });

      // Start watch when time is up.
      this.userIdle.onTimeout()
        .subscribe(() => {
          if (this.counter == 0) {
            this.openAlert();
          }
          this.counter++;
        });

    }
  }

  toggleSidenav() {
    this.opts.sidenav.toggle(true, "program");
  }

  ngOnInit() {
  }

  @HostListener('window:mousemove') restart() {
    this.userIdle.resetTimer();
    this.snackBar.dismiss()
  }
  @HostListener('window:keypress') restartTimer() {
    this.userIdle.resetTimer();
    this.snackBar.dismiss()
  }
  gotoConfig(){
    this.router.navigate(['/Portal/settings'])
  }
  gotoDashboard(){
    this.router.navigate(['/dashboard'])
  }
  openAlert() {
    if (this.authService.loggedIn && this.counter == 0) {
      sessionStorage.setItem('InactiveSession', 'true');
      const dialogRef = this.dialog.open(AlertComponent, {
        disableClose: true,
        data: {
          message: 'Your session has expired! Please login again',
          buttonText: {
            ok: 'OK',
          }
        },
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }


}

export interface NavbarOpts {
  sidenav?: MatSidenav;
}