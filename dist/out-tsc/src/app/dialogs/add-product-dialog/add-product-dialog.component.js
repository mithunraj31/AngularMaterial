import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
let AddProductDialogComponent = class AddProductDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() {
        this.productForm = new FormGroup({
            "productName": new FormControl("", [
                Validators.required
            ]),
            "description": new FormControl("", [
                Validators.required
            ]),
            "price": new FormControl("", [
                Validators.required
            ]),
            "quantity": new FormControl("", [
                Validators.required
            ]),
            "leadTime": new FormControl("", [
                Validators.required
            ]),
            "moq": new FormControl("", [
                Validators.required
            ]),
            "obicNo": new FormControl("", [
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
AddProductDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-product-dialog',
        templateUrl: './add-product-dialog.component.html',
        styleUrls: ['./add-product-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], AddProductDialogComponent);
export { AddProductDialogComponent };
//# sourceMappingURL=add-product-dialog.component.js.map