import { Customer } from './../../models/Customer';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-customer-dialog',
  templateUrl: './edit-customer-dialog.component.html',
  styleUrls: ['./edit-customer-dialog.component.scss']
})
export class EditCustomerDialogComponent implements OnInit {

  customerForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer
  ) { }

  ngOnInit() {
    this.initializeCustomerForm();
  }

  initializeCustomerForm(){
    this.customerForm = new FormGroup({
      "customerName": new FormControl(this.data.customerName,[
        Validators.required
      ]),
      "zip": new FormControl(this.data.zip,[
        Validators.required
      ]),
      "address": new FormControl(this.data.address,[
        Validators.required
      ]),
      "tel": new FormControl(this.data.tel,[
        Validators.required
      ]),
      "contactName": new FormControl(this.data.contactName,[
        Validators.required
      ]),
      "type": new FormControl(this.data.type,[
        Validators.required
      ]),

    })
  }

  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit(){
    if(this.customerForm.valid){
      this.dialogRef.close(this.customerForm.value);
      this.data = null;
    }
  }
  getErrorMessage(attribute:string) {
    return this.customerForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
    // switch (attribute) {
    //   case "name":
    //       return this.productForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
    //     break;
    
    //   default:
    //     break;
    // }
  }

}
