import { Product } from './../../models/Product';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AddProductConfirmationComponent } from '../add-product-confirmation/add-product-confirmation.component';
import { ErrorProductDialogComponent } from '../error-product-dialog/error-product-dialog.component';

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrls: ['./update-product-dialog.component.scss']
})
export class UpdateProductDialogComponent implements OnInit {
  productForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      allproducts:Product[]
      editableProduct:Product
    }
  ) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      "productName": new FormControl(this.data.editableProduct.productName, [
        Validators.required
      ]),
      "description": new FormControl(this.data.editableProduct.description, [
        Validators.required
      ]),
      "price": new FormControl(this.data.editableProduct.price, [

      ]),
      "currency": new FormControl(this.data.editableProduct.currency ? this.data.editableProduct.currency : "JPY", [
        Validators.required
      ]),
      "quantity": new FormControl(this.data.editableProduct.quantity, [
        Validators.required
      ]),
      "leadTime": new FormControl(this.data.editableProduct.leadTime, [
        Validators.required
      ]),
      "moq": new FormControl(this.data.editableProduct.moq, [

      ]),
      "obicNo": new FormControl(this.data.editableProduct.obicNo, [
        Validators.required
      ]),
      "sort": new FormControl(this.data.editableProduct.sort, [

      ]),
      "color": new FormControl(this.data.editableProduct.color, [

      ]),
    })
  }
  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit() {
    if (this.productForm.valid) {
      if(this.isObicNoDuplicated(this.productForm.controls['obicNo'].value)){
        const dialogRef = this.dialog.open(ErrorProductDialogComponent, {
          width: '600px',
          data: this.productForm.controls['obicNo'].value
        });
      }else{
      // open confimation dialog
      const confirmDialogRef = this.dialog.open(AddProductConfirmationComponent, {
        width: '600px',
        data: this.productForm.value,
        disableClose: true
      });

      confirmDialogRef.afterClosed().subscribe(result => {

        switch (result) {
          case 0:
            this.onCancelClick();
            break;
          case 1:
            this.dialogRef.close(this.productForm.value);
            break;
          default:
            break;
        }
      });
    }
    }
  }

  isObicNoDuplicated(obicNo:string){
    if(this.data.allproducts.some(code=>code.obicNo==obicNo&&code.productId!=this.data.editableProduct.productId)){
      return true;
    }else{
      return false;
    }
  }

  getErrorMessage(attribute: string) {
    return this.productForm.get(attribute).hasError('required') ? 'You must enter a value' : '';
    // switch (attribute) {
    //   case "name":
    //       return this.productForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
    //     break;

    //   default:
    //     break;
    // }
  }

}
