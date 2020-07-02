import { EditReason } from './../../models/EditReason';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ArrivalOrderDialogComponent } from '../arrival-order-dialog/arrival-order-dialog.component';

@Component({
  selector: 'app-data-changed-dialog',
  templateUrl: './data-changed-dialog.component.html',
  styleUrls: ['./data-changed-dialog.component.scss']
})
export class DataChangedDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ArrivalOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditReason,) { }
  
  ngOnInit() {
  }

}
