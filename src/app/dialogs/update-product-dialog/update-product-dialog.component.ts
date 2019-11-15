import { Product } from './../../models/Product';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrls: ['./update-product-dialog.component.scss']
})
export class UpdateProductDialogComponent implements OnInit {
  productForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      "productName": new FormControl(this.data.productName,[
        Validators.required
      ]),
      "description": new FormControl(this.data.description,[
        Validators.required
      ]),
      "price": new FormControl(this.data.price,[
        Validators.required
      ]),
      "quantity": new FormControl(this.data.quantity,[
        Validators.required
      ]),
      "leadTime": new FormControl(this.data.leadTime,[
        Validators.required
      ]),
      "moq": new FormControl(this.data.moq,[
        Validators.required
      ]),
      "obicNo": new FormControl(this.data.obicNo,[
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
    return this.productForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
    // switch (attribute) {
    //   case "name":
    //       return this.productForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
    //     break;
    
    //   default:
    //     break;
    // }
  }

}
