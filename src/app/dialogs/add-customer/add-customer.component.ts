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
        Validators.maxLength(7),Validators.minLength(7)
      ]),
      "address": new FormControl("",[
        
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

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

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
    //return this.customerForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
    switch (attribute) {
      case "zip":
          return this.customerForm.get(attribute).hasError('required') ? 'You must enter a value':
          this.customerForm.get(attribute).hasError('maxlength') ? 'zip code length must be 7': 
          this.customerForm.get(attribute).hasError('minlength') ? 'zip code length must be 7': '';
        break;
    
      default:
          return this.customerForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
        break;
    }
  }
}
