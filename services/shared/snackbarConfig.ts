import { MatSnackBar,
    MatSnackBarConfig,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material';

export class SnackBarConfig {
  actionButtonLabel: string = 'Clear Session';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 5000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  config = new MatSnackBarConfig();

    constructor(public snackBar: MatSnackBar){ 
     this.config.verticalPosition = this.verticalPosition;
     this.config.horizontalPosition = this.horizontalPosition;
     }
     
    successMsg(msg){
       
        this.config.panelClass = ['successSnackBar'];
        this.snackBar.open(msg, '', this.config);
      }
    errorMsg(msg){
        this.config.panelClass = ['errorSnackBar'];
        this.snackBar.open(msg, '', this.config);
    }
}