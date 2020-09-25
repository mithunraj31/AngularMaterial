import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddProductConfirmationComponent } from '../add-product-confirmation/add-product-confirmation.component';
import { ErrorProductDialogComponent } from '../error-product-dialog/error-product-dialog.component';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {
    this.productForm = new FormGroup({
      "productName": new FormControl("", [
        Validators.required
      ]),
      "description": new FormControl("", [
        Validators.required
      ]),
      "price": new FormControl("", [
      ]),
      "currency": new FormControl("JPY", [
        Validators.required
      ]),
      "quantity": new FormControl("", [
        Validators.required
      ]),
      "leadTime": new FormControl("", [
        Validators.required
      ]),
      "moq": new FormControl("", [
      ]),
      "obicNo": new FormControl("", [
        Validators.required
      ]),
      "sort": new FormControl(this.data.length, [

      ]),
      "color": new FormControl("", [

      ]),

    });
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
    if(this.data.some(code=>code.obicNo==obicNo)){
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
