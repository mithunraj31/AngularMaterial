import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
let EditCustomerDialogComponent = class EditCustomerDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() {
        this.initializeCustomerForm();
    }
    initializeCustomerForm() {
        this.customerForm = new FormGroup({
            "customerName": new FormControl(this.data.customerName, [
                Validators.required
            ]),
            "zip": new FormControl(this.data.zip, [
                Validators.required
            ]),
            "address": new FormControl(this.data.address, [
                Validators.required
            ]),
            "tel": new FormControl(this.data.tel, [
                Validators.required
            ]),
            "contactName": new FormControl(this.data.contactName, [
                Validators.required
            ]),
            "type": new FormControl(this.data.type, [
                Validators.required
            ]),
        });
    }
    onCancelClick() {
        this.dialogRef.close(null);
    }
    onSubmit() {
        if (this.customerForm.valid) {
            this.dialogRef.close(this.customerForm.value);
            this.data = null;
        }
    }
    getErrorMessage(attribute) {
        return this.customerForm.get(attribute).hasError('required') ? 'You must enter a value' : '';
        // switch (attribute) {
        //   case "name":
        //       return this.productForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
        //     break;
        //   default:
        //     break;
        // }
    }
};
EditCustomerDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-edit-customer-dialog',
        templateUrl: './edit-customer-dialog.component.html',
        styleUrls: ['./edit-customer-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], EditCustomerDialogComponent);
export { EditCustomerDialogComponent };
//# sourceMappingURL=edit-customer-dialog.component.js.map