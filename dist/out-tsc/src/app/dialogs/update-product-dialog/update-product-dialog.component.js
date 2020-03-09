import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
let UpdateProductDialogComponent = class UpdateProductDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
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
        });
    }
    onCancelClick() {
        this.dialogRef.close(null);
    }
    onSubmit() {
        if (this.productForm.valid) {
            this.dialogRef.close(this.productForm.value);
        }
    }
    getErrorMessage(attribute) {
        return this.productForm.get(attribute).hasError('required') ? 'You must enter a value' : '';
        // switch (attribute) {
        //   case "name":
        //       return this.productForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
        //     break;
        //   default:
        //     break;
        // }
    }
};
UpdateProductDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-update-product-dialog',
        templateUrl: './update-product-dialog.component.html',
        styleUrls: ['./update-product-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], UpdateProductDialogComponent);
export { UpdateProductDialogComponent };
//# sourceMappingURL=update-product-dialog.component.js.map