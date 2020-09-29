import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-product-dialog',
  templateUrl: './error-product-dialog.component.html',
  styleUrls: ['./error-product-dialog.component.scss']
})
export class ErrorProductDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ErrorProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
  ) { }

  ngOnInit() {
  }

}
