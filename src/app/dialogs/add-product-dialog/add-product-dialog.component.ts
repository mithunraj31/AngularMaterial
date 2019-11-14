import { Product } from './../../models/Product';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {
  productDetails: Product=null;
  productForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {
    this.productForm = new FormGroup({
      "name": new FormControl("",[
        Validators.required
      ]),

    })
  }
  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit(){
    if(this.productForm.valid){
      this.dialogRef.close(this.productForm.value);
    }
  }
  getErrorMessage(attribute:string) {
    switch (attribute) {
      case "name":
          return this.productForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
        break;
    
      default:
        break;
    }
  }
}
