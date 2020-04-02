import { Product } from './../../models/Product';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AddProductConfirmationComponent } from '../add-product-confirmation/add-product-confirmation.component';

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
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      "productName": new FormControl(this.data.productName, [
        Validators.required
      ]),
      "description": new FormControl(this.data.description, [
        Validators.required
      ]),
      "price": new FormControl(this.data.price, [
        Validators.required
      ]),
      "currency": new FormControl(this.data.currency ? this.data.currency : "JPY", [
        Validators.required
      ]),
      "quantity": new FormControl(this.data.quantity, [
        Validators.required
      ]),
      "leadTime": new FormControl(this.data.leadTime, [
        Validators.required
      ]),
      "moq": new FormControl(this.data.moq, [
        Validators.required
      ]),
      "obicNo": new FormControl(this.data.obicNo, [
        Validators.required
      ]),
      "sort": new FormControl(this.data.sort, [

      ]),
      "color": new FormControl(this.data.color, [

      ]),
    })
  }
  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit() {
    if (this.productForm.valid) {
      // open confimation dialog
      const confirmDialogRef = this.dialog.open(AddProductConfirmationComponent, {
        width: '600px',
        data: this.productForm.value,
        disableClose: true
      });
      confirmDialogRef.afterClosed().subscribe(result => {
        // console.log('The dialog was closed');
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
