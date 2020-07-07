import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Customer } from 'src/app/models/Customer';
import { AddCustomerConfirmationComponent } from '../add-customer-confirmation/add-customer-confirmation.component';

@Component({
  selector: 'app-add-product-confirmation',
  templateUrl: './add-product-confirmation.component.html',
  styleUrls: ['./add-product-confirmation.component.scss']
})
export class AddProductConfirmationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddProductConfirmationComponent>,
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
