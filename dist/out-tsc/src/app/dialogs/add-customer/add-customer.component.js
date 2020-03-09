import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
let AddCustomerComponent = class AddCustomerComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() {
        this.initializeCustomerForm();
    }
    initializeCustomerForm() {
        this.customerForm = new FormGroup({
            "customerName": new FormControl("", [
                Validators.required
            ]),
            "zip": new FormControl("", [
                Validators.required, Validators.maxLength(7), Validators.minLength(7)
            ]),
            "address": new FormControl("", [
                Validators.required
            ]),
            "tel": new FormControl("", [
                Validators.required
            ]),
            "contactName": new FormControl("", [
                Validators.required
            ]),
            "type": new FormControl("", [
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
        }
    }
    getErrorMessage(attribute) {
        //return this.customerForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
        switch (attribute) {
            case "zip":
                return this.customerForm.get(attribute).hasError('required') ? 'You must enter a value' :
                    this.customerForm.get(attribute).hasError('maxlength') ? 'zip code length must be 7' :
                        this.customerForm.get(attribute).hasError('minlength') ? 'zip code length must be 7' : '';
                break;
            default:
                return this.customerForm.get(attribute).hasError('required') ? 'You must enter a value' : '';
                break;
        }
    }
};
AddCustomerComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-customer',
        templateUrl: './add-customer.component.html',
        styleUrls: ['./add-customer.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], AddCustomerComponent);
export { AddCustomerComponent };
//# sourceMappingURL=add-customer.component.js.map