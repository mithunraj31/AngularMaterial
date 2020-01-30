import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-arrival-order-dialog',
  templateUrl: './arrival-order-dialog.component.html',
  styleUrls: ['./arrival-order-dialog.component.scss']
})
export class ArrivalOrderDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ArrivalOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,) { }

  ngOnInit() {
  }

}
