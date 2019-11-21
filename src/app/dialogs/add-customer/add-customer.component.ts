import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  customerForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.initializeCustomerForm();
  }

  initializeCustomerForm() {
    this.customerForm = new FormGroup({
      "customerName": new FormControl("",[
        Validators.required
      ]),
      "zip": new FormControl("",[
        Validators.required
      ]),
      "address": new FormControl("",[
        Validators.required
      ]),
      "tel": new FormControl("",[
        Validators.required
      ]),
      "contactName": new FormControl("",[
        Validators.required
      ]),
      "type": new FormControl("",[
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
