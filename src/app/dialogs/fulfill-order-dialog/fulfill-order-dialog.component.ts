import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-fulfill-order-dialog',
  templateUrl: './fulfill-order-dialog.component.html',
  styleUrls: ['./fulfill-order-dialog.component.scss']
})
export class FulfillOrderDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FulfillOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String, ) { }

  ngOnInit() {
  }

}
