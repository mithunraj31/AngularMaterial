import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product-set-dialog',
  templateUrl: './add-product-set-dialog.component.html',
  styleUrls: ['./add-product-set-dialog.component.scss']
})
export class AddProductSetDialogComponent implements OnInit {
  selected;
  productForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  
  ngOnInit() {
    this.productForm = new FormGroup({
      "productName": new FormControl("",[
        Validators.required
      ]),
      "description": new FormControl("",[
        Validators.required
      ]),
      "price": new FormControl("",[
        Validators.required
      ]),
      "quantity": new FormControl("",[
        Validators.required
      ]),
      "leadTime": new FormControl("",[
        Validators.required
      ]),
      "moq": new FormControl("",[
        Validators.required
      ]),
      "obicNo": new FormControl("",[
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
