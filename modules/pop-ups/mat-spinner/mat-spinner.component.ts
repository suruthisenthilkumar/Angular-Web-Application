import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-mat-spinner',
  templateUrl: './mat-spinner.component.html',
  styleUrls: ['./mat-spinner.component.css']
})
export class MatSpinnerComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<MatSpinnerComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private dialog:MatDialog) { }
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  showText  = 'In Progress';
  
  ngOnInit() {
  }
}
