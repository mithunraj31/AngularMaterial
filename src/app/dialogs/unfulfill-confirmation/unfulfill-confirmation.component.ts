import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-unfulfill-confirmation',
  templateUrl: './unfulfill-confirmation.component.html',
  styleUrls: ['./unfulfill-confirmation.component.scss']
})
export class UnfulfillConfirmationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UnfulfillConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: String,
  ) { }

  ngOnInit() {
  }

}
