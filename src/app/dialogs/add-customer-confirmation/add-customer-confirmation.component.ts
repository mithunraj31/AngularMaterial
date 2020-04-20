import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IncomingShipment } from 'src/app/models/IncomingShipment';
import { Customer } from 'src/app/models/Customer';

@Component({
  selector: 'app-add-customer-confirmation',
  templateUrl: './add-customer-confirmation.component.html',
  styleUrls: ['./add-customer-confirmation.component.scss']
})
export class AddCustomerConfirmationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    public dialogRef: MatDialogRef<AddCustomerConfirmationComponent>,
  ) { }

  ngOnInit() {
  }
  onCancelClick() {
    this.dialogRef.close(0);
  }
  onOkClick() {
    this.dialogRef.close(1);
  }
  onReturnClick() {
    this.dialogRef.close(2);
  }

}
